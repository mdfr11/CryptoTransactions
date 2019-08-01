import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Picker } from "react-native";
import { connect } from "react-redux";
import { GetPairs } from "../actions/";
import { Button, Input } from "react-native-elements";
import { SQLite } from "expo";
import { Calendar } from "react-native-calendars";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

const db = SQLite.openDatabase("db.db");

class EditTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null, pair: null, amount: null, price: null };
    this.onDayPress = this.onDayPress.bind(this);
  }
  componentDidMount() {
    this.selectTransaction();
    this.props.GetPairs();
  }
  render() {
    const { pairs, navigation } = this.props;
    const pairsArray = Object.values(Object.assign({}, pairs)).map(
      ({ symbol1, symbol2 }) => symbol1 + "/" + symbol2
    );
    const Message = () =>
      this.state.done === true ? (
        <View>
          <Text style={{ color: "green" }}>Successful</Text>
        </View>
      ) : this.state.done === false ? (
        <View>
          <Text style={{ color: "red" }}>Error</Text>
        </View>
      ) : (
        <View>
          <Text />
        </View>
      );
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
          <View>
            <Input
              placeholder="Amount"
              keyboardType="numeric"
              containerStyle={inputContainer}
              inputContainerStyle={inputContainerStyle}
              inputStyle={{ color: "#787878", fontSize: 13 }}
              placeholderTextColor="#787878"
              value={`${this.state.amount}`}
              onChangeText={amount => this.setState({ amount })}
            />
            <Input
              placeholder="Price"
              keyboardType="numeric"
              containerStyle={inputContainer}
              inputContainerStyle={inputContainerStyle}
              inputStyle={{ color: "#787878", fontSize: 13 }}
              placeholderTextColor="#787878"
              value={`${this.state.price}`}
              onChangeText={price => this.setState({ price })}
            />
          </View>
          <Picker
            selectedValue={this.state.pair}
            style={dropdown}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ pair: itemValue })
            }
          >
            {pairsArray.map((item, i) => (
              <Picker.Item key={i} label={item} value={item} />
            ))}
          </Picker>
          <Message />
          <Button
            title="Edit transaction"
            onPress={() => this.EditTransaction()}
            buttonStyle={buttonStyle}
          />
        </View>
      </MenuProvider>
    );
  }

  EditTransaction() {
    if (
      this.state.amount === null ||
      this.state.amount === "" ||
      this.state.price === null ||
      this.state.price === ""
    ) {
      this.setState({ done: false });
    } else {
      db.transaction(tx => {
        tx.executeSql(
          "update transactions set pair = ?, amount = ?, price = ?, date = ? where id = ?;",
          [
            this.state.pair,
            this.state.amount,
            this.state.price,
            this.state.selected,
            this.props.navigation.state.params.id
          ]
        );
      }, null),
        this.setState({ done: true });
    }
  }

  selectTransaction = () => {
    db.transaction(tx => {
      tx.executeSql(
        "select * from transactions where id = ?",
        [this.props.navigation.state.params.id],
        (_, { rows }) => {
          Object.values(rows._array).map(item =>
            this.setState({
              pair: item.pair,
              amount: item.amount,
              price: item.price,
              selected: item.date
            })
          );
        },
        null,
        this.selectTransaction
      );
    });
  };

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }
}

const screenWidth = Math.round(Dimensions.get("window").width);
const contWidth = screenWidth * 0.5 * 0.9;

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
    alignItems: "center"
  },
  subcontainer: {
    width: screenWidth * 0.5,
    borderRadius: 5
  },
  buttonStyle: {
    width: contWidth,
    backgroundColor: "#D3BD83",
    marginTop: screenWidth * 0.15,
    margin: 5
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
  inputContainer: {
    backgroundColor: "#1E2223",
    borderRadius: 5,
    margin: 5,
    width: contWidth
  },
  inputContainerStyle: {
    borderBottomWidth: 0
  },
  dropdown: {
    height: 50,
    backgroundColor: "#1E2223",
    margin: 5,
    color: "#787878",
    borderRadius: 5,
    width: contWidth,
    fontSize: 13
  }
});

const {
  container,
  subcontainer,
  buttonStyle,
  calendar,
  inputContainer,
  calendarContStyle,
  inputContainerStyle,
  dropdown
} = styles;

const mapStateToProps = state => ({
  pairs: state.pairs.data.pairs
});

export default connect(
  mapStateToProps,
  { GetPairs }
)(EditTransaction);
