import React, { Component } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from '../../configs/api';
import colors from '../../configs/common_styles';
import Product from '../../components/Product';
import UserProductsScreenStyles from '../../configs/productsStyles';

class ProductScreen extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf.isRequired,
    userId: PropTypes.string.isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.userName ? `Produtos de ${navigation.state.params.userName}` : 'Seus Produtos',
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
    };

    this.loadProducts = this.loadProducts.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  componentDidMount() {
    const { navigation, userId } = this.props;
    this.setState(
      {
        searchID: navigation.state.params.idToSearch === undefined ? userId : navigation.state.params.idToSearch,
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
                Alert.alert('Sucesso', 'Produdo excluído com sucesso');
                this.loadProducts();
              } else {
                Alert.alert('Erro', 'Erro ao excluir o produto');
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

  loadProducts() {
    const { searchID } = this.state;
    this.setLoading();

    api
      .get(`products/user_product/${searchID}`)
      .then((produtcsList) => {
        this.setLoading();
        this.setState({ products: produtcsList.data.product, refreshing: false }, () => {});
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
    const { refreshing, products } = this.state;
    const { navigation } = this.props;
    return (
      <View style={UserProductsScreenStyles.container}>
        <TouchableOpacity style={UserProductsScreenStyles.filter} onPress={this.filter}>
          <Text style={UserProductsScreenStyles.filterText}>Filtros</Text>
        </TouchableOpacity>
        <View>
          {products.length > 0 ? (
            <Text style={UserProductsScreenStyles.userWhoPosted}>{`Produtos postados por: ${products[0].userWhoPostedName}`}</Text>
          ) : null}
        </View>
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
      </View>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.id,
});

export default connect(mapStateToProps)(ProductScreen);
