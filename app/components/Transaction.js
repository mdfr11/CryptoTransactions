import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";

class Transaction extends Component {
  render() {
    const { transactions } = this.props;
    return (
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={container}>
            <Text style={text}>{item.id}</Text>
            <Text style={text}>{item.date}</Text>
            <Text style={text}>{item.coin}</Text>
            <Text style={text}>{item.amount}</Text>
            <Text style={text}>{item.price}</Text>
          </View>
        )}
      />
    );
  }
}

const screenWidth = Math.round(Dimensions.get("window").width);

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
    color: '#787878'
  }
});

const { header, container, text } = styles;

export default Transaction;
