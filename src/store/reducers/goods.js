import { GET_GOODSLIST } from '../types';

const initState = {
  goodsList: []
};

export default function resume(state = initState, action) {
  switch (action.type) {
    case GET_GOODSLIST:
      return {
        ...state,
        goodsList: action.payload
      };
    default:
      return state;
  }
}
