import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchCoinData } from "../actions/";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Button } from "react-native-elements";

class TransactionsCont extends Component {
  componentDidMount() {
    this.props.FetchCoinData();
  }
  render() {
    const { crypto, navigation } = this.props;
    console.log("aaaaaaa " + JSON.stringify(crypto));
    return (
      <View style={container}>
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
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 35,
  }
});

const { container } = styles;

const mapStateToProps = state => ({
  crypto: state.crypto
});

export default connect(
  mapStateToProps,
  { FetchCoinData }
)(TransactionsCont);
