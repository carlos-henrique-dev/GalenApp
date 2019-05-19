import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, Dimensions, Image, Alert, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer/index.android';
import Geocoder from 'react-native-geocoding';
import { mapskey } from '../configs/maps';

import { PortAllNightFormStyles } from '../configs/componentsStyles';

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

    if (drugstorename.trim() !== '' && contact.trim() !== '' && neighborhoodName.trim() !== '') {
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
      <View style={PortAllNightFormStyles.container}>
        <View style={PortAllNightFormStyles.textArea}>
          {drugstorename !== '' ? <Text style={PortAllNightFormStyles.text}> Nome da farmácia * </Text> : null}
          <TextInput
            placeholder="Nome da farmácia *"
            style={PortAllNightFormStyles.textInput}
            value={drugstorename}
            placeholderTextColor={colors.queenblue}
            onChangeText={newDrugstorename => this.setState({ drugstorename: newDrugstorename })}
          />
        </View>
        <View style={PortAllNightFormStyles.textArea}>
          {contact !== '' ? <Text style={PortAllNightFormStyles.text}> Contato * </Text> : null}
          <TextInput
            placeholder="Contato *"
            style={PortAllNightFormStyles.textInput}
            value={contact}
            keyboardType="numeric"
            mas
            placeholderTextColor={colors.queenblue}
            onChangeText={newContact => this.setState({ contact: newContact })}
          />
        </View>
        <View style={PortAllNightFormStyles.textArea}>
          {streetName !== '' ? <Text style={PortAllNightFormStyles.text}> Rua * </Text> : null}
          <TextInput
            placeholder="Rua *"
            style={PortAllNightFormStyles.textInput}
            value={streetName}
            placeholderTextColor={colors.queenblue}
            onChangeText={newStreetName => this.setState({ streetName: newStreetName })}
          />
        </View>
        <View style={PortAllNightFormStyles.numberNeighborArea}>
          {neighborhoodName !== '' ? <Text style={PortAllNightFormStyles.text}> Bairro * </Text> : null}
          <TextInput
            placeholder="Bairro *"
            style={[PortAllNightFormStyles.textInput, { width: (width * 65) / 100 }]}
            value={neighborhoodName}
            placeholderTextColor={colors.queenblue}
            onChangeText={newNeighborhoodName => this.setState({ neighborhoodName: newNeighborhoodName })}
          />
          <View>
            {number !== '' ? <Text style={PortAllNightFormStyles.text}> Número </Text> : null}
            <TextInput
              placeholder="Número"
              style={[PortAllNightFormStyles.textInput, { width: (width * 25) / 100 }]}
              value={number}
              keyboardType="number-pad"
              placeholderTextColor={colors.queenblue}
              onChangeText={newNumber => this.setState({ number: newNumber })}
            />
          </View>
        </View>

        <TouchableOpacity onPress={this.getUserPosition} style={PortAllNightFormStyles.getLocation}>
          <Text style={PortAllNightFormStyles.getLocationText}>Pegar a localização automaticamente</Text>
        </TouchableOpacity>

        <View style={PortAllNightFormStyles.imageArea}>
          {file ? <Image source={{ uri: file.uri }} style={PortAllNightFormStyles.image} /> : <View style={PortAllNightFormStyles.image} />}
          <View>
            <TouchableOpacity onPress={this.handleGetPhoto} style={PortAllNightFormStyles.imageButton}>
              <Text style={PortAllNightFormStyles.imageText}>Insira uma foto</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={PortAllNightFormStyles.footButtons}>
          <TouchableOpacity
            onPress={() => {
              onCancel();
            }}
            style={PortAllNightFormStyles.postButton}
          >
            <Text style={PortAllNightFormStyles.imageText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.sendDrugstoreData} style={PortAllNightFormStyles.postButton}>
            <Text style={PortAllNightFormStyles.imageText}>Postar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
