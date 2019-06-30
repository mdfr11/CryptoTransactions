import axios from 'axios';
import {
  FETCH_COIN_DATA,
  FETCH_COIN_DATA_SUCCESS,
  FETCH_COIN_DATA_FAIL,
} from './types';

export const FetchCoinData = () => async (dispatch) => {
  dispatch({ type: FETCH_COIN_DATA });
  try {
    const result = await axios.get(`https://api.coincap.io/v2/assets/?limit=20`);
    dispatch({ type: FETCH_COIN_DATA_SUCCESS, payload: result.data.data });
  } catch (error) {
    dispatch({ type: FETCH_COIN_DATA_FAIL, payload: error });
  }
};