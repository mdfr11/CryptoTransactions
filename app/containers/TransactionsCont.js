import React, { Component } from "react";
import { Constants, SQLite } from 'expo';
import { connect } from "react-redux";
import { FetchCoinData } from "../actions/";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button } from "react-native-elements";
import Transaction from "../components/Transaction";

const db = SQLite.openDatabase("db.db");

class TransactionsCont extends Component {
  state = {
    transactions: null
  };
  componentDidMount() {
    this.props.FetchCoinData();
    this.update();
  }
  render() {
    const { crypto, navigation } = this.props;
    const { transactions } = this.state;
    
    /* if (transactions === null || transactions.length === 0) {
      return null;
    } */

    return (
      <View style={container}>
        <Transaction transactions={transactions}/>
        <Button
          title="Add transaction"
          onPress={() => navigation.navigate("AddTransaction")}
          buttonStyle={
            {
              width: 150,
              backgroundColor: "#D3BD83"
            }
          }
        />
      </View>
    );
  }
  update() {
    db.transaction(tx => {
      tx.executeSql("select * from transactions", [], (_, { rows }) => this.setState({ transactions: rows._array }), null, this.update
      );
    });
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  transaction: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }
});

const { container, transaction } = styles;

const mapStateToProps = state => ({
  crypto: state.crypto
});

export default connect(
  mapStateToProps,
  { FetchCoinData }
)(TransactionsCont);
