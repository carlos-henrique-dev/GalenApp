import React, { Component } from 'react';
import {
  View, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '../../configs/common_styles';
import api from '../../configs/api';
import plusIcon from '../../assets/icon_plus.png';
import PharmacyCard from '../../components/PharmacyCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    width: 60,
    height: 60,
  },
  addButton: {
    width: 60,
    height: 60,
  },
  flatList: {
    paddingBottom: 60,
  },
});

export default class AllnightScreen extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf(Object).isRequired,
  };

  static navigationOptions = {
    headerTitle: 'Farmácias de plantão',
    headerTintColor: colors.nyanza,
    headerStyle: {
      backgroundColor: colors.fieryrose,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      drugstores: [],
      loading: false,
    };

    this.loadDrugstores = this.loadDrugstores.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  componentDidMount() {
    this.loadDrugstores();
  }

  setLoading() {
    this.setState(prevState => ({ loading: !prevState.loading }));
  }

  loadDrugstores() {
    this.setLoading();
    api
      .get('allnight_drugstore')
      .then((drugstoresList) => {
        this.setLoading();
        this.setState({
          drugstores: drugstoresList.data.drugstores,
        });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }


  renderItem = (drugstore) => {
    const { navigation } = this.props;
    return (
      <PharmacyCard
        data={drugstore}
        navigate={() => navigation.navigate('DrugstoreDetails', {
          data: drugstore,
        })
        }
      />
    );
  };

  render() {
    const { drugstores, loading } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.fieryrose} barStyle="light-content" />
        <FlatList
          data={drugstores}
          renderItem={this.renderItem}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          refreshing={loading}
          onRefresh={this.loadDrugstores}
        />

        {navigation.state.params.authorized ? (
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() => navigation.navigate('AddAllNightScreen', {
              loadDrugstores: this.loadDrugstores,
            })
            }
          >
            <Image resizeMode="contain" source={plusIcon} style={styles.addButton} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}
