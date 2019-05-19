import React from 'react';
import {
  Text, View, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import call from 'react-native-phone-call';
import { PharmacyCardStyles } from '../configs/componentsStyles';

const PharmacyCard = (props) => {
  const { data, navigate } = props;

  const makeCall = (number) => {
    call({ number, prompt: true }).catch(error => console.log(error));
  };

  return (
    <View elevation={5} style={PharmacyCardStyles.container}>
      <View style={PharmacyCardStyles.infoContainer}>
        <View style={PharmacyCardStyles.imageContainer}>
          {data.photo.photo_url ? (
            <Image
              source={{ uri: data.photo.photo_url }}
              style={PharmacyCardStyles.image}
              resizeMode="contain"
            />
          ) : (
            <Text style={PharmacyCardStyles.imageText}>Imagem não disponível</Text>
          )}
        </View>

        <View style={PharmacyCardStyles.dataContainer}>
          <Text style={PharmacyCardStyles.title}>{data.name}</Text>
          <Text style={PharmacyCardStyles.contact}>Contato</Text>
          <TouchableOpacity
            style={PharmacyCardStyles.contactContainer}
            onPress={() => makeCall(`${data.contact.areacode}${data.contact.number}`)}
          >
            <Text style={PharmacyCardStyles.pharmacyContact}>
              {`(${data.contact.areacode}) ${data.contact.number}`}
            </Text>
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
  data: PropTypes.objectOf.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default PharmacyCard;
