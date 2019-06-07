import React from 'react';
import {
  Text, View, Image, TouchableOpacity, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import call from 'react-native-phone-call';
import { PharmacyCardStyles } from '../configs/componentsStyles';

const PharmacyCard = (props) => {
  const {
    data: { item: dados },
    navigate,
  } = props;
  const makeCall = (number) => {
    call({ number, prompt: true }).catch(() => {
      ToastAndroid.show('Erro ao fazer ligação', ToastAndroid.SHORT);
    });
  };

  return (
    <View elevation={5} style={PharmacyCardStyles.container}>
      <View style={PharmacyCardStyles.infoContainer}>
        <View style={PharmacyCardStyles.imageContainer}>
          {dados.photo.photo_url ? (
            <Image source={{ uri: dados.photo.photo_url }} style={PharmacyCardStyles.image} resizeMode="contain" />
          ) : (
            <Text style={PharmacyCardStyles.imageText}>Imagem não disponível</Text>
          )}
        </View>

        <View style={PharmacyCardStyles.dadosContainer}>
          <Text style={PharmacyCardStyles.title}>{dados.name}</Text>
          <Text style={PharmacyCardStyles.contact}>Contato</Text>
          <TouchableOpacity
            style={PharmacyCardStyles.contactContainer}
            onPress={() => makeCall(
              `${dados.contact ? dados.contact.areacode : dados.contacts.areacode}${dados.contact ? dados.contact.number : dados.contacts.number}`,
            )
            }
          >
            {dados.contact ? (
              <Text style={PharmacyCardStyles.pharmacyContact}>{`(${dados.contact.areacode}) ${dados.contact.number}`}</Text>
            ) : (
              <Text style={PharmacyCardStyles.pharmacyContact}>{`(${dados.contacts[0].areacode}) ${dados.contacts[0].number}`}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={PharmacyCardStyles.detailContainer}>
        <TouchableOpacity onPress={() => navigate()}>
          <Text style={PharmacyCardStyles.detail}>Mais detalhes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

PharmacyCard.propTypes = {
  data: PropTypes.objectOf(Object).isRequired,
  navigate: PropTypes.func.isRequired,
};

export default PharmacyCard;
