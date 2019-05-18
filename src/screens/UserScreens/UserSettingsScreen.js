import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from "react-native";
import { colors } from "../../configs/common_styles";

const { width } = Dimensions.get("window");

export default class UserSettingsScreen extends Component {
  static navigationOptions = {
    headerTitle: "Configurações",
    headerTintColor: colors.nyanza,
    headerStyle: {
      backgroundColor: colors.fieryrose
    }
  };

  constructor(props) {
    super(props);
    this.state = {};

    this.logout = this.logout.bind(this);
  }

  logout() {
    Alert.alert(
      "Deslogar",
      "Deseja mesmo deslogar?",
      [
        {
          text: "Não"
        },
        {
          text: "Sim",
          onPress: async () => {
            await AsyncStorage.removeItem("data")
              .then(() => {
                this.props.navigation.navigate("LoginScreen");
              })
              .catch(err => console.log("erro", err));
          }
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.configsCards, { flex: 3 }]}>
          <Text style={styles.subTitle}> Configurações da conta </Text>
        </View>
        <View style={styles.divisor} />
        <View style={[styles.configsCards, { flex: 1 }]}>
          <Text style={styles.subTitle}> Configurações do aplicativo </Text>

          <View elevation={5} style={styles.buttonBox}>
            <TouchableOpacity onPress={this.logout}>
              <Text style={styles.buttonText}>Deslogar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  divisor: {
    borderTopWidth: 0.8,
    width: (width * 80) / 100,
    color: colors.queenblue
  },
  subTitle: {
    fontSize: 15,
    color: colors.queenblue,
    paddingBottom: 10
  },
  configsCards: {
    margin: 5,
    width,
    paddingLeft: 10,
    paddingRight: 10
  },
  buttonBox: {
    padding: 5,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  buttonText: {
    fontSize: 15,
    color: colors.fieryrose
  }
});
