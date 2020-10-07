var dataObj=require("data/data.js")
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var newsData=wx.getStorageSync("newsList");
    if(!newsData){
      wx.setStorageSync("newsList", dataObj.newsList)
    }
    var funData = wx.getStorageSync("funList");
    if (!funData) {
      wx.setStorageSync("funList", dataObj.funList)
    }
    var armsData = wx.getStorageSync("armsList");
    if (!armsData) {
      wx.setStorageSync("armsList", dataObj.armsList)
    }
    var diseaseData = wx.getStorageSync("diseaseList");
    if (!diseaseData) {
      wx.setStorageSync("diseaseList", dataObj.diseaseList)
    }
    var sportData = wx.getStorageSync("sportList");
    if (!sportData) {
      wx.setStorageSync("sportList", dataObj.sportList)
    }
    var loginData = wx.getStorageSync("loginList");
    if (!loginData) {
      wx.setStorageSync("loginList", dataObj.loginList)
    }
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})
