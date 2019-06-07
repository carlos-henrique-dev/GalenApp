import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, Switch, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { PostProductFormStyles } from '../configs/componentsStyles';
import colors from '../configs/common_styles';

export default class EditProfileForm extends Component {
  static propTypes = {
    onEdit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      drugstoreName: '',
      managerName: '',
      street: '',
      number: '',
      bairro: '',
      tel: '',
      cel: '',
    };
    this.editDrugstoreData = this.editDrugstoreData.bind(this);
  }

  editDrugstoreData() {
    const {
      drugstoreName, managerName, street, number, bairro, tel, cel,
    } = this.state;
    const { onEdit } = this.props;
    if (
      drugstoreName.trim() !== ''
      && managerName.trim() !== ''
      && street.trim() !== ''
      && number.trim() !== ''
      && tel.trim() !== ''
      && cel.trim() !== ''
    ) {
      onEdit(drugstoreName, managerName, street, number, bairro, tel, cel);
    } else {
      Alert.alert('Erro', 'preencha os campos corretamente');
    }
  }

  render() {
    const {
      drugstoreName, managerName, street, number, bairro, tel, cel,
    } = this.state;
    const { onCancel } = this.props;
    return (
      <View style={PostProductFormStyles.container}>
        <View style={PostProductFormStyles.textArea}>
          {drugstoreName !== '' ? <Text style={PostProductFormStyles.text}>Nome da farmácia</Text> : null}
          <TextInput
            placeholder="Nome da farmácia"
            style={PostProductFormStyles.textInput}
            value={drugstoreName}
            placeholderTextColor={colors.queenblue}
            onChangeText={newdrugstoreName => this.setState({ drugstoreName: newdrugstoreName })}
          />
        </View>
        <View style={PostProductFormStyles.textArea}>
          {managerName !== '' ? <Text style={PostProductFormStyles.text}>Nome do responsável</Text> : null}
          <TextInput
            placeholder="Nome do responsável"
            style={PostProductFormStyles.textInput}
            value={managerName}
            placeholderTextColor={colors.queenblue}
            onChangeText={newmanagerName => this.setState({ managerName: newmanagerName })}
          />
        </View>
        <View style={PostProductFormStyles.textArea}>
          {street !== '' ? <Text style={PostProductFormStyles.text}>Rua</Text> : null}
          <TextInput
            placeholder="street"
            style={PostProductFormStyles.textInput}
            value={street}
            placeholderTextColor={colors.queenblue}
            onChangeText={newstreet => this.setState({ street: newstreet })}
          />
        </View>
        <View style={PostProductFormStyles.textArea}>
          {bairro !== '' ? <Text style={PostProductFormStyles.text}>Bairro</Text> : null}
          <TextInput
            placeholder="Bairro"
            style={PostProductFormStyles.textInput}
            value={bairro}
            placeholderTextColor={colors.queenblue}
            onChangeText={newbairro => this.setState({ bairro: newbairro })}
          />
        </View>
        <View style={PostProductFormStyles.textArea}>
          {number !== '' ? <Text style={PostProductFormStyles.text}>Número</Text> : null}
          <TextInput
            placeholder="Número"
            style={PostProductFormStyles.textInput}
            value={number}
            placeholderTextColor={colors.queenblue}
            onChangeText={newnumber => this.setState({ number: newnumber })}
          />
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={PostProductFormStyles.textArea}>
            {tel !== '' ? <Text style={PostProductFormStyles.text}>Telefone</Text> : null}
            <TextInput
              placeholder="Telefone"
              style={PostProductFormStyles.textInput2}
              value={tel}
              placeholderTextColor={colors.queenblue}
              onChangeText={newtel => this.setState({ tel: newtel })}
            />
          </View>
          <View style={PostProductFormStyles.textArea}>
            {cel !== '' ? <Text style={PostProductFormStyles.text}>Celular</Text> : null}
            <TextInput
              placeholder="Celular"
              style={PostProductFormStyles.textInput2}
              value={cel}
              placeholderTextColor={colors.queenblue}
              onChangeText={newcel => this.setState({ cel: newcel })}
            />
          </View>
        </View>

        <View style={PostProductFormStyles.footButtons}>
          <TouchableOpacity onPress={onCancel} style={PostProductFormStyles.postButton}>
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
