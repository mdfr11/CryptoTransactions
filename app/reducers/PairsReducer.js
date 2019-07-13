import { GET_COINS, GET_COINS_SUCCESS, GET_COINS_FAIL } from "../actions/types";

const INITIAL_STATE = {
  isFetching: false,
  data: [],
  hasError: false,
  errorMessage: null
};

const PairsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_COINS:
      return {
        ...state,
        isFetching: true,
        data: [],
        hasError: false,
        errorMessage: null
      };
    case GET_COINS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload,
        hasError: false,
        errorMessage: null
      };
    case GET_COINS_FAIL:
      return {
        ...state,
        isFetching: false,
        data: [],
        hasError: true,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default PairsReducer;
