import React, { Component } from 'react';
import {
  View, ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Platform, Image, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import colors from '../../configs/common_styles';
import api from '../../configs/api';
import EditProfileForm from '../../components/EditProfileForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class EditProductScreen extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf(Object).isRequired,
  };

  static navigationOptions = {
    headerTitle: 'Editar dados da farmácia',
    headerTintColor: colors.nyanza,
    headerStyle: {
      backgroundColor: colors.fieryrose,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      loading: false,
    };

    this.handlEditDrugstoreData = this.handlEditDrugstoreData.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  setLoading() {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

  async handlEditDrugstoreData(drugstoreName, managerName, street, number, bairro, tel, cel) {
    const { navigation, id } = this.props;

    this.setLoading();

    const data = [
      { propName: 'name', value: drugstoreName },
      { propName: 'managerName', value: managerName },
      { propName: 'street', value: street },
      { propName: 'number', value: number },
      { propName: 'bairro', value: bairro },
      { propName: 'tell', value: tel },
      { propName: 'cell', value: cel },
    ];

    await api
      .patch(`drugstore/${id}`, data)
      .then((result) => {
        if (result.status === 200) {
          this.setLoading();
          navigation.goBack();
        }
      })
      .catch(() => {
        this.setLoading();
        Alert.alert('Erro', 'Ocorreu um erro na edição');
      });
  }

  render() {
    const { loading, photo } = this.state;
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {loading ? <ActivityIndicator size="large" color={colors.fieryrose} /> : null}

          <View style={{ flex: 1, alignItems: 'center' }}>
            <View
              style={{
                width: '90%',
                height: 160,
                backgroundColor: 'rgba(238,238,238,0.8)',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {photo !== null ? <Image /> : <Text style={{ color: colors.metallicseaweed, fontSize: 20 }}>Adicionar foto</Text>}
            </View>
            <EditProfileForm product={navigation.state.params} onEdit={this.handlEditDrugstoreData} onCancel={navigation.goBack} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  id: state.drugstore.id,
});

export default connect(mapStateToProps)(EditProductScreen);
