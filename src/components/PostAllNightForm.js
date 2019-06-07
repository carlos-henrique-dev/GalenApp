import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, Dimensions, Image, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer/index.android';
import Geocoder from 'react-native-geocoding';
import mapskey from '../configs/maps';

import { PostAllNightFormStyles } from '../configs/componentsStyles';

import colors from '../configs/common_styles';

const { width } = Dimensions.get('window');

export default class PostProductForm extends Component {
  static propTypes = {
    onPost: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      drugstorename: '',
      contact: '',
      streetName: '',
      neighborhoodName: '',
      number: '',
      latitude: '',
      longitude: '',
    };
    this.handleGetPhoto = this.handleGetPhoto.bind(this);
    this.sendDrugstoreData = this.sendDrugstoreData.bind(this);
  }

  componentDidMount() {
    Geocoder.init(mapskey, { language: 'pt' });
  }

  getUserPosition = async () => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const response = await Geocoder.from({ latitude, longitude });
        const address = response.results[0].address_components;

        this.setState({
          streetName: address[1].long_name,
          number: address[0].long_name,
          latitude,
          longitude,
        });
      },
      (err) => {
        ToastAndroid.show(`Erro ao pegar a localização do usuário \n ${err}`, ToastAndroid.SHORT);
      },
      { enableHighAccuracy: true },
    );
  };

  handleGetPhoto() {
    const options = {
      noData: true,
      title: 'Foto do produto',
      chooseFromLibraryButtonTitle: 'Buscar na galeria',
      takePhotoButtonTitle: 'Tirar uma foto',
    };
    ImagePicker.showImagePicker(options, async (response) => {
      if (response.error) {
        ToastAndroid.show('Erro', ToastAndroid.SHORT);
      } else if (response.didCancel) {
        ToastAndroid.show('Ação cancelada', ToastAndroid.SHORT);
      } else if (response.fileSize > 3 * 1024 * 1024) {
        ImageResizer.createResizedImage(response.uri, 800, 600, 'JPEG', 80, 90)
          .then((compressResponse) => {
            this.setState({ file: compressResponse });
          })
          .catch(() => {
            ToastAndroid.show('Erro na compressão do arquivo', ToastAndroid.SHORT);
          });
      } else {
        this.setState({ file: response });
      }
    });
  }

  sendDrugstoreData() {
    const {
      file, drugstorename, contact, neighborhoodName, streetName, number, latitude, longitude,
    } = this.state;
    const { onPost } = this.props;

    if (drugstorename.trim() !== '' && contact.trim() !== '' && number.trim() !== '') {
      const splitAreacode = contact.split('', 2);
      const splitNumber = contact.slice(2);

      const formattedContact = {
        areacode: `${splitAreacode[0]}${splitAreacode[1]}`,
        number: splitNumber,
      };

      const address = {
        streetName,
        neighborhoodName,
        number,
        gpsCoordinates: {
          latitude,
          longitude,
        },
      };

      onPost(file, drugstorename, formattedContact, address);
    } else {
      ToastAndroid.show('preencha os campos com * corretamente', ToastAndroid.SHORT);
    }
  }

  render() {
    const {
      drugstorename, contact, streetName, neighborhoodName, number, file,
    } = this.state;
    const { onCancel } = this.props;
    return (
      <View style={PostAllNightFormStyles.container}>
        <View style={PostAllNightFormStyles.textArea}>
          {drugstorename !== '' ? <Text style={PostAllNightFormStyles.text}> Nome da farmácia * </Text> : null}
          <TextInput
            placeholder="Nome da farmácia *"
            style={PostAllNightFormStyles.textInput}
            value={drugstorename}
            placeholderTextColor={colors.queenblue}
            onChangeText={newDrugstorename => this.setState({ drugstorename: newDrugstorename })}
          />
        </View>
        <View style={PostAllNightFormStyles.textArea}>
          {contact !== '' ? <Text style={PostAllNightFormStyles.text}> Contato * </Text> : null}
          <TextInput
            placeholder="Contato *"
            style={PostAllNightFormStyles.textInput}
            value={contact}
            keyboardType="numeric"
            mas
            placeholderTextColor={colors.queenblue}
            onChangeText={newContact => this.setState({ contact: newContact })}
          />
        </View>
        <View style={PostAllNightFormStyles.textArea}>
          {streetName !== '' ? <Text style={PostAllNightFormStyles.text}> Rua * </Text> : null}
          <TextInput
            placeholder="Rua *"
            style={PostAllNightFormStyles.textInput}
            value={streetName}
            placeholderTextColor={colors.queenblue}
            onChangeText={newStreetName => this.setState({ streetName: newStreetName })}
          />
        </View>
        <View style={PostAllNightFormStyles.numberNeighborArea}>
          {neighborhoodName !== '' ? <Text style={PostAllNightFormStyles.text}>Bairro</Text> : null}
          <TextInput
            placeholder="Bairro"
            style={[PostAllNightFormStyles.textInput, { width: (width * 65) / 100 }]}
            value={neighborhoodName}
            placeholderTextColor={colors.queenblue}
            onChangeText={newNeighborhoodName => this.setState({ neighborhoodName: newNeighborhoodName })}
          />
          <View>
            {number !== '' ? <Text style={PostAllNightFormStyles.text}>Número *</Text> : null}
            <TextInput
              placeholder="Número *"
              style={[PostAllNightFormStyles.textInput, { width: (width * 25) / 100 }]}
              value={number}
              keyboardType="number-pad"
              placeholderTextColor={colors.queenblue}
              onChangeText={newNumber => this.setState({ number: newNumber })}
            />
          </View>
        </View>

        <TouchableOpacity onPress={this.getUserPosition} style={PostAllNightFormStyles.getLocation}>
          <Text style={PostAllNightFormStyles.getLocationText}>Pegar a localização automaticamente</Text>
        </TouchableOpacity>

        <View style={PostAllNightFormStyles.imageArea}>
          {file ? <Image source={{ uri: file.uri }} style={PostAllNightFormStyles.image} /> : <View style={PostAllNightFormStyles.image} />}
          <View>
            <TouchableOpacity onPress={this.handleGetPhoto} style={PostAllNightFormStyles.imageButton}>
              <Text style={PostAllNightFormStyles.imageText}>Insira uma foto</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={PostAllNightFormStyles.footButtons}>
          <TouchableOpacity
            onPress={() => {
              onCancel();
            }}
            style={[PostAllNightFormStyles.postButton, { backgroundColor: colors.fieryrose }]}
          >
            <Text style={PostAllNightFormStyles.imageText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.sendDrugstoreData} style={[PostAllNightFormStyles.postButton, { backgroundColor: colors.pistachio }]}>
            <Text style={PostAllNightFormStyles.imageText}>Postar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
