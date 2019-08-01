import React, { Component } from "react";
import { SQLite } from "expo";
import { connect } from "react-redux";
import { FetchCoinData } from "../actions/";
import {
  StyleSheet,
  RefreshControl,
  View,
  FlatList,
  ScrollView,
  Text,
  Dimensions
} from "react-native";
import { Button } from "react-native-elements";
import Transaction from "../components/Transaction";
import _ from "lodash";
import AntDesign from "react-native-vector-icons/AntDesign";

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
    const Empty = () => (
      <View style={{
        padding: 15,
        borderRadius: 5,
        backgroundColor: "#1E2223",
        width: Dimensions.get("window").width * 0.9,
        marginTop: 10,
        marginBottom: 10}}>
        <Text style={{color: '#787878'}}>The list is empty</Text>
      </View>
    )
    /*const mergeArrays = _.values(_.merge(
      _.keyBy(transactions, 'pair'),
      _.keyBy(cryptoTransform, 'pair')
    ))*/
    function mergeArrays(transactions, cryptoTransform) {
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
      <View style={{height: '100%'}}>
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
              data={mergeArrays(transactions, cryptoTransform)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <Transaction item={item} update={this.update} navigation={navigation} />
              )}
            />
          </View>
        </ScrollView>
        <View>
          <Button
            onPress={() => navigation.navigate("AddTransaction", {update: this.update})}
            buttonStyle={{
              width: 45,
              height: 45,
              backgroundColor: "#D3BD83",
              borderRadius: 100,
              position: "absolute",
              bottom: 0,
              right: 0,
              margin: 30
            }}
            containerStyle={{}}
            icon={<AntDesign name="plus" size={30} color="white" />}
          />
        </View>
      </View>
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
    /*db.transaction(tx => {
      tx.executeSql(
        "drop table transactions"
      );
    });*/
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
