import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Platform,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer/index.android';
import { updateData } from '../../store/ducks/drugstore';
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

class DrugstoreAdminEditProfile extends Component {
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

    this.setLoading = this.setLoading.bind(this);
    this.handleProfilePhoto = this.handleProfilePhoto.bind(this);
  }

  setLoading() {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

  handlEditDrugstoreData = async (name, manager, street, number, neighborhood, tel, cel) => {
    const { navigation, id, updateDrugstoreState } = this.props;
    this.setLoading();

    const formattedContacts = [{ areacode: 67, number: tel }, { areacode: 67, number: cel }];

    const data = [
      { propName: 'name', value: name },
      { propName: 'manager', value: manager },
      { propName: 'address.street', value: street },
      { propName: 'address.number', value: number },
      { propName: 'address.neighborhood', value: neighborhood },
      { propName: 'contacts', value: formattedContacts },
    ];

    const storedata = {
      name,
      manager,
      street,
      number,
      neighborhood,
      formattedContacts,
    };

    await api
      .patch(`drugstore/${id}`, data)
      .then((result) => {
        console.log('resultado edit', result)
        if (result.status === 200) {
          updateDrugstoreState(storedata);
          this.setLoading();
          navigation.goBack();
        }
      })
      .catch((err) => {
        console.log('erro', err);
        this.setLoading();
        Alert.alert('Erro', 'Ocorreu um erro na edição');
      });
  };

  handleGetPhoto = () => {
    const options = {
      noData: true,
      title: 'Foto do produto',
      chooseFromLibraryButtonTitle: 'Buscar na galeria',
      takePhotoButtonTitle: 'Tirar uma foto',
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        ToastAndroid.show('Erro', ToastAndroid.SHORT);
      } else if (response.didCancel) {
        ToastAndroid.show('Ação cancelada', ToastAndroid.SHORT);
      } else if (response.fileSize > 3 * 1024 * 1024) {
        ImageResizer.createResizedImage(response.uri, 800, 600, 'JPEG', 80, 0)
          .then((compressResponse) => {
            this.setState({ photo: compressResponse });
          })
          .catch(() => {
            ToastAndroid.show('Erro na compressão do arquivo', ToastAndroid.SHORT);
          });
      } else {
        this.setState({ photo: response });
      }
    });
  };

  async handleProfilePhoto() {
    const { id } = this.props;
    const { photo } = this.state;

    this.setLoading();

    const data = new FormData();
    data.append('file', {
      uri: photo.uri,
      name: photo.fileName || photo.name,
      type: photo.type || 'image/jpeg',
    });
    data.append('id', id);

    await api
      .post('drugstore/setPhoto', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((result) => {
        if (result.status === 200) {
          this.setLoading();
        }
      })
      .catch(() => {
        this.setLoading();
      });
  }

  render() {
    const { loading, photo } = this.state;
    const { navigation, alldata } = this.props;
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {loading ? <ActivityIndicator size="large" color={colors.fieryrose} /> : null}

          <View style={{ flex: 1, alignItems: 'center' }}>
            <View
              style={{
                width: '90%',
                height: 180,
                backgroundColor: 'rgba(238,238,238,0.8)',
                marginTop: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {photo !== null ? (
                <Image
                  source={{ uri: photo.uri }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  resizeMode="contain"
                />
              ) : (
                <TouchableOpacity onPress={this.handleGetPhoto} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: colors.metallicseaweed, fontSize: 20 }}>Adicionar foto</Text>
                </TouchableOpacity>
              )}
            </View>
            {photo !== null ? (
              <TouchableOpacity
                onPress={this.handleProfilePhoto}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ color: colors.metallicseaweed, fontSize: 20 }}>Enviar a foto</Text>
              </TouchableOpacity>
            ) : null}
            <EditProfileForm drugstoredata={alldata} onEdit={this.handlEditDrugstoreData} onCancel={() => navigation.goBack()} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  id: state.drugstore.id,
  alldata: state.drugstore,
});

const mapDispatchToProps = dispatch => ({
  updateDrugstoreState: data => dispatch(updateData(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrugstoreAdminEditProfile);
