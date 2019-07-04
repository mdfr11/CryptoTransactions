import React, { Component } from "react";
import { StyleSheet, Text, View, Picker, Dimensions } from "react-native";
import { Button, Input } from "react-native-elements";
import { Constants, SQLite } from "expo";
import { Calendar } from "react-native-calendars";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

const db = SQLite.openDatabase("db.db");

class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null, coin: null, amount: null, price: null };
    this.onDayPress = this.onDayPress.bind(this);
  }
  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists transactions (id integer primary key not null, coin text, amount int, price int, date int);"
      );
    });
  }
  render() {
    console.log("saasdsadaasd " + JSON.stringify(this.state.coin));
    console.log("saasdsadaasd " + JSON.stringify(this.state.selected));
    console.log("saasdsadaasdweqw " + JSON.stringify(this.state.amount));
    const CalendarCont = () => (
      <View style={calendarContStyle}>
        <Menu>
          <MenuTrigger
            customStyles={triggerStyles}
            text={
              this.state.selected === null ? "Select date" : this.state.selected
            }
          />
          <MenuOptions customStyles={optionsStyles}>
            <MenuOption>
              <Calendar
                current={
                  this.state.selected === null
                    ? Date.now()
                    : this.state.selected
                }
                minDate={Date.now() - 31556926000}
                maxDate={Date.now()}
                onDayPress={this.onDayPress}
                style={calendar}
                firstDay={1}
                markedDates={{
                  [this.state.selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedDotColor: "orange"
                  }
                }}
                theme={{
                  calendarBackground: "#1E2223",
                  textSectionTitleColor: "#787878",
                  selectedDayBackgroundColor: "#D3BD83",
                  selectedDayTextColor: "#ffffff",
                  todayTextColor: "#D3BD83",
                  dayTextColor: "#787878",
                  textDisabledColor: "#333333",
                  dotColor: "#D3BD83",
                  selectedDotColor: "#ffffff",
                  arrowColor: "#D3BD83",
                  monthTextColor: "#D3BD83",
                  indicatorColor: "#D3BD83",
                  textDayFontWeight: "300",
                  textMonthFontWeight: "bold",
                  textDayHeaderFontWeight: "300",
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 16
                }}
              />
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
    );
    return (
      <MenuProvider style={container}>
        <View style={subcontainer}>
          <CalendarCont />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Input
              placeholder="Coin"
              containerStyle={inputContainerCoin}
              inputContainerStyle={inputContainerStyle}
              inputStyle={{ color: "#787878", fontSize: 13 }}
              placeholderTextColor="#787878"
              onChangeText={coin => this.setState({ coin })}
            />
            <Text style={{ color: "#787878" }}>/USD</Text>
          </View>
          <View>
            <Input
              placeholder="Amount"
              keyboardType="numeric"
              containerStyle={inputContainer}
              inputContainerStyle={inputContainerStyle}
              inputStyle={{ color: "#787878", fontSize: 13 }}
              placeholderTextColor="#787878"
              onChangeText={amount => this.setState({ amount })}
            />
            <Input
              placeholder="Price"
              keyboardType="numeric"
              containerStyle={inputContainer}
              inputContainerStyle={inputContainerStyle}
              inputStyle={{ color: "#787878", fontSize: 13 }}
              placeholderTextColor="#787878"
              onChangeText={price => this.setState({ price })}
            />
          </View>
          <Button
            title="Add transaction"
            onPress={() =>
              db.transaction(tx => {
                tx.executeSql(
                  "insert into transactions (coin, amount, price, date) values (?, ?, ?, ?)",
                  [
                    this.state.coin,
                    this.state.amount,
                    this.state.price,
                    this.state.selected
                  ]
                );
                tx.executeSql("select * from transactions", [], (_, { rows }) =>
                  console.log(JSON.stringify(rows))
                );
              }, null)
            }
            buttonStyle={buttonStyle}
          />
        </View>
      </MenuProvider>
    );
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }
}

const screenWidth = Math.round(Dimensions.get("window").width);
const contWidth = (screenWidth * 0.5) * 0.9

const triggerStyles = {
  triggerText: {
    color: "#787878"
  },
  triggerOuterWrapper: {
    backgroundColor: "#1E2223",
    borderRadius: 5
  },
  triggerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: 12
  },
  triggerTouchable: {
    underlayColor: "darkblue"
  }
};

const optionsStyles = {
  optionsContainer: {
    backgroundColor: "#1E2223",
    padding: 5,
    width: 350
  },
  optionTouchable: {
    activeOpacity: 70
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  subcontainer: {
    width: screenWidth * 0.5,
    borderRadius: 5,
  },
  buttonStyle: {
    width: contWidth,
    backgroundColor: "#D3BD83",
    marginTop: screenWidth * 0.15,
  },
  calendar: {
    paddingTop: 5,
    backgroundColor: "#1E2223",
    height: 350
  },
  calendarContStyle: {
    margin: 5,
    width: contWidth
  },
  inputContainerCoin: {
    backgroundColor: "#1E2223",
    borderRadius: 5,
    margin: 5,
    width: screenWidth * 0.25,
  },
  inputContainer: {
    backgroundColor: "#1E2223",
    borderRadius: 5,
    margin: 5,
    width: contWidth
  },
  inputContainerStyle: {
    borderBottomWidth: 0
  }
});

const {
  container,
  subcontainer,
  buttonStyle,
  calendar,
  inputContainer,
  inputContainerCoin,
  calendarContStyle,
  inputContainerStyle
} = styles;

export default AddTransaction;
