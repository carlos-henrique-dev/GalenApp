import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, Switch, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { PostProductFormStyles } from '../configs/componentsStyles';
import colors from '../configs/common_styles';

export default class EditProductForm extends Component {
  static propTypes = {
    product: PropTypes.objectOf(Object).isRequired,
    onEdit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    const { product } = props;
    super(props);
    this.state = {
      name: product.name,
      price: `${product.price}`,
      whereToBuy: product.whereToBuy,
      onSale: product.onSale,
    };
    this.handleToggleSwitch = this.handleToggleSwitch.bind(this);
    this.sendProductData = this.sendProductData.bind(this);
  }

  sendProductData() {
    const {
      name, price, whereToBuy, onSale,
    } = this.state;
    const { onEdit } = this.props;
    if (name.trim() !== '' && price.trim() !== '' && whereToBuy.trim() !== '') {
      onEdit(name, price, whereToBuy, onSale);
    } else {
      Alert.alert('Erro', 'preencha os campos corretamente');
    }
  }

  handleToggleSwitch() {
    const { onSale } = this.state;
    this.setState({ onSale: !onSale });
  }

  render() {
    const {
      name, price, whereToBuy, onSale,
    } = this.state;
    const { onCancel } = this.props;
    return (
      <View style={PostProductFormStyles.container}>
        <View style={PostProductFormStyles.textArea}>
          {name !== '' ? <Text style={PostProductFormStyles.text}> Nome do produto * </Text> : null}
          <TextInput
            placeholder="Nome do produto *"
            style={PostProductFormStyles.textInput}
            value={name}
            placeholderTextColor={colors.queenblue}
            onChangeText={newName => this.setState({ name: newName })}
          />
        </View>
        <View style={PostProductFormStyles.textArea}>
          {price !== '' ? <Text style={PostProductFormStyles.text}> Preço do produto * </Text> : null}
          <TextInput
            placeholder="Preço do produto *"
            style={PostProductFormStyles.textInput}
            value={price}
            keyboardType="number-pad"
            placeholderTextColor={colors.queenblue}
            onChangeText={newPrice => this.setState({ price: newPrice })}
          />
        </View>
        <View style={PostProductFormStyles.textArea}>
          {whereToBuy !== '' ? <Text style={PostProductFormStyles.text}> Onde comprou * </Text> : null}
          <TextInput
            placeholder="Onde comprou *"
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

        <View style={PostProductFormStyles.footButtons}>
          <TouchableOpacity
            onPress={() => {
              onCancel();
            }}
            style={PostProductFormStyles.postButton}
          >
            <Text style={PostProductFormStyles.imageText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.sendProductData} style={PostProductFormStyles.postButton}>
            <Text style={PostProductFormStyles.imageText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
