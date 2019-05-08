import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { colors } from "../../configs/common_styles";
import api from "../../configs/api";
import plusIcon from "../../assets/icon_plus.png";
import PharmacyCard from "../../components/PharmacyCard";

export default class OnDutyScreen extends Component {
    static navigationOptions = {
        headerTitle: "Farmácias de plantão",
        headerTintColor: colors.nyanza,
        headerStyle: {
            backgroundColor: colors.fieryrose
        }
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
        console.log("opa");
        api.get("allnight_drugstore")
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
                <FlatList
                    data={this.state.drugstores}
                    renderItem={({ item }) => (
                        <PharmacyCard
                            data={item}
                            navigate={() =>
                                this.props.navigation.navigate("DrugstoreDetails", { data: item })
                            }
                        />
                    )}
                    keyExtractor={item => {
                        item._id;
                    }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flatList}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}
                />
                <TouchableOpacity
                    style={styles.addButtonContainer}
                    onPress={() =>
                        this.props.navigation.navigate("AddAllNightScreen", {
                            loadproducts: this.loadDrugstores
                        })
                    }
                >
                    <Image resizeMode="contain" source={plusIcon} style={styles.addButton} />
                </TouchableOpacity>
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
