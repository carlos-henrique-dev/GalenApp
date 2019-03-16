import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../configs/common_styles';

export default class FirstLogin extends Component {
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
		this.state = {};
		this.signUp = this.signUp.bind(this);
	}

	signUp(data) {
		this.props.navigation.navigate('SignUp', { type: data });
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.backButtom}>
					<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
						<Ionicons name="ios-arrow-back" size={30} style={styles.icon} />
					</TouchableOpacity>
				</View>

				<Text style={styles.title}>Escolha a opção desejada </Text>

				<View style={styles.optionButtom}>
					<TouchableOpacity onPress={() => this.signUp('pharmacy')}>
						<Ionicons name="md-globe" size={90} style={styles.icon} />
						<Text style={styles.optionText}>Possuo uma farmácia</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.optionButtom}>
					<TouchableOpacity onPress={() => this.signUp('custumer')}>
						<Ionicons name="md-people" size={90} style={styles.icon} />
						<Text style={styles.optionText}>Sou cliente</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.mainBlue,
		justifyContent: 'center',
		alignItems: 'center'
	},
	backButtom: {
		position: 'absolute',
		top: 10,
		left: 10
	},
	title: {
		color: colors.mainPurple,
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 50
	},
	optionButtom: {
		width: 250,
		height: 150,
		padding: 10,
		margin: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	optionText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: colors.mainPurple
	},
	icon: {
		alignSelf: 'center',
		color: colors.mainPurple
	}
});
