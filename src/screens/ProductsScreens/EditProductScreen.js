import React, { Component } from 'react';
import {
  View, ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import colors from '../../configs/common_styles';
import api from '../../configs/api';
import EditProductForm from '../../components/EditProductForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class AddProductScreen extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf.isRequired,
  };

  static navigationOptions = {
    headerTitle: 'Editar produto',
    headerTintColor: colors.nyanza,
    headerStyle: {
      backgroundColor: colors.fieryrose,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    this.handlEditProduct = this.handlEditProduct.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  setLoading() {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

  async handlEditProduct(name, price, whereToBuy, onSale) {
    const { navigation } = this.props;

    this.setLoading();

    const data = [
      { propName: 'name', value: name },
      { propName: 'price', value: price },
      { propName: 'whereToBuy', value: whereToBuy },
      { propName: 'onSale', value: onSale },
    ];

    await api
      .patch(`products/${navigation.state.params.product._id}`, data)
      .then((result) => {
        if (result.status === 200) {
          this.setLoading();
          navigation.state.params.loadproducts();
          navigation.goBack();
        }
      })
      .catch(() => {
        this.setLoading();
        Alert.alert('Erro', 'Ocorreu um erro na edição');
      });
  }

  render() {
    const { loading } = this.state;
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {loading ? <ActivityIndicator size="large" color={colors.fieryrose} /> : null}

          <View style={{ flex: 1 }}>
            <EditProductForm product={navigation.state.params} onEdit={this.handlEditProduct} onCancel={navigation.goBack} />
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

export default connect(mapStateToProps)(AddProductScreen);
