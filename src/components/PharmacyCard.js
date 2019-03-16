import React from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../configs/common_styles';

const { height, width } = Dimensions.get('window');

export default (props) => {
	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				<View style={styles.imageContainer}>
					{props.data.image ? (
						<Image source={{ uri: props.data.image }} style={styles.image} />
					) : (
						<Text style={styles.imageText}>Imagem não disponível</Text>
					)}
				</View>
				<View style={styles.dataContainer}>
					<Text style={styles.title}>{props.data.name}</Text>
					<Text style={styles.incharge}>Farmáceutico responsável:</Text>
					<Text style={styles.personIncharge}>{props.data.incharge}</Text>
					<View style={styles.contactContainer}>
						<Text style={styles.contact}>Contato: </Text>
						<Text style={styles.pharmacyContact}>{props.data.contact.cel}</Text>
					</View>
				</View>
			</View>
			<View style={styles.detailContainer}>
				<TouchableOpacity onPress={() => props.navigate()}>
					<Text style={styles.detail}>Mais detalhes</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: width - 20,
		height: width / 2,
		backgroundColor: colors.mainBlue,
		marginTop: 10,
		paddingTop: 10
	},
	infoContainer: {
		justifyContent: 'space-around',
		flex: 4,
		flexDirection: 'row'
	},
	detailContainer: {
		flex: 1,
		marginBottom: 10
	},
	imageContainer: {
		width: '30%',
		height: '65%',
		justifyContent: 'center',
		marginLeft: 10,
		marginTop: 5
	},
	image: {
		flex: 1
	},
	imageText: {
		textAlign: 'center',
		color: '#CED4DA'
	},
	dataContainer: {
		width: '65%',
		height: '100%',
		alignItems: 'center'
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.mainPurple,
		margin: 5
	},
	incharge: {
		fontSize: 12,
		color: colors.white
	},
	personIncharge: {
		fontSize: 14,
		color: colors.mainPurple
	},
	contactContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	contact: {
		color: colors.white
	},
	pharmacyContact: {
		fontSize: 18,
		color: colors.mainPurple,
		fontWeight: 'bold'
	},
	detail: {
		fontSize: 22,
		fontWeight: 'bold',
		textAlign: 'center',
		color: colors.mainPurple
	}
});
