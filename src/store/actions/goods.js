import { GET_GOODSLIST, SET_GETTING } from '../types';

import api from '../../constants/utils/api';
import requestUrl from '../../constants/config/requestUrl';

export const getGoodsList = (params = {}) => (dispatch, getState) => {
  let goods = getState().goods;
  if (goods.isGetting) {
    return;
  }
  dispatch({
    type: SET_GETTING,
    payload: true
  });
  let page = parseInt(params.page) || goods.currentPage + 1 || 1;
  api
    .get(requestUrl.getGoodsList)
    .then(res => {
      let oldListData = Object.assign([], goods.goodsList);
      dispatch({
        type: GET_GOODSLIST,
        payload: {
          currentPage: page,
          goodsList:
            page > 1
              ? oldListData.concat(res.data.goods_list[page - 1].page)
              : res.data.goods_list[0].page,
          isAll: res.data.goods_list[page - 1].page.length < 6
        }
      });
      dispatch({
        type: SET_GETTING,
        payload: false
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_GETTING,
        payload: false
      });
    });
};
