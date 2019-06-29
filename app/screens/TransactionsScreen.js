import React, { Component } from "react";
import TransactionsCont from "../containers/TransactionsCont";

export default class TransactionsScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#1E2223"
    },
    headerTitleStyle: {
      color: "#D3BD83"
    },
    title: "Your transactions"
  };

  render() {
    return <TransactionsCont />;
  }
}
