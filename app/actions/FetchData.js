import axios from 'axios';
import {
  FETCH_COIN_DATA,
  FETCH_COIN_DATA_SUCCESS,
  FETCH_COIN_DATA_FAIL,
  GET_COINS,
  GET_COINS_SUCCESS,
  GET_COINS_FAIL
} from './types';

export const FetchCoinData = (pair) => async (dispatch) => {
  dispatch({ type: FETCH_COIN_DATA });
  try {
    const result = await axios.get('https://cex.io/api/last_price/' + pair);
    dispatch({ type: FETCH_COIN_DATA_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: FETCH_COIN_DATA_FAIL, payload: error });
  }
};

export const GetPairs = () => async (dispatch) => {
  dispatch({ type: GET_COINS });
  try {
    const result = await axios.get('https://cex.io/api/currency_limits');
    dispatch({ type: GET_COINS_SUCCESS, payload: result.data.data });
  } catch (error) {
    dispatch({ type: GET_COINS_FAIL, payload: error });
  }
};