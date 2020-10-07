class DBLogin {
  /**
   * 当前类的构造器
   */
  constructor() {
    this.storageKeyName = "loginList";
  }
  /**
   * 得到全部用户信息
   */
  getAllPostData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require('../data/data.js').loginList;
      this.execSetStorageSync(res);
    }
    return res;
  }
  /**
   * 初始化缓存数据
   */
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data);
  }
  /**
   * 将注册的信息添加到缓存中
   */
  loginData(login) {
    var logins = this.getAllPostData();
    logins.push(login);
    wx.setStorageSync(this.storageKeyName, logins);
    this.loginNewData();
  }
  /**
   * 重新获取缓存中数据并返回
   */
  loginNewData() {
    var res = wx.getStorageSync(this.storageKeyName);
    var len = res.length;
    console.log(res);
    return res[len-1];
  }
};
export { DBLogin }