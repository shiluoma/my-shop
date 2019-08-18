const domain = process.env.API_PATH;

export default {
  getGoodsList: domain + '/GetGoodsList', // 获取用户信息
  getGoodsDetail: domain + '/GetGoodsDetail' // 获取用户信息
};
