import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import ProfileMainScreen from "./userProfileMainScreen";
import OnDutyScreen from "../OnDutyScreen";
import PharmacyDetails from "../PharmacyDetails";

const ProfileNavigator = createStackNavigator({
    ProfileMainScreen: {
        screen: ProfileMainScreen
    },
    OnDutyScreen: {
        screen: OnDutyScreen
    },
    PharmacyDetails: {
        screen: PharmacyDetails
    }
});

export default createAppContainer(ProfileNavigator);
