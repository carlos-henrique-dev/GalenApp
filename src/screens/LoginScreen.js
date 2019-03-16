import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InputComponent from '../components/InputComponent';
import { colors } from '../configs/common_styles';

export default class LoginScreen extends Component {
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			password: '',
			remember: false,
			forgotPassword: false
		};
		this.remember = this.state.remember;

		this.login = this.login.bind(this);
	}

	login() {
		this.props.navigation.navigate('FirstLogin');
	}

	render() {
		return (
			<View style={styles.screen}>
				<Text style={{ fontSize: 80, color: colors.mainPurple }}>GALEN</Text>
				<View style={styles.inputBox}>
					<InputComponent
						icon="user"
						placeholder="usuário"
						placeholderTextColor={colors.mainPurple}
						value={this.state.user}
						onChangeText={(user) => this.setState({ ...this.state, user: user })}
					/>
					<InputComponent
						icon="lock"
						placeholder="senha"
						placeholderTextColor={colors.mainPurple}
						secureTextEntry={true}
						value={this.state.password}
						onChangeText={(password) => this.setState({ ...this.state, password: password })}
					/>

					<TouchableOpacity
						onPress={() => this.setState({ remember: !this.state.remember })}
						style={styles.rememberButton}
					>
						<Text
							style={[
								styles.rememberText,
								this.state.remember === true ? styles.rememberTextTrue : null
							]}
						>
							Lembre-se de mim
						</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity onPress={this.login} style={styles.loginButton}>
					<Text style={styles.loginButtonText}>Entrar</Text>
				</TouchableOpacity>

				{this.state.forgotPassword ? (
					<TouchableOpacity onPress={() => alert('recuperando a senha')} style={styles.forgotButton}>
						<Text style={styles.forgotText}>Esqueceu a senha?</Text>
					</TouchableOpacity>
				) : null}
				<View>
					<TouchableOpacity onPress={() => alert('encontrando farmácia')} style={styles.findPharmacyButton}>
						<Text style={styles.findPharmacyText}>Encontrar farmácia de plantão</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: colors.mainBlue,
		justifyContent: 'center',
		alignItems: 'center'
	},
	inputBox: {
		width: '85%',
		height: 200,
		padding: 10,
		marginTop: 10,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	loginButton: {
		width: 150,
		height: 50,
		backgroundColor: colors.mainPurple,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	loginButtonText: {
		color: colors.mainBlue,
		fontSize: 28,
		fontWeight: 'bold'
	},
	forgotButton: {
		margin: 10
	},
	forgotText: {
		color: colors.white,
		fontSize: 14,
		textAlign: 'center'
	},
	rememberButton: {
		margin: 5
	},
	rememberText: {
		color: colors.white,
		fontSize: 16,
		textAlign: 'center'
	},
	rememberTextTrue: {
		color: colors.mainPurple
	},
	findPharmacyButton: {
		marginTop: 90
	},
	findPharmacyText: {
		color: colors.mainPurple,
		fontSize: 22,
		textAlign: 'center'
	}
});
