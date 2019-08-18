const domain = process.env.STATIC_PATH;

export default {
  getGoodsList: domain + '/virtualData/GetGoodsList', // 获取用户信息
  getGoodsDetail: domain + '/virtualData/GetGoodsDetail' // 获取用户信息
};
