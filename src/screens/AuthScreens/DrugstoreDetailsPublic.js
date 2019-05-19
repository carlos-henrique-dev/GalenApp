import React, { Component } from 'react';
import {
  View, Text, Image, TouchableOpacity, StatusBar,
} from 'react-native';
import PropTypes from 'prop-types';
import { createOpenLink } from 'react-native-open-maps';
import call from 'react-native-phone-call';
import colors from '../../configs/common_styles';
import DrugstoreDetailsPublicStyles from '../../configs/authscreensStyles';

export default class DrugstoreDetailsPublic extends Component {
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
    call({ number, prompt: true }).catch((/* error */) => {
      /* console.log(error) */
    });
  };

  render() {
    const { data } = this.state;
    const openDrugstoreOnMap = createOpenLink({
      latitude: Number.parseFloat(data.address.gpsCoordinates.latitude),
      longitude: Number.parseFloat(data.address.gpsCoordinates.longitude),
      provider: 'google',
      end: `${data.address.gpsCoordinates.latitude}, ${data.address.gpsCoordinates.longitude}`,
    });

    return (
      <View style={DrugstoreDetailsPublicStyles.container}>
        <StatusBar backgroundColor={colors.fieryrose} barStyle="light-content" />
        <View style={DrugstoreDetailsPublicStyles.imageContainer}>
          {data.photo.photo_url ? (
            <Image
              resizeMode="stretch"
              source={{ uri: data.photo.photo_url }}
              style={DrugstoreDetailsPublicStyles.image}
            />
          ) : (
            <Text style={DrugstoreDetailsPublicStyles.imageText}>
              Esta farmácia não possui nenhuma foto disponível
            </Text>
          )}
        </View>
        <View style={DrugstoreDetailsPublicStyles.detailContainer}>
          <View style={DrugstoreDetailsPublicStyles.contactContainer}>
            {data.type === 'temporary' ? (
              <View>
                <Text style={DrugstoreDetailsPublicStyles.contactTitle}>Contato: </Text>
                <TouchableOpacity
                  onPress={() => this.makeCall(`${data.contact.areacode}${data.contact.number}`)}
                >
                  <Text style={DrugstoreDetailsPublicStyles.contact}>
                    {`(${data.contact.areacode}) ${data.contact.number}`}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Text style={DrugstoreDetailsPublicStyles.contactTitle}>Contatos: </Text>
                {data.contacts.map(contact => (
                  <Text key={contact._id} style={DrugstoreDetailsPublicStyles.contact}>
                    {`(${contact.areacode}) ${contact.number}`}
                  </Text>
                ))}
              </View>
            )}
          </View>
          <View style={DrugstoreDetailsPublicStyles.addressContainer}>
            <Text style={DrugstoreDetailsPublicStyles.addressTitle}>Endereço</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={DrugstoreDetailsPublicStyles.addressSubTitle}>Rua:</Text>
              <Text style={DrugstoreDetailsPublicStyles.addressContent}>{data.address.street}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={DrugstoreDetailsPublicStyles.addressSubTitle}>Bairro:</Text>
              <Text style={DrugstoreDetailsPublicStyles.addressContent}>
                {data.address.neighborhood}
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={DrugstoreDetailsPublicStyles.addressSubTitle}>Número:</Text>
              <Text style={DrugstoreDetailsPublicStyles.addressContent}>{data.address.number}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={openDrugstoreOnMap}>
          <Text style={DrugstoreDetailsPublicStyles.openMap}>Abrir no mapa</Text>
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

DrugstoreDetailsPublic.propTypes = {
  navigation: PropTypes.node.isRequired,
};
