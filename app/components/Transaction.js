import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Transaction extends Component { 
    render() {
        return(
            <View style={container}>
                <Text>Start</Text>
                <Text>BTC/USD</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        fontWeight: "bold",
        padding: 10
    },
    container: {
        padding: 30,
        borderColor: '#99AAB5',
        borderWidth: 1,
        backgroundColor: '#1E2223',
    },
})

const {
    header, container
} = styles;

export default Transaction