import { combineReducers } from 'redux';
import CryptoReducer from './CryptoReducer';
import PairsReducer from './PairsReducer';

const rootReducer = combineReducers({
  crypto: CryptoReducer,
  pairs: PairsReducer
});

export default rootReducer;
