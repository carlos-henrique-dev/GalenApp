import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, Switch, Image, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer/index.android';

import { PostProductFormStyles } from '../configs/componentsStyles';
import colors from '../configs/common_styles';

export default class PostProductForm extends Component {
  static propTypes = {
    onPost: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      name: '',
      price: '',
      whereToBuy: '',
      onSale: false,
    };
    this.handleToggleSwitch = this.handleToggleSwitch.bind(this);
    this.handleGetPhoto = this.handleGetPhoto.bind(this);
    this.sendProductData = this.sendProductData.bind(this);
  }

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

  sendProductData() {
    const {
      file, name, price, whereToBuy, onSale,
    } = this.state;
    const { onPost } = this.props;

    if (file !== null && name.trim() !== '' && price.trim() !== '' && whereToBuy.trim() !== '') {
      onPost(file, name, price, whereToBuy, onSale);
    } else {
      ToastAndroid.show('preencha os campos corretamente', ToastAndroid.SHORT);
    }
  }

  handleToggleSwitch() {
    const { onSale } = this.state;
    this.setState({ onSale: !onSale });
  }

  render() {
    const {
      name, price, whereToBuy, onSale, file,
    } = this.state;
    const { onCancel } = this.props;

    return (
      <View style={PostProductFormStyles.container}>
        <View style={PostProductFormStyles.textArea}>
          {name !== '' ? <Text style={PostProductFormStyles.text}> Nome do produto </Text> : null}
          <TextInput
            placeholder="Nome do produto"
            style={PostProductFormStyles.textInput}
            value={name}
            placeholderTextColor={colors.queenblue}
            onChangeText={newName => this.setState({ name: newName })}
          />
        </View>
        <View style={PostProductFormStyles.textArea}>
          {price !== '' ? <Text style={PostProductFormStyles.text}> Preço do produto </Text> : null}
          <TextInput
            placeholder="Preço do produto"
            style={PostProductFormStyles.textInput}
            value={price}
            keyboardType="number-pad"
            placeholderTextColor={colors.queenblue}
            onChangeText={newPrice => this.setState({ price: newPrice })}
          />
        </View>
        <View style={PostProductFormStyles.textArea}>
          {whereToBuy !== '' ? <Text style={PostProductFormStyles.text}> Onde comprou </Text> : null}
          <TextInput
            placeholder="Onde comprou"
            style={PostProductFormStyles.textInput}
            value={whereToBuy}
            placeholderTextColor={colors.queenblue}
            onChangeText={newWhereToBuy => this.setState({ whereToBuy: newWhereToBuy })}
          />
        </View>
        <View style={PostProductFormStyles.switchArea}>
          <Text style={PostProductFormStyles.switchText}> Estava em promoção? </Text>
          <Text style={PostProductFormStyles.switchText}>{onSale ? 'Sim' : 'Não'}</Text>

          <Switch onValueChange={this.handleToggleSwitch} trackColor={{ false: colors.fieryrose, true: colors.pistachio }} value={onSale} />
        </View>

        <View style={PostProductFormStyles.imageArea}>
          {file ? <Image source={{ uri: file.uri }} style={PostProductFormStyles.image} /> : <View style={PostProductFormStyles.image} />}
          <View>
            <TouchableOpacity onPress={this.handleGetPhoto} style={PostProductFormStyles.imageButton}>
              <Text style={PostProductFormStyles.imageText}>Insira uma foto</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={PostProductFormStyles.footButtons}>
          <TouchableOpacity
            onPress={() => {
              onCancel();
            }}
            style={[PostProductFormStyles.postButton, { backgroundColor: colors.fieryrose }]}
          >
            <Text style={PostProductFormStyles.imageText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.sendProductData} style={[PostProductFormStyles.postButton, { backgroundColor: colors.pistachio }]}>
            <Text style={PostProductFormStyles.imageText}>Postar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
