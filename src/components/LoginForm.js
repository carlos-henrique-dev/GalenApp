import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../configs/common_styles";

const { width } = Dimensions.get("window");

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      remember: false
    };
    this.login = this.login.bind(this);
  }

  login() {
    if (this.state.email.trim() !== "" && this.state.password.trim() !== "") {
      this.props.login(this.state.email, this.state.password);
    } else {
      Alert.alert("Erro", "Preencha os campos corretamente");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <Icon name="user" size={20} style={styles.icon} />
          <TextInput
            placeholder="usuário"
            placeholderTextColor={colors.fieryrose}
            style={styles.textInput}
            autoCapitalize="none"
            value={this.state.email}
            onChangeText={email => this.setState({ ...this.state, email: email })}
          />
        </View>
        <View style={styles.input}>
          <Icon name="lock" size={20} style={styles.icon} />
          <TextInput
            placeholder="senha"
            placeholderTextColor={colors.fieryrose}
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={false}
            value={this.state.password}
            onChangeText={password => this.setState({ ...this.state, password: password })}
          />
        </View>

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

        <TouchableOpacity
          disabled={this.props.disabled}
          onPress={this.login}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  input: {
    flexDirection: "row",
    width: width - 50,
    height: 45,
    margin: 5,
    marginTop: 15,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.fieryrose,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  textInput: {
    fontSize: 16,
    marginLeft: 5,
    color: colors.nyanza
  },
  icon: {
    color: colors.fieryrose,
    marginLeft: 5,
    marginRight: 5
  },
  rememberButton: {
    margin: 5
  },
  rememberText: {
    color: colors.nyanza,
    fontSize: 16,
    textAlign: "center"
  },
  rememberTextTrue: {
    color: colors.fieryrose
  },
  loginButton: {
    width: width - 80,
    height: 30,
    margin: 5,
    backgroundColor: colors.fieryrose,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  loginButtonText: {
    color: colors.nyanza,
    fontSize: 22,
    fontWeight: "bold"
  }
});
