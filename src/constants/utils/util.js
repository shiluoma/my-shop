/**
 * 节流
 * @param {*} func 执行函数
 * @param {*} wait 间隔时间
 */
export const throttle = (func, wait = 100) => {
  let timeout;
  return () => {
    if (!timeout) {
      func.apply(this, arguments);
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
    }
  };
};
