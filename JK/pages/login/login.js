// pages/login/login.js
import { DBLogin } from '../../db/DBLogin.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userlogin: '/images/welcome/user-login.jpg',
    passlogin: '/images/welcome/pass-login.jpg',
    xs: '/images/welcome/xs.png',
    qc: '/images/welcome/qc.png',
    title1: '注册',
    title2: '返回登录页面',
    isShow: true,
    isShow1:true,
    keyName: '',
    keyWord: ''
  },
  /*获取username属性值*/
  getUname: function (event) {
    this.data.username = event.detail.value
  },
  /*获取password属性值*/
  getUword: function (event) {
    this.data.password = event.detail.value
  },
  /*获取password1属性值*/
  getUword1:function(event){
    this.data.password1 = event.detail.value
  },
  /**
   * 注册
   */
  onLogin: function () {
    if(this.data.username!=null&&this.data.password!=null&&this.data.password1!=null){
      if(this.data.password==this.data.password1){
        var login = {
          username: this.data.username,
          password: this.data.password,
          password1: this.data.password1
        };
        this.dbLogin.loginData(login);
        wx.showToast({
          title: '恭喜您，注册成功！',
          icon: 'none',
          duration: 1000
        })
        this.setData({
          keyName: '',
          keyWord: ''
        })
      }
      else{
        wx.showToast({
          title: '两次密码不一致！',
          icon: 'none',
          duration: 1000
        })
      }
    }
    else{
      wx.showToast({
        title: '用户名或密码不能为空！',
        icon: 'none',
        duration: 1000
      })
    }
  },
  /**
   * 返回登录页面
   */
  onMain: function () {
    wx.navigateTo({
      url: '../welcome/welcome',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.dbLogin = new DBLogin();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
  * 密码显示切换
  */
  onShowTap: function () {
    this.setData({
      isShow: !this.data.isShow
    })
  },
  onShowTap1:function(){
    this.setData({
      isShow1: !this.data.isShow1
    })
  },
  /**
   * 清除输入数据
   */
  onClearTap: function () {
    this.setData({
      keyName: ''
    })
  }
})