import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { colors } from "../../configs/common_styles";
import PharmacyCard from "../../components/PharmacyCard";

const list = [
    {
        key: "1",
        name: "Farmácia 1",
        incharge: "Pablo Escobar",
        contact: { tel: "(67) 3481-2020", cel: "(67) 3481-2020" },
        address: { street: "Rua A", neighbourhood: "Vila ABC", number: 90 },
        image: null,
        location: "http://www.refletcalor.com.br/files/mapa%20cambuci%20(1).jpg"
    },
    {
        key: "2",
        name: "Farmácia 2",
        incharge: "Pancho Villa",
        contact: { tel: "(67) 3481-3030", cel: "(67) 3481-3030" },
        address: { street: "Rua B", neighbourhood: "Vila ABCD", number: 60 },
        image:
            "https://threebearsalaska.com/wp/wp-content/uploads/2017/04/Kenai-Pharmacy-e1492647043464.jpg",
        location: "http://www.refletcalor.com.br/files/mapa%20cambuci%20(1).jpg"
    }
];

export default class OnDutyScreen extends Component {
    static navigationOptions = {
        title: "Farmácias de plantão",
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
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={list}
                    renderItem={({ item }) => (
                        <PharmacyCard
                            data={item}
                            navigate={() =>
                                this.props.navigation.navigate("PharmacyDetails", { data: item })
                            }
                        />
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 5
    }
});
