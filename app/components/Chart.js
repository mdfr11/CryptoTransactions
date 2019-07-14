import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Constants, Svg } from "expo";
import { LineChart, XAxis, Grid } from "react-native-svg-charts";

class Chart extends Component {
  render() {
    const { percentq, buyingPrice } = this.props;

    if (isNaN(percentq)) {
      return <View><Text>Loading {percentq}</Text></View>
    }

    const round = (v) => {
      return (v < 0 ? Math.floor(Math.abs(v) * 100) * -1 / 100 : v.toFixed(2));
    }

    const width = Math.floor(Dimensions.get("window").width) * 0.8;
    const center = width / 2;
    const percent = round(percentq);
    const ticks = center / 100;
    const data = center + percent * ticks;
    const height = 30;
    console.log("jjjjjjjjj " + percentq);
    if (percentq === 0) {
      return <View style={style} />
    }
    return (
      <View style={containerChart}>
        <Svg style={{ height, width }}>
          <Svg.Line x1={width} y1="0" stroke="#b4b4b4" strokeWidth="10" />
          <Svg.Rect x="0" y="0" width="2" height="15" fill="#D86273" />
          <Svg.G>
            <Svg.Rect x={center} y="0" width="2" height="15" fill="#6F6D6E" />
            <Svg.Text fill="#6F6D6E" fontSize="12" x={center + 5} y="20">
              {buyingPrice}
            </Svg.Text>
          </Svg.G>
          <Svg.Rect x={width - 2} y="0" width="2" height="15" fill="#2DB091" />
          <Svg.G>
            <Svg.Line
              x1={center}
              x2={data}
              y1="0"
              stroke={data > center ? "#2DB091" : "#D86273"}
              strokeWidth="10"
            />
            <Svg.Rect
              x={data}
              y="0"
              width="2"
              height="15"
              fill={data > center ? "#2DB091" : "#D86273"}
            />
            <Svg.Text fill={data > center ? "#2DB091" : "#D86273"} fontSize="12" x={data + 5} y="30">
              {round(percentq)}
            </Svg.Text>
          </Svg.G>
        </Svg>
      </View>
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
    color: "#787878"
  },
  containerChart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight
  }
});

const { containerChart } = styles;

export default Chart;
