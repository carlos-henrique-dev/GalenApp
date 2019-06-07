import React, { Component } from 'react';
import {
  View, FlatList, TouchableOpacity, Alert, ToastAndroid, Image, ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from '../../configs/api';
import colors from '../../configs/common_styles';
import Product from '../../components/Product';
import { UserProductsScreenStyles } from '../../configs/productsStyles';
import plusIcon from '../../assets/icon_plus.png';

class ProductScreen extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf(Object).isRequired,
    drugstoreID: PropTypes.string.isRequired,
  };

  static navigationOptions = () => ({
    headerTitle: 'Seus Produtos',
    headerTintColor: colors.nyanza,
    headerStyle: {
      backgroundColor: colors.fieryrose,
      fontSize: 10,
    },
  });

  constructor(props) {
    super(props);
    this.state = {
      searchID: '',
      refreshing: false,
      products: [],
      loading: false,
    };

    this.loadProducts = this.loadProducts.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  componentDidMount() {
    const { drugstoreID } = this.props;
    this.setState(
      {
        searchID: drugstoreID,
      },
      () => {
        this.loadProducts();
      },
    );
  }

  setLoading() {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

  removeProducts = (productId) => {
    Alert.alert('Confirmação de exclusão', 'Deseja mesmo excluir este produto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sim',
        onPress: () => {
          this.setLoading();
          api
            .delete(`products/${productId}`)
            .then((result) => {
              if (result.status === 200) {
                ToastAndroid.show('Produdo excluído com sucesso', ToastAndroid.SHORT);
                this.loadProducts();
              } else {
                ToastAndroid.show('Erro ao excluir o produto', ToastAndroid.SHORT);
              }
            })
            .catch(err => Alert.alert('Erro', `Erro ao excluir o produto: ${err}`));
        },
      },
    ]);
  };

  editProducts = (productId) => {
    const { navigation } = this.props;
    this.setLoading();
    api
      .get(`products/one_product/${productId}`)
      .then((product) => {
        navigation.navigate('EditProductScreen', {
          loadproducts: this.loadProducts,
          product: product.data,
        });
      })
      .catch(() => {
        this.setLoading();
        this.setState({ refreshing: false });
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

  loadProducts() {
    const { searchID } = this.state;
    this.setLoading();

    api
      .get(`products/user_product/${searchID}`)
      .then((produtcsList) => {
        this.setLoading();
        this.setState({ products: produtcsList.data.product, refreshing: false });
      })
      .catch(() => {
        this.setLoading();
        this.setState({ refreshing: false });
      });
  }

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

  render() {
    const { refreshing, products, loading } = this.state;
    const { navigation } = this.props;
    return (
      <View style={UserProductsScreenStyles.container}>
        {loading ? <ActivityIndicator size="large" color={colors.fieryrose} /> : null}
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <Product
              product={item}
              onRemove={this.removeProducts}
              onEdit={this.editProducts}
              swipe={navigation.state.params.idToSearch === undefined}
            />
          )}
          keyExtractor={item => `${item._id}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={UserProductsScreenStyles.flatList}
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
        />

        <TouchableOpacity style={UserProductsScreenStyles.addButtonContainer} onPress={this.plusButton}>
          <Image resizeMode="contain" source={plusIcon} style={UserProductsScreenStyles.addButton} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  drugstoreID: state.drugstore.id,
});

export default connect(mapStateToProps)(ProductScreen);
