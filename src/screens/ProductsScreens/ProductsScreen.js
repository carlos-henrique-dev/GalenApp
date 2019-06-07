import React, { Component } from 'react';
import {
  View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert, ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import api from '../../configs/api';
import colors from '../../configs/common_styles';
import plusIcon from '../../assets/icon_plus.png';
import Product from '../../components/Product';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  filter: {
    height: 35,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  filterText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  flatList: {
    paddingBottom: 60,
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
});

export default class ProductScreen extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf(Object).isRequired,
  };

  static navigationOptions = {
    headerTitle: 'Produtos',
    headerTintColor: colors.nyanza,
    headerStyle: {
      backgroundColor: colors.fieryrose,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      products: [],
      loading: false,
    };

    this.loadProducts = this.loadProducts.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    this.loadProducts();
  }

  setLoading() {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

  openUserList = (userID, userName) => {
    const { navigation } = this.props;
    navigation.navigate('UserProductsScreen', {
      idToSearch: userID,
      userName,
    });
  };

  filter = () => {
    Alert.alert('filtrando');
  };

  plusButton = () => {
    const { navigation } = this.props;
    navigation.navigate('AddProductScreen', {
      loadproducts: this.loadProducts,
    });
  };

  handleRefresh() {
    const { refreshing } = this.state;
    this.setState(
      {
        refreshing: !refreshing,
      },
      () => {
        this.loadProducts();
      },
    );
  }

  loadProducts() {
    this.setLoading();
    api
      .get('products')
      .then((produtctsList) => {
        this.setState({ products: produtctsList.data.products, refreshing: false });
        this.setLoading();
      })
      .catch(() => {
        this.setState({ refreshing: false });
      });
  }

  render() {
    const { products, refreshing, loading } = this.state;
    return (
      <View style={styles.container}>
        {loading ? <ActivityIndicator size="large" color={colors.fieryrose} /> : null}
        <FlatList
          data={products}
          renderItem={({ item }) => <Product product={item} publicList openUserList={this.openUserList} />}
          keyExtractor={item => `${item._id}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
        />
        <TouchableOpacity style={styles.addButtonContainer} onPress={this.plusButton}>
          <Image resizeMode="contain" source={plusIcon} style={styles.addButton} />
        </TouchableOpacity>
      </View>
    );
  }
}
