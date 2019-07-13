import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import Chart from "./Chart";
import { Constants, Svg } from "expo";

class Transaction extends Component {
  render() {
    const qqq = 3591
    const www = 3345
    const {item} = this.props
    return (
        <View>
          <View style={container}>
            <Text style={text}>TransactionID {item.id}</Text>
            <Text style={text}>Date {item.date}</Text>
            <Text style={text}>Pair {item.pair}</Text>
            <Text style={text}>Amount {item.amount}</Text>
            <Text style={text}>Buying price {item.price}</Text>
            <Text style={text}>Current price {item.lprice}</Text>
            <Text style={text}>{item.lprice * item.amount}  {( (item.amount*item.price) < (item.lprice * item.amount) ? (item.lprice * item.amount)/(item.amount*item.price)*100-100 : (item.lprice * item.amount)/(item.amount*item.price)*100-100)}</Text>
            <Chart buyingPrice={item.price} percentq={( (item.amount*item.price) < (item.lprice * item.amount) ? (item.lprice * item.amount)/(item.amount*item.price)*100-100 : (item.lprice * item.amount)/(item.amount*item.price)*100-100)}/>
          </View>
        </View>
    );
  }
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: "bold",
    padding: 10
  },
  container: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#1E2223",
    width: screenWidth * 0.9,
    marginTop: 10,
    marginBottom: 10
  },
  text: {
    color: "#787878"
  },
  containerChart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight
  },
});

const { header, container, text, containerChart } = styles;

export default Transaction;
