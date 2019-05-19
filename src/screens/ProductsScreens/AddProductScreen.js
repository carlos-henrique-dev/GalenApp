import React, { Component } from 'react';
import {
  View, Text, ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, Platform, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import colors from '../../configs/common_styles';
import api from '../../configs/api';
import PostProductForm from '../../components/PostProductForm';

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
    margin: 15,
  },
});

class AddProductScreen extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf(Object).isRequired,
    userName: PropTypes.string,
    id: PropTypes.string,
  };

  static defaultProps = {
    userName: '',
    id: '',
  };

  static navigationOptions = {
    headerTitle: 'Publicar um produto',
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

  async handlUploadProduct(file, name, price, whereToBuy, onSale) {
    const { userWhoPostedId, userWhoPostedName, userWhoPostedType } = this.state;
    const { navigation } = this.props;

    this.setLoading();
    const data = new FormData();
    data.append('file', {
      uri: file.uri,
      name: file.fileName || file.name,
      type: file.type || 'image/jpeg',
    });
    data.append('userWhoPostedType', userWhoPostedType);
    data.append('userWhoPostedId', userWhoPostedId);
    data.append('userWhoPostedName', userWhoPostedName);
    data.append('name', name);
    data.append('price', price);
    data.append('whereToBuy', whereToBuy);
    data.append('onSale', onSale);

    await api
      .post('products', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        if (result.status === 200) {
          this.setLoading();
          navigation.state.params.loadproducts();
          navigation.goBack();
        }
      })
      .catch(() => {
        this.setLoading();
        ToastAndroid.show('Ocorreu um erro ao realizar a postagem', ToastAndroid.SHORT);
      });
  }

  render() {
    const { loading } = this.state;
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {loading ? <ActivityIndicator size="large" color={colors.fieryrose} /> : null}
          <Text style={styles.title}>Insira abaixo os dados do produto adquirido e ajude outras pessoas, que também precisando, a encontrar</Text>
          <View style={{ flex: 1 }}>
            <PostProductForm onPost={this.handlUploadProduct} onCancel={navigation.goBack} />
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
