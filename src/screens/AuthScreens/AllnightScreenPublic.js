import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar } from "react-native";
import { colors } from "../../configs/common_styles";
import api from "../../configs/api";
import plusIcon from "../../assets/icon_plus.png";
import PharmacyCard from "../../components/PharmacyCard";
import { HeaderBackButton } from "react-navigation";

export default class AllnightScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Farmácias de plantão",
      headerTintColor: colors.nyanza,
      headerStyle: {
        backgroundColor: colors.fieryrose
      } 
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      drugstores: []
    };

    this.loadDrugstores = this.loadDrugstores.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    this.loadDrugstores();
  }

  loadDrugstores() {
    api
      .get("allnight_drugstore")
      .then(drugstores_list => {
        this.setState({
          drugstores: drugstores_list.data.list_of_drugstores,
          refreshing: false
        });
      })
      .catch(error => {
        console.log("erro", error);
        this.setState({ refreshing: false });
      });
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: !this.state.refreshing
      },
      () => {
        this.loadDrugstores();
      }
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.fieryrose} barStyle="light-content" />
        <FlatList
          data={this.state.drugstores}
          renderItem={({ item }) => (
            <PharmacyCard
              data={item}
              navigate={() =>
                this.props.navigation.navigate("DrugstoreDetailsPublic", {
                  data: item
                })
              }
            />
          )}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />

        {this.props.navigation.state.params.authorized ? (
          <TouchableOpacity
            style={styles.addButtonContainer}
            onPress={() =>
              this.props.navigation.navigate("AddAllNightScreen", {
                loadDrugstores: this.loadDrugstores
              })
            }
          >
            <Image resizeMode="contain" source={plusIcon} style={styles.addButton} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 5
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 5,
    right: 10,
    width: 60,
    height: 60
  },
  addButton: {
    width: 60,
    height: 60
  },
  flatList: {
    paddingBottom: 60
  }
});
