import React, { Component } from "react";
import SettingsCont from "../containers/SettingsCont";

export default class SettingsScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#1E2223"
    },
    headerTitleStyle: {
      color: "#D3BD83"
    },
    title: "Settings"
  };

  render() {
    return <SettingsCont />;
  }
}
