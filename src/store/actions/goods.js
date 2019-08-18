import { GET_GOODSLIST } from '../types';

import api from '../../constants/utils/api';
import requestUrl from '../../constants/config/requestUrl';

export const getGoodsList = auth => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    api
      .get(requestUrl.getGoodsList)
      .then(res => {
        console.log(111111111, res);
        dispatch({});
      })
      .catch(err => {
        reject(err);
      });
  });
};
