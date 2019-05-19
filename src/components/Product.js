import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import PropStyles from 'prop-types';

import Swipeable from 'react-native-swipeable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../configs/common_styles';

import { ProductStyles } from '../configs/componentsStyles';

const Product = (props) => {
  const {
    product, onRemove, onEdit, swipe, publicList, openUserList,
  } = props;

  const rightButtons = [
    <TouchableOpacity style={ProductStyles.swipeableButtons} onPress={() => onEdit(product._id)}>
      <View>
        <Ionicons name="ios-create" size={40} color={colors.queenblue} style={{ paddingLeft: 3 }} />
        <Text style={{ color: colors.queenblue, paddingTop: 5 }}>Editar</Text>
      </View>
    </TouchableOpacity>,
    <TouchableOpacity style={ProductStyles.swipeableButtons} onPress={() => onRemove(product._id)}>
      <View>
        <Ionicons name="ios-trash" size={40} color={colors.lightcarminepink} style={{ paddingLeft: 10 }} />
        <Text style={{ color: colors.lightcarminepink, paddingTop: 5 }}>Excluir</Text>
      </View>
    </TouchableOpacity>,
  ];

  return (
    <Swipeable rightButtons={swipe ? rightButtons : null}>
      <View style={ProductStyles.card}>
        <View style={ProductStyles.imageArea}>
          {product.photo ? (
            <Image style={ProductStyles.image} source={{ uri: product.photo.photo_url }} />
          ) : (
            <Text style={ProductStyles.noImageText}>Nenhuma Imagem disponível</Text>
          )}
          {product.onSale ? <Text style={ProductStyles.onSaleText}>Promoção</Text> : null}
        </View>
        <View style={ProductStyles.textArea}>
          <Text style={ProductStyles.prodName}>{product.name.toUpperCase()}</Text>

          {product.userWhoPostedType === 'costumer' ? (
            <Text style={ProductStyles.prodPrice}>{`Valor pago: R$ ${parseFloat(Math.round(product.price * 100) / 100).toFixed(2)}`}</Text>
          ) : (
            <Text style={ProductStyles.prodPrice}>{`Preço: R$ ${parseFloat(Math.round(product.price * 100) / 100).toFixed(2)}`}</Text>
          )}

          {product.userWhoPostedType === 'costumer' ? (
            <Text style={ProductStyles.prodPlace} numberOfLines={2}>
              {`Comprado na: ${product.whereToBuy}`}
            </Text>
          ) : (
            <Text style={ProductStyles.prodPlace}>{`Onde comprar: ${product.whereToBuy}`}</Text>
          )}

          <TouchableOpacity
            style={ProductStyles.postedBy}
            onPress={() => (publicList ? openUserList(product.userWhoPostedId, product.userWhoPostedName) : null)}
          >
            <Text style={ProductStyles.postedByText}>{`por: ${product.userWhoPostedName}`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );
};

Product.propTypes = {
  product: PropStyles.objectOf.isRequired,
  onRemove: PropStyles.func.isRequired,
  onEdit: PropStyles.func.isRequired,
  swipe: PropStyles.bool.isRequired,
  publicList: PropStyles.bool.isRequired,
  openUserList: PropStyles.func,
};

Product.defaultProps = {
  openUserList: null,
};

export default Product;
