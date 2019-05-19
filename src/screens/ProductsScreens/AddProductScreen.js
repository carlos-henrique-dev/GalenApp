import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import colors from '../../configs/common_styles';
import api from '../../configs/api';
import PostProductForm from '../../components/PostProductForm';

class AddProductScreen extends Component {
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
    this.setState({ userWhoPostedName: this.props.userName, userWhoPostedId: this.props.id });
  }

  setLoading() {
    this.setState({ loading: !this.state.loading });
  }

  async handlUploadProduct(file, name, price, whereToBuy, onSale) {
    this.setLoading();
    const data = new FormData();
    data.append('file', {
      uri: file.uri,
      name: file.fileName || file.name,
      type: file.type || 'image/jpeg',
    });
    data.append('userWhoPostedType', this.state.userWhoPostedType);
    data.append('userWhoPostedId', this.state.userWhoPostedId);
    data.append('userWhoPostedName', this.state.userWhoPostedName);
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
          this.props.navigation.state.params.loadproducts();
          this.props.navigation.goBack();
        }
      })
      .catch((err) => {
        this.setLoading();
        console.log('erro', err.message);
        Alert.alert('Erro', 'Ocorreu um erro ao realizar a postagem');
      });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {this.state.loading ? <ActivityIndicator size="large" color={colors.fieryrose} /> : null}
          <Text style={styles.title}>
            Insira abaixo os dados do produto adquirido e ajude outras pessoas, que também
            precisando, a encontrar
          </Text>
          <View style={{ flex: 1 }}>
            <PostProductForm
              onPost={this.handlUploadProduct}
              onCancel={this.props.navigation.goBack}
            />
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
