import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Chart from "./Chart";
import AntDesign from "react-native-vector-icons/AntDesign";
import { SQLite } from "expo";
import { Button } from "react-native-elements";

const db = SQLite.openDatabase("db.db");

class Transaction extends Component {
  render() {
    const round = (amount, price, lprice) => {
      let percent = amount * price < lprice * amount
      ? ((lprice * amount) / (amount * price)) *
          100 -
          100
      : ((lprice * amount) / (amount * price)) *
          100 -
          100
      return percent < 0 ? (Math.floor(Math.abs(percent) * 100) * -1) / 100 : percent.toFixed(2);
    };
    const { item, update, navigation } = this.props;
    return (
      <View>
        <View style={container}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            <Button
              buttonStyle={{ padding: 0 }}
              onPress={() => navigation.navigate("EditTransaction", {id: item.id})}
              icon={<AntDesign name="edit" size={20} color="#D3BD83" />}
              type="clear"
            />
            <Button
              buttonStyle={{ padding: 0 }}
              onPress={() =>
                db.transaction(
                  tx => {
                    tx.executeSql(`delete from transactions where id = ?;`, [
                      item.id
                    ]);
                  },
                  null,
                  update
                )
              }
              icon={<AntDesign name="close" size={20} color="#D3BD83" />}
              type="clear"
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text style={text}>ID {item.id}</Text>
            <Text style={text}>Date - {item.date}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text style={textYellow}>{item.pair}</Text>
            <Text style={text}>${item.lprice}</Text>
            {/*<Text style={text}>TransactionID {item.id}</Text>
            {/*<Button
              buttonStyle={{padding: 0}}
              onPress={() =>
                db.transaction(
                  tx => {
                    tx.executeSql(`delete from transactions where id = ?;`, [item.id]);},
                  null,
                  update
                )
              }
              icon={<AntDesign name="close" size={20} color="#D3BD83" />}
              type="clear"
            />*/}
          </View>
          {/*<Text style={text}>Date {item.date}</Text>*/}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text style={text}>Amount {item.amount}</Text>
            <Text style={text}>Buying price ${item.price}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Text style={round(item.amount, item.price, item.lprice) > 0 ? percentUp : percentDown}>
              {round(item.amount, item.price, item.lprice)} %
            </Text>
            <Text style={textYellow}>Current value ${parseFloat(item.lprice * item.amount)}</Text>
          </View>
          <Chart
            buyingPrice={item.price}
            percentq={
              item.amount * item.price < item.lprice * item.amount
                ? ((item.lprice * item.amount) / (item.amount * item.price)) *
                    100 -
                  100
                : ((item.lprice * item.amount) / (item.amount * item.price)) *
                    100 -
                  100
            }
          />
        </View>
      </View>
    );
  }
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
    borderRadius: 5,
    backgroundColor: "#1E2223",
    width: screenWidth * 0.9,
    marginTop: 10,
    marginBottom: 10
  },
  text: {
    color: "#787878"
  },
  percentUp: {
    color: "#2DB091"
  },
  percentDown: {
    color: "#D86273"
  },
  textYellow: {
    color: "#D3BD83"
  }
});

const { container, text, percentUp, percentDown, textYellow } = styles;

export default Transaction;
