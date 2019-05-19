import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity, StatusBar, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import { createOpenLink } from 'react-native-open-maps';
import call from 'react-native-phone-call';
import colors from '../../configs/common_styles';
import { DrugstoreDetailsStyles } from '../../configs/drugstoreStyles';

export default class componentName extends Component {
  static propTypes = {
    navigation: PropTypes.objectOf(Object).isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.data.name,
    headerTintColor: colors.nyanza,
    headerTransparent: true,
    headerTitleStyle: {
      fontWeight: 'bold',
      color: colors.nyanza,
      textShadowColor: colors.black,
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 10,
    },
  });

  constructor(props) {
    const { navigation } = props;
    super(props);
    this.state = {
      data: navigation.state.params.data,
    };
  }

  makeCall = (number) => {
    call({ number, prompt: true }).catch(() => {
      ToastAndroid.show('Erro ao realizar ligação', ToastAndroid.SHORT);
    });
  };

  render() {
    const {
      data: { item: data },
    } = this.state;

    const openDrugstoreOnMap = createOpenLink({
      latitude: Number.parseFloat(data.address.gpsCoordinates.latitude),
      longitude: Number.parseFloat(data.address.gpsCoordinates.longitude),
      provider: 'google',
      end: `${data.address.gpsCoordinates.latitude}, ${data.address.gpsCoordinates.longitude}`,
    });

    return (
      <View style={DrugstoreDetailsStyles.container}>
        <StatusBar backgroundColor={colors.fieryrose} barStyle="light-content" />
        <View style={DrugstoreDetailsStyles.imageContainer}>
          {data.photo.photo_url ? (
            <Image resizeMode="stretch" source={{ uri: data.photo.photo_url }} style={DrugstoreDetailsStyles.image} />
          ) : (
            <Text style={DrugstoreDetailsStyles.imageText}>Esta farmácia não possui nenhuma foto disponível</Text>
          )}
        </View>
        <View style={DrugstoreDetailsStyles.detailContainer}>
          <View style={DrugstoreDetailsStyles.contactContainer}>
            {data.type === 'temporary' ? (
              <View>
                <Text style={DrugstoreDetailsStyles.contactTitle}>Contato: </Text>
                <TouchableOpacity onPress={() => this.makeCall(`${data.contact.areacode}${data.contact.number}`)}>
                  <Text style={DrugstoreDetailsStyles.contact}>{`(${data.contact.areacode}) ${data.contact.number}`}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={DrugstoreDetailsStyles.contactTitle}>Contatos: </Text>
                {data.contacts.map(contact => (
                  <Text key={contact._id} style={DrugstoreDetailsStyles.contact}>
                    {`(${contact.areacode}) ${contact.number}`}
                  </Text>
                ))}
              </View>
            )}
          </View>
          <View style={DrugstoreDetailsStyles.addressContainer}>
            <Text style={DrugstoreDetailsStyles.addressTitle}>Endereço</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={DrugstoreDetailsStyles.addressSubTitle}>Rua:</Text>
              <Text style={DrugstoreDetailsStyles.addressContent}>{data.address.street}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={DrugstoreDetailsStyles.addressSubTitle}>Bairro:</Text>
              <Text style={DrugstoreDetailsStyles.addressContent}>{data.address.neighborhood}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={DrugstoreDetailsStyles.addressSubTitle}>Número:</Text>
              <Text style={DrugstoreDetailsStyles.addressContent}>{data.address.number}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={openDrugstoreOnMap}>
          <Text style={DrugstoreDetailsStyles.openMap}>Abrir no mapa</Text>
        </TouchableOpacity>
        {/*
                TODO: verificar se é uma farmácia temporária ou não
                <View style={styles.productButton}>
                    <Text style={styles.productText}>Ver produtos comprados nesta farmácia</Text>
                </View> */}
      </View>
    );
  }
}
