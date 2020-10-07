// pages/welcome/welcome.js
import { DBLogin } from '../../db/DBLogin.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:"",
    logo:'/images/welcome/logo.png',
    userlogin:'/images/welcome/user-login.jpg',
    passlogin:'/images/welcome/pass-login.jpg',
    xs:'/images/welcome/xs.png',
    qc:'/images/welcome/qc.png',
    title1:"登录",
    title2:"没有账户？",
    title3:"点击获取",
    title4:"或",
    title5:"点击注册",
    isShow:true,
    keyValue:''
  },
  /**
   * 获取username属性值
   */
  getUname:function(event){
    this.data.username = event.detail.value
  },
  /**
   * 获取password属性值
   */
  getUword:function(event){
    this.data.password = event.detail.value
  },
  /**
   * 定义函数，用来判断登录信息
   */
  onInTap:function(event){
    if(this.data.username=="admin"&&this.data.password=="1234"){
      wx.showToast({
        title: '恭喜您，登录成功！',
        icon:'none',
        duration:1000
      })
      wx.switchTab({
        url: '../news/news',
      })
    }
    else if (this.data.username == this.logins.username && this.data.password == this.logins.password){
      wx.showToast({
        title: '恭喜您，登录成功！',
        icon: 'none',
        duration: 1000
      })
      wx.switchTab({
        url: '../news/news',
      })
    }
    else if (this.data.username == '' || this.data.password == '') {
      wx.showToast({
        title: '用户名或密码不能为空！',
        icon: 'none',
        duration: 1000
      })
    }
    else{
      wx.showToast({
        title: '用户名或密码不正确！',
        icon:'none',
        duration:1000
      })
    }
  },
  /**
   * 定义函数，用来获取默认密码
   */
  onUpTap:function(){
    wx.showToast({
      title: '默认账户为admin，密码为1234',
      icon:'none',
      duration:2000
    })
  },
  /**
   * 密码显示切换
   */
  onShowTap:function(){
    this.setData({
      isShow:!this.data.isShow
    })
  },
  /**
   * 清除输入数据
   */
  onClearTap:function(){
    this.setData({
      keyValue:''
    })
  },
  /**
   * 注册事件
   */
  loginTap: function () {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.dbLogin = new DBLogin();
    this.logins = this.dbLogin.loginNewData();
    console.log(this.logins);
  },
})