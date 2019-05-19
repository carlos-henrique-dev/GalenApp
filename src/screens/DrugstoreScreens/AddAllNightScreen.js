import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import colors from '../../configs/common_styles';
import api from '../../configs/api';
import PostAllNightForm from '../../components/PostAllNightForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    color: colors.queenblue,
    textAlign: 'center',
    margin: 10,
  },
});

class AddAllNightScreen extends Component {
  static propTypes = {
    userName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    navigation: PropTypes.objectOf(Object).isRequired,
  };

  static navigationOptions = {
    headerTitle: 'Informar plantão',
    headerTintColor: colors.nyanza,
    headerStyle: {
      backgroundColor: colors.fieryrose,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      userWhoPostedType: 'costumer',
      userWhoPostedId: '',
      userWhoPostedName: '',
    };

    this.handlUploadProduct = this.handlUploadProduct.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  componentDidMount() {
    const { userName, id } = this.props;
    this.setState({ userWhoPostedName: userName, userWhoPostedId: id });
  }

  setLoading() {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

  async handlUploadProduct(file, drugstorename, formattedContact, address) {
    const { userWhoPostedId, userWhoPostedName, userWhoPostedType } = this.state;
    const { navigation } = this.props;

    this.setLoading();
    const data = new FormData();
    if (file !== null) {
      data.append('file', {
        uri: file.uri,
        name: file.fileName || file.name,
        type: file.type || 'image/jpeg',
      });
    }
    data.append('userWhoPostedType', userWhoPostedType);
    data.append('userWhoPostedId', userWhoPostedId);
    data.append('userWhoPostedName', userWhoPostedName);
    data.append('drugstorename', drugstorename);
    data.append('contact', JSON.stringify(formattedContact));
    data.append('address', JSON.stringify(address));

    await api
      .post('allnight_drugstore', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        if (result.status === 201) {
          this.setLoading();
          navigation.state.params.loadDrugstores();
          navigation.goBack();
        }
      })
      .catch(() => {
        this.setLoading();
        Alert.alert('Erro', 'Ocorreu um erro ao realizar a postagem');
      });
  }

  render() {
    const { loading } = this.state;
    const { navigation } = this.props;

    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {loading ? <ActivityIndicator size="large" color={colors.fieryrose} /> : null}
          <Text style={styles.title}>Informe rapidamente uma farmácia de plantão e ajude outras pessoas que estão procurando.</Text>
          <View style={{ flex: 1 }}>
            <PostAllNightForm onPost={this.handlUploadProduct} onCancel={navigation.goBack} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  id: state.user.id,
  userName: state.user.name,
});

export default connect(mapStateToProps)(AddAllNightScreen);
