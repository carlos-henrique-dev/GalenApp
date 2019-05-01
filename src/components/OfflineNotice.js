import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { colors } from "../configs/common_styles";

const { width } = Dimensions.get("window");

function MiniOffliineSign() {
    return (
        <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>Sem conexão com a internet</Text>
        </View>
    );
}

export default class OfflineNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConected: "wifi"
        };
        this.handleConnectivityChange = this.handleConnectivityChange.bind(this);
    }

    handleConnectivityChange(connectionInfo) {
        this.setState({ isConected: connectionInfo.type }, () => {
            if (this.state.isConected === "none" || this.state.isConected === "unkown") {
                this.props.onChange(true);
            } else {
                this.props.onChange(false);
            }
        });
    }

    componentDidMount() {
        NetInfo.addEventListener("connectionChange", this.handleConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener("connectionChange", this.handleConnectivityChange);
    }

    render() {
        if (this.state.isConected === "none" || this.state.isConected === "unkown") {
            return <MiniOffliineSign />;
        }
        return null;
    }
}

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: colors.lightcarminepink,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        width,
        position: "absolute",
        top: Platform.os === "ios" ? 30 : 0
    },
    offlineText: {
        color: "#fff"
    }
});
