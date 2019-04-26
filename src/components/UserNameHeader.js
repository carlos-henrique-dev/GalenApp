import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import { connect } from "react-redux";
import { colors } from "../configs/common_styles";

class UserNameHeader extends Component {
    render() {
        return <Text style={styles.text}>{this.props.userName}</Text>;
    }
}

const mapStateToProps = state => {
    return {
        userName: state.user.name
    };
};

export default connect(mapStateToProps)(UserNameHeader);

const styles = StyleSheet.create({
    text: {
        flex: 1,
        fontSize: 20,
        color: colors.nyanza,
        textAlign: "center"
    }
});
