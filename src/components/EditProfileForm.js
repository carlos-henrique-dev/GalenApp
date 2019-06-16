import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { PostProductFormStyles } from '../configs/componentsStyles';
import colors from '../configs/common_styles';

export default class EditProfileForm extends Component {
  static propTypes = {
    onEdit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    drugstoredata: PropTypes.objectOf(Object).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      manager: '',
      street: '',
      number: '',
      neighborhood: '',
      tel: '',
      cel: '2',
    };
    this.editDrugstoreData = this.editDrugstoreData.bind(this);
  }

  componentDidMount = () => {
    const { drugstoredata } = this.props;
    this.setState({
      name: drugstoredata.name,
      manager: drugstoredata.manager,
      street: drugstoredata.street,
      number: drugstoredata.number,
      neighborhood: drugstoredata.neighborhood,
      tel: drugstoredata.contacts[0].number,
      cel: drugstoredata.contacts.length > 0 ? drugstoredata.contacts[1].number : '',
    });
  };

  editDrugstoreData() {
    const {
      name, manager, street, number, neighborhood, tel, cel,
    } = this.state;
    const { onEdit } = this.props;
    if (name.trim() !== '' && manager.trim() !== '' && street.trim() !== '' && number.trim() !== '' && tel.trim() !== '' && cel.trim() !== '') {
      onEdit(name, manager, street, number, neighborhood, tel, cel);
    } else {
      Alert.alert('Erro', 'preencha os campos corretamente');
    }
  }

  render() {
    const {
      name, manager, street, number, neighborhood, tel, cel,
    } = this.state;
    const { onCancel } = this.props;
    return (
      <View style={PostProductFormStyles.container}>
        <View style={PostProductFormStyles.textArea}>
          {name !== '' ? <Text style={PostProductFormStyles.text}>Nome da farmácia</Text> : null}
          <TextInput
            placeholder="Nome da farmácia"
            style={PostProductFormStyles.textInput}
            value={name}
            placeholderTextColor={colors.queenblue}
            onChangeText={newname => this.setState({ name: newname })}
          />
        </View>
        <View style={PostProductFormStyles.textArea}>
          {manager !== '' ? <Text style={PostProductFormStyles.text}>Nome do responsável</Text> : null}
          <TextInput
            placeholder="Nome do responsável"
            style={PostProductFormStyles.textInput}
            value={manager}
            placeholderTextColor={colors.queenblue}
            onChangeText={newmanagerName => this.setState({ manager: newmanagerName })}
          />
        </View>
        <View style={PostProductFormStyles.textArea}>
          {street !== '' ? <Text style={PostProductFormStyles.text}>Rua</Text> : null}
          <TextInput
            placeholder="Rua"
            style={PostProductFormStyles.textInput}
            value={street}
            placeholderTextColor={colors.queenblue}
            onChangeText={newstreet => this.setState({ street: newstreet })}
          />
        </View>
        <View style={PostProductFormStyles.textArea}>
          {neighborhood !== '' ? <Text style={PostProductFormStyles.text}>Bairro</Text> : null}
          <TextInput
            placeholder="bairro"
            style={PostProductFormStyles.textInput}
            value={neighborhood}
            placeholderTextColor={colors.queenblue}
            onChangeText={newneighborhood => this.setState({ neighborhood: newneighborhood })}
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
          <TouchableOpacity onPress={this.editDrugstoreData} style={PostProductFormStyles.postButton}>
            <Text style={PostProductFormStyles.imageText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
