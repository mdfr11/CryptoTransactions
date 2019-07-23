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
  }
  render() {
    const { crypto, navigation } = this.props;
    const { transactions } = this.state;
    const cryptoTransform = crypto.map( ({lprice, curr1, curr2}) => ({lprice, pair: curr1 + '/' + curr2}) )
    /*const mergeArrays = _.values(_.merge(
      _.keyBy(transactions, 'pair'),
      _.keyBy(cryptoTransform, 'pair')
    ))*/
    function gggg(transactions, cryptoTransform) {
      if(transactions) {
        transactions.map( (t) => {
          cryptoTransform.map( (c) => {
            if(t.pair === c.pair) {
              _.merge(t,c)
            }
          } )
        } )
      }   
    }
    gggg(transactions, cryptoTransform)
    return (
      <ScrollView>
      <View style={container}>
        <FlatList
        data={transactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Transaction item={item} update={this.update}/>
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
