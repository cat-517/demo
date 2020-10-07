// pages/news-detail1/news-detail1.js
import {DBNews} from '../../db/DBNews.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images1:'/images/news/dz.png',
    images2:'/images/news/pl.png',
    images3:'/images/news/sc.png',
    images4:'/images/news/wdz.png',
    images5:'/images/news/wsc.png',
    images6:'/images/news/xs.png',
    comment: '--------------评论区--------------',
    isPlayingMusic:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var newsId=options.id;
    this.dbNews=new DBNews(newsId);
    this.addReadingTimes();
    this.newsData=this.dbNews.getNewsItemById().data;
    this.setData({
      news:this.newsData
    })
    var comments = this.dbNews.getCommentData();
    this.setData({
      comments: comments
    })
    this.setMusicMonitor();
    this.setAniation();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 定义动画
   */
  setAniation: function () {
    var animationUp = wx.createAnimation({
      timingFunction: 'ease-in-out' /*动画效果 */
    })
    this.animationUp = animationUp
    var animationUp2 = wx.createAnimation({
      timingFunction: 'ease-in-out'
    })
    this.animationUp2 = animationUp2
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
    wx.getBackgroundAudioManager().stop();
    this.setData({
      isPlayingMusic: false
    })
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
   * 点击实现收藏
   */
  onCollectionTap:function(){
    var newData=this.dbNews.collect();
    this.setData({
      'news.collectionStatus':newData.collectionStatus,
      'news.collectionNum':newData.collectionNum
    })
    wx.showToast({
      title: newData.collectionStatus?"收藏成功":"取消收藏成功",
      duration:1000,
      icon:"success",
      mask:true
    })
    this.animationUp2.scale(2).step(); /*放大两倍 */
    this.setData({
      animationUp2: this.animationUp2.export()
    })
    setTimeout(function () { //定时器，需要两个参数
      this.animationUp2.scale(1).step();
      this.setData({
        animationUp2: this.animationUp2.export()
      })
    }.bind(this), 1000);
  },
  /**
   * 点击实现点赞
   */
  onLikeTap:function(){
    var newData = this.dbNews.like();
    this.setData({
      'news.likeStatus': newData.likeStatus,
      'news.likeNum': newData.likeNum
    })
    wx.showToast({
      title: newData.likeStatus ? "点赞成功" : "取消点赞成功",
      duration: 1000,
      icon: "success",
      mask: true
    })
    this.animationUp.scale(2).step();
    this.setData({
      animationUp: this.animationUp.export()
    })
    setTimeout(function () { /*setTimeout设置一个指定等候时间 */
      this.animationUp.scale(1).step();
      this.setData({
        animationUp: this.animationUp.export()
      })
    }.bind(this), 1000);
  },
  /**
   * 点击跳转到评论页面news-comment
   */
  onCommentTap:function(event){
    var id=event.currentTarget.dataset.newsId;
    wx.navigateTo({
      url: '../news/news-comment/news-comment?id='+id,
    })
  },
  /**
   * 阅读数量自增
   */
  addReadingTimes() {
    this.dbNews.addReadingTimes();
  },
  /**
   * 播放背景音乐
   */
  onMusicTap:function(){
    if (this.data.isPlayingMusic){ /*取值为真，代表正在播放*/
      wx.getBackgroundAudioManager().pause();
      this.setData({
        isPlayingMusic: false
      })
    }
    else{
      var audioManager = wx.getBackgroundAudioManager(); /*拿到背景音乐管理器*/
      audioManager.src = this.newsData.music.url; /*设置重要属性*/
      audioManager.title = this.newsData.music.title;
      audioManager.coverImgUrl = this.newsData.music.coverImg;
      audioManager.play();
      this.setData({
        isPlayingMusic: true
      })
    }
  },
  /**
   * 播放结束返回
   */
  setMusicMonitor: function () {
    var that = this;
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
    });
  }
})