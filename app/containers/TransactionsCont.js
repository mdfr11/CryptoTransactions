import React, { Component } from "react";
import { SQLite } from "expo";
import { connect } from "react-redux";
import { FetchCoinData } from "../actions/";
import {
  StyleSheet,
  RefreshControl,
  View,
  FlatList,
  ScrollView
} from "react-native";
import { Button } from "react-native-elements";
import Transaction from "../components/Transaction";
import _ from "lodash";

const db = SQLite.openDatabase("db.db");

class TransactionsCont extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: null,
      refreshing: false
    };
  }
  componentDidMount() {
    this.update();
  }
  render() {
    const { crypto, navigation } = this.props;
    const { transactions } = this.state;
    const cryptoTransform = crypto.map(({ lprice, curr1, curr2 }) => ({
      lprice,
      pair: curr1 + "/" + curr2
    }));
    /*const mergeArrays = _.values(_.merge(
      _.keyBy(transactions, 'pair'),
      _.keyBy(cryptoTransform, 'pair')
    ))*/
    function gggg(transactions, cryptoTransform) {
      var lll = [];
      if (transactions && cryptoTransform) {
        transactions.map(t => {
          cryptoTransform.map(c => {
            if (t.pair === c.pair) {
              lll.push(_.merge(t, c));
            }
          });
        });
      }
      return _.uniq(lll);
    }
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <View style={container}>
          <FlatList
            data={gggg(transactions, cryptoTransform)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Transaction item={item} update={this.update} id={item.id} />
            )}
          />
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
  update = async () => {
    db.transaction(tx => {
      tx.executeSql(
        "select * from transactions",
        [],
        (_, { rows }) => {
          this.setState({ transactions: rows._array });
          Object.values(rows._array).map(({ pair }) =>
            this.props.FetchCoinData(pair)
          );
        },
        null,
        this.update
      );
    });
  };
  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.update().then(() => {
      this.setState({ refreshing: false });
    });
  };
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
