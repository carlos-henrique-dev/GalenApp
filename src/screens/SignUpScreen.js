import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../configs/common_styles';
import InputComponent from '../components/InputComponent';
import Footer from '../components/Footer';

export default class SignUpScreen extends Component {
	static navigationOptions = {
		title: 'Cadastro',
		headerTintColor: colors.mainBlue,
		headerStyle: {
			backgroundColor: colors.mainPurple
		},
		headerTitleStyle: {
			color: colors.mainBlue
		}
	};
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			password: '',
			mail: '',
			repetpassword: '',
			companyName: '',
			CPNJ: '',
			street: '',
			number: '',
			aditionalAdressDetail: '',
			neighborhood: '',
			CEP: '',
			city: '',
			currentstate: '',
			tel: '',
			cel: '',

			loginType: props.navigation.state.params.type
		};
		this.signUp = this.signUp.bind(this);
	}

	signUp() {
		this.props.navigation.navigate('TabsProfile');
	}

	render() {
		return (
			<View style={styles.container}>
				{this.state.loginType === 'custumer' ? (
					<View style={styles.loginArea}>
						<Text style={styles.loginAreaTitle}> Informe os seguintes dados </Text>
						<InputComponent
							icon="user"
							placeholder="usuário"
							placeholderTextColor={colors.mainPurple}
							value={this.state.user}
							onChangeText={(user) => this.setState({ ...this.state, user: user })}
						/>
						<InputComponent
							icon="at"
							placeholder="e-mail"
							placeholderTextColor={colors.mainPurple}
							value={this.state.mail}
							onChangeText={(mail) => this.setState({ ...this.state, mail: mail })}
						/>
						<InputComponent
							icon="lock"
							placeholder="senha"
							placeholderTextColor={colors.mainPurple}
							secureTextEntry={true}
							value={this.state.password}
							onChangeText={(password) => this.setState({ ...this.state, password: password })}
						/>
						<InputComponent
							icon="lock"
							placeholder="Confirme a senha"
							placeholderTextColor={colors.mainPurple}
							secureTextEntry={true}
							value={this.state.repetpassword}
							onChangeText={(repetpassword) =>
								this.setState({ ...this.state, repetpassword: repetpassword })}
						/>
						<View style={styles.footer}>
							<Footer
								title1="Cancelar"
								title2="Cadastrar"
								navigate={() => this.props.navigation.goBack()}
								signup={this.signUp}
							/>
						</View>
					</View>
				) : (
					<View style={styles.loginArea}>
						<ScrollView style={{ flex: 1 }}>
							<Text style={styles.loginAreaTitle}> Informe os seguintes dados </Text>
							<InputComponent
								icon="building"
								placeholder="nome da farmácia"
								placeholderTextColor={colors.mainPurple}
								value={this.state.companyName}
								onChangeText={(companyName) =>
									this.setState({ ...this.state, companyName: companyName })}
							/>
							<InputComponent
								icon="id-card"
								placeholder="CNPJ"
								placeholderTextColor={colors.mainPurple}
								value={this.state.CNPJ}
								onChangeText={(CNPJ) => this.setState({ ...this.state, CNPJ: CNPJ })}
							/>

							<TouchableOpacity onPress={() => alert('selecionou a imagem')}>
								<InputComponent
									icon="paperclip"
									placeholder="Selecione uma foto da sua farmácia"
									editable={false}
									placeholderTextColor={colors.mainPurple}
									style={{ fontSize: 14 }}
								/>
							</TouchableOpacity>

							<Text style={styles.subTitle}>Dado de localização</Text>
							<InputComponent
								icon="road"
								placeholder="Rua"
								placeholderTextColor={colors.mainPurple}
								value={this.state.street}
								onChangeText={(street) => this.setState({ ...this.state, street: street })}
							/>
							<View style={{ flexDirection: 'row' }}>
								<InputComponent
									icon="phone"
									placeholder="Número"
									special
									placeholderTextColor={colors.mainPurple}
									value={this.state.number}
									onChangeText={(number) => this.setState({ ...this.state, number: number })}
								/>
								<InputComponent
									icon="plus"
									placeholder="Complemento"
									special
									placeholderTextColor={colors.mainPurple}
									value={this.state.aditionalAdressDetail}
									onChangeText={(aditionalAdressDetail) =>
										this.setState({ ...this.state, aditionalAdressDetail: aditionalAdressDetail })}
								/>
							</View>
							<InputComponent
								icon="road"
								placeholder="Bairro"
								placeholderTextColor={colors.mainPurple}
								value={this.state.neighborhood}
								onChangeText={(neighborhood) =>
									this.setState({ ...this.state, neighborhood: neighborhood })}
							/>
							<InputComponent
								icon="phone"
								placeholder="CEP"
								placeholderTextColor={colors.mainPurple}
								value={this.state.CEP}
								onChangeText={(CEP) => this.setState({ ...this.state, CEP: CEP })}
							/>
							<InputComponent
								icon="road"
								placeholder="Cidade"
								placeholderTextColor={colors.mainPurple}
								value={this.state.city}
								onChangeText={(city) => this.setState({ ...this.state, city: city })}
							/>
							<InputComponent
								icon="road"
								placeholder="Estado"
								placeholderTextColor={colors.mainPurple}
								value={this.state.currentstate}
								onChangeText={(currentstate) =>
									this.setState({ ...this.state, currentstate: currentstate })}
							/>

							<Text style={styles.subTitle}>Contato</Text>
							<InputComponent
								icon="phone"
								placeholder="Tel:"
								placeholderTextColor={colors.mainPurple}
								value={this.state.tel}
								onChangeText={(tel) => this.setState({ ...this.state, tel: tel })}
							/>
							<InputComponent
								icon="phone"
								placeholder="Cel:"
								placeholderTextColor={colors.mainPurple}
								value={this.state.cel}
								onChangeText={(cel) => this.setState({ ...this.state, cel: cel })}
							/>

							<Text style={styles.subTitle}>Dados da conta</Text>
							<InputComponent
								icon="user"
								placeholder="usuário"
								placeholderTextColor={colors.mainPurple}
								value={this.state.user}
								onChangeText={(user) => this.setState({ ...this.state, user: user })}
							/>
							<InputComponent
								icon="at"
								placeholder="e-mail"
								placeholderTextColor={colors.mainPurple}
								value={this.state.mail}
								onChangeText={(mail) => this.setState({ ...this.state, mail: mail })}
							/>
							<InputComponent
								icon="lock"
								placeholder="senha"
								placeholderTextColor={colors.mainPurple}
								secureTextEntry={true}
								value={this.state.password}
								onChangeText={(password) => this.setState({ ...this.state, password: password })}
							/>
							<InputComponent
								icon="lock"
								placeholder="Confirme a senha"
								placeholderTextColor={colors.mainPurple}
								secureTextEntry={true}
								value={this.state.passwrepetpasswordord}
								onChangeText={(repetpassword) =>
									this.setState({ ...this.state, repetpassword: repetpassword })}
							/>
						</ScrollView>
						<View style={styles.footer}>
							<Footer title1="Cancelar" title2="Cadastrar" navigate={this.props.navigation.goBack} />
						</View>
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background
	},
	footer: {
		marginTop: 10
	},
	loginArea: {
		flex: 1,
		alignItems: 'center',
		margin: 5,
		padding: 5
	},
	loginAreaTitle: {
		fontWeight: 'bold',
		fontSize: 24,
		color: colors.mainPurple
	},
	pickImage: {
		margin: 15,
		fontSize: 18,
		marginLeft: 10,
		color: colors.mainPurple
	},
	pickImageIcon: {
		color: colors.mainPurple,
		marginLeft: 5,
		marginRight: 5
	},
	subTitle: {
		marginTop: 10,
		color: colors.mainPurple,
		fontSize: 18,
		fontWeight: 'bold'
	}
});
