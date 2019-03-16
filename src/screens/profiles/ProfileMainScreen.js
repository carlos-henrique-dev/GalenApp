import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../configs/common_styles';
import Buttons from '../../components/Buttons';

export default class componentName extends Component {
	static navigationOptions = {
		title: 'Nome do usuário',
		headerLeft: null,
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
		this.state = {};
		this._navigate = this._navigate.bind(this);
	}

	_navigate = () => {
		this.props.navigation.navigate('OnDutyScreen');
	};

	render() {
		return (
			<View style={styles.container}>
				<Buttons title="Buscar farmácias de plantão" size={20} navigate_func={this._navigate} />
				<Buttons title="Buscar farmácias abertas na região" navigate_func={this._navigate} />
				<Buttons title="Pesquisar produtos" navigate_func={this._navigate} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		backgroundColor: colors.background,
		flex: 1,
		margin: 10
	}
});
