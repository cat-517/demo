// pages/fun/fun.js
import { DBFun } from '../../../db/DBFun.js'
const top_distance = 184;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arms: "军事",
    disease: "健康",
    fun: "娱乐",
    sport: "体育",
    image1: "/images/lb/fun_lb_1.png",
    image2: "/images/lb/fun_lb_2.png",
    image3: "/images/lb/fun_lb_3.png",
    image4: "/images/lb/fun_lb_4.png",
    showBackTop: false
  },
  /**
   * 页面跳转
   */
  onArmsTap: function () {
    wx.navigateTo({
      url: '../arms/arms',
    })
  },
  onDiseaseTap: function () {
    wx.navigateTo({
      url: '../disease/disease',
    })
  },
  onFunTap: function () {
    wx.navigateTo({
      url: '../fun/fun',
    })
  },
  onSportTap: function () {
    wx.navigateTo({
      url: '../sport/sport',
    })
  },
  /**
   * 跳转到详情页
   */
  onTapToDetail1: function (options) {
    var newsId = options.currentTarget.dataset.newsId;
    wx.navigateTo({
      url: '../../news-detail4/news-detail4?id=' + newsId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dbNews = new DBFun();
    this.setData({
      newsList: dbNews.getAllNewsData()
    })
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
    wx.showToast({
      title: "已加载全部信息",
      duration: 1000,
      icon: "success",
      mask: true
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 监听页面滚动,出现置顶图标
   */
  onPageScroll(options) {
    const scrollTop = options.scrollTop;
    const flag = scrollTop >= top_distance;
    if (flag != this.data.showBackTop) {
      this.setData({
        showBackTop: flag
      })
    }
  },
  /**
   * 轮播跳转详情
   */
  onSwiperTap: function (event) {
    var newsId = event.target.dataset.newsId;
    wx.navigateTo({
      url: '../../news-detail4/news-detail4?id=' + newsId,
    })
  }
})