import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import AntDesign from "react-native-vector-icons/AntDesign";
import TransactionsScreen from "../screens/TransactionsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import TransactionsCont from "../containers/TransactionsCont";
import AddTransaction from "../components/AddTransaction";
import EditTransaction from "../components/EditTransaction";

const TransactionsIcon = ({ tintColor }) => (
  <AntDesign name="linechart" size={25} color={tintColor} />
);

const SettingsIcon = ({ tintColor }) => (
  <AntDesign name="setting" size={25} color={tintColor} />
);

const Transactions = createStackNavigator(
  {
    Transactions: {
      screen: TransactionsCont,
      navigationOptions: () => ({
        headerStyle: {
          backgroundColor: "#1E2223"
        },
        headerTitleStyle: {
          color: "#D3BD83"
        },
        title: "Your transactions"
      }),
    },
    AddTransaction: {
        screen: AddTransaction,
        navigationOptions: () => ({
          header: null
        }),
      },
      EditTransaction: {
        screen: EditTransaction,
        navigationOptions: () => ({
          header: null
        }),
      },
  },
  {
    headerMode: "screen",
    cardStyle: { backgroundColor: "#121212" }
  }
);

const Settings = createStackNavigator(
  {
    SettingsCont: {
      screen: SettingsScreen
    }
  },
  {
    headerMode: "screen",
    cardStyle: { backgroundColor: "#121212" }
  }
);

const RootStack = createBottomTabNavigator(
  {
    Transactions: {
      screen: Transactions,
      navigationOptions: {
        tabBarIcon: TransactionsIcon,
        headerStyle: {
          backgroundColor: "#1E2223"
        },
        headerTitleStyle: {
          color: "white"
        }
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: SettingsIcon
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#D3BD83",
      inactiveTintColor: "#5d4d21",
      showLabel: false,
      style: {
        backgroundColor: "#1E2223"
      }
    }
  }
);

const MainNavigator = createAppContainer(RootStack);

export default MainNavigator;
