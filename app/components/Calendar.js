import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View
} from 'react-native';
import {Calendar} from 'react-native-calendars';

export default class CalendarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Calendar
                current={
                  this.state.selected === null
                    ? Date.now()
                    : this.state.selected
                }
                minDate={Date.now() - 31556926000}
                maxDate={Date.now()}
                onDayPress={this.onDayPress}
                firstDay={1}
                markedDates={{
                  [this.state.selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedDotColor: "orange"
                  }
                }}
                theme={{
                    calendarBackground: '#1E2223',
                    textSectionTitleColor: '#787878',
                    selectedDayBackgroundColor: '#D3BD83',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#D3BD83',
                    dayTextColor: '#787878',
                    textDisabledColor: '#333333',
                    dotColor: '#D3BD83',
                    selectedDotColor: '#ffffff',
                    arrowColor: '#D3BD83',
                    monthTextColor: '#D3BD83',
                    indicatorColor: '#D3BD83',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16
                  }}
              />
      </View>
    );
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }
}

const styles = StyleSheet.create({
  calendar: {
    paddingTop: 5,
    backgroundColor: "#1E2223",
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  }
});