import React, {Component} from 'react';
import { connect } from 'react-redux';
import { FetchCoinData } from '../actions/';
import { StyleSheet, Text, View, FlatList } from 'react-native';

class TransactionsCont extends Component { 
    componentDidMount() {
        this.props.FetchCoinData();
      }
    render() {
        const { crypto } = this.props;
        console.log('aaaaaaa ' + JSON.stringify(crypto))
        return(
            <View>
                <Text>Start</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    crypto: state.crypto,
});
  
export default connect(mapStateToProps, { FetchCoinData })(TransactionsCont);