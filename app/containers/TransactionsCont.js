import React, { Component } from "react";
import { SQLite } from "expo";
import { connect } from "react-redux";
import { FetchCoinData } from "../actions/";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import Transaction from "../components/Transaction";
import _ from 'lodash';

const db = SQLite.openDatabase("db.db");

class TransactionsCont extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: null
    };
  }
  componentDidMount() {
    this.update();
    const symbol1 = "BTC";
    const pairsArray = Object.values(
      Object.assign({}, this.state.transactions)
    ).map(({ pair }) => pair);
    /* (() => {
      db.transaction(tx => {
        tx.executeSql(
          "select * from transactions",
          [],
          this.props.FetchCoinData((_, { rows }) => this.setState({ transactions: rows._array })),
          null,
          this.update
        );
      });
    })() */
  }
  render() {
    const { crypto, navigation } = this.props;
    const { transactions } = this.state;
    const cryptoTransform = crypto.map( ({lprice, curr1, curr2}) => ({lprice: lprice, pair: curr1 + '/' + curr2}) )
    const mergeArrays = _.values(_.merge(
      _.keyBy(this.state.transactions, 'pair'),
      _.keyBy(cryptoTransform, 'pair')
    ))
    console.log("asdasdsdqqqqqqqq " + JSON.stringify(mergeArrays));
    return (
      <ScrollView>
      <View style={container}>
        <FlatList
        data={mergeArrays}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Transaction item={item} />
        )} />
        <Button
          title="Add transaction"
          onPress={() => navigation.navigate("AddTransaction")}
          buttonStyle={{
            width: 150,
            backgroundColor: "#D3BD83"
          }}
        />
      </View>
      </ScrollView>
    );
  }
  update() {
    db.transaction(tx => {
      tx.executeSql(
        "select * from transactions",
        [],
        (_, { rows }) => {
          this.setState({ transactions: rows._array })
          Object.values(rows._array).map( ({pair}) => this.props.FetchCoinData(pair) );
        },
        null,
        this.update
      );
    })
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  transaction: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

const { container, transaction } = styles;

const mapStateToProps = state => ({
  crypto: state.crypto.data
});

export default connect(
  mapStateToProps,
  { FetchCoinData }
)(TransactionsCont);
