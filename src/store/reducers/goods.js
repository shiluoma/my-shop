import { GET_GOODSLIST, SET_GETTING } from '../types';

const initState = {
  currentPage: 0,
  goodsList: [],
  isAll: false,
  isGetting: false
};

export default function resume(state = initState, action) {
  switch (action.type) {
    case GET_GOODSLIST:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        goodsList: action.payload.goodsList,
        isAll: action.payload.isAll
      };
    case SET_GETTING:
      return {
        ...state,
        isGetting: action.payload
      };
    default:
      return state;
  }
}
