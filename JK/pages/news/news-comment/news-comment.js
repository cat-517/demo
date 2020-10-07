// pages/news/news-comment/news-comment.js
import {DBNews} from '../../../db/DBNews.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image1:'/images/comment/sc.png',
    useKeyboardFlag:true,
    keyboardInputValue: '',
    //控制是否显示图片选择面板
    sendMoreMsgFlag: false,
    //控制是否显示表情选择面板
    sendMoreEmojiFlag: false,
    //保存已选择的图片
    chooseFiles: [],
    //被删除的图片序号
    deleteIndex: -1,
    //保存当前正在播放的语音的url
    currentAudio:'',
    emojiChar: "🙂-😄-😕-😃-🙄-😳-😫-😔-😓-😭-😍-😟-😅-😠-😗-😒-😳-🤐-😴-😜-😁-😮-🤮-🤭-😱-🤫-😵-😏-😪-😔-🙁-😖-🤧-😡-😛-🤯-🤒-🤔-👍-👈-👉",
    emChar: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var newsId=options.id;
    this.dbNews=new DBNews(newsId);
    var comments=this.dbNews.getCommentData();
    this.setData({
      comments:comments
    })
    var emChar = this.data.emojiChar.split("-");
    this.setData({
      emChar: emChar
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
   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 点击预览大图
   */
  previewImg: function (event) {
    var commentIdx = event.currentTarget.dataset.commentIdx,
      imgIdx = event.currentTarget.dataset.imgIdx,
      imgs = this.data.comments[commentIdx].content.img;
    wx.previewImage({
      current: imgs[imgIdx],
      urls: imgs
    })
  },
  /**
   * 语音和文字切换
   */
  switchInputType: function (event) {
    this.setData({
      useKeyboardFlag: !this.data.useKeyboardFlag
    })
  },
  /**
   * 获取用户输入
   */
  bindCommentInput: function (event) {
    var val = event.detail.value;
    this.data.keyboardInputValue = val;
    this.setData({
      val: this.data.keyboardInputValue
    })
    this.setData({
      textemoji: this.data.val
    })
    if (this.data.keyboardInputValue == this.data.textemoji) {
      this.setData({
        textemoji: this.data.val
      })
    }
    else {
      this.emojiChoose();
    }
  },

  /**
   * 实现添加评论
   */
  submitComment: function (event) {
    var imgs = this.data.chooseFiles;  //取页面绑定的图片数组
    var newData = {
      username: "青石",
      avatar: "/images/avatar/avatar-4.png",
      create_time: new Date().getTime() / 1000,
      content: {
        txt: this.data.textemoji,
        img: imgs
      }
    };
    //保存新评论到缓存数据库中
    this.dbNews.newComment(newData);
    //显示操作的结果
    this.showCommentSuccessToast();
    //重新渲染并绑定所有评论
    this.bindCommentData();
    //清空输入框内容
    this.resetAllDefaultStatus();
  },
  showCommentSuccessToast: function () {
    wx.showToast({
      title: '评论成功！',
      duration: 1000,
      icon: "success"
    })
  },
  bindCommentData: function () {
    var comments = this.dbNews.getCommentData();
    this.setData({
      comments: comments
    })
  },
  resetAllDefaultStatus: function () {
    this.setData({
      keyboardInputValue: '',  //输入框清空
      val: '',  //保证发送后返回原始
      chooseFiles: [],  //评论数据清空
      sendMoreMsgFlag: false,  //评论后关闭图片页面
      sendMoreEmojiFlag: false  //评论后关闭表情页面
    })
  },
  /**
   * 显示选择照片、拍照按钮
   */
  sendMoreMsg: function () {
    this.setData({
      sendMoreMsgFlag: !this.data.sendMoreMsgFlag
    })
  },
  /**
   * 选择本地照片与拍照
   */
  chooseImage: function (event) {
    var imgArr = this.data.chooseFiles;
    var leftCount = 3 - imgArr.length;
    if (leftCount <= 0) {
      wx.showToast({
        title: '最多上传三张照片！',
        duration: 1000,
        icon: "none"
      })
      return;
    }
    var sourceType = [event.currentTarget.dataset.category], /*获取用户选择方式 */
      that = this;
    wx.chooseImage({
      count: leftCount,
      sourceType: sourceType,
      success: function (res) {
        that.setData({
          chooseFiles: imgArr.concat(res.tempFilePaths)  //concat表示连接函数，将新选择的图片添加到数组中
        })
      }
    })
  },
  /**
   * 点击添加表情
   */
  sendMoreEmoji: function () {
    this.setData({
      sendMoreEmojiFlag: !this.data.sendMoreEmojiFlag
    })
  },
  /**
   * 评论表情
   */
  emojiChoose: function (e) {
    var index = e.currentTarget.dataset.id;
    if(this.data.val){
      this.setData({
        textemoji: this.data.val + this.data.emChar[index]
      })
    }
    else{
      this.setData({
        textemoji: this.data.emChar[index]
      })
    }
    this.setData({
      val: this.data.emChar[index]  /*点击表情出现发送按钮*/
    })
    this.setData({
      keyboardInputValue: this.data.textemoji
    })
    console.log(this.data.textemoji);
  },
  /**
   * 删除选中的图片
   */
  deleteImage: function (event) {
    var index = event.currentTarget.dataset.idx,
      that = this;
    that.setData({
      deleteIndex: index
    })
    that.data.chooseFiles.splice(index, 1);
    setTimeout(function () {  //定时器，需要两个参数
      that.setData({
        deleteIndex: -1,
        chooseFiles: that.data.chooseFiles
      })
    }, 500)
  },
  /**
   * 开始录制语音
   */
  recordStart: function () {
    var that = this;
    this.setData({
      recodingClass: 'recoding'
    });
    this.startTime = new Date(); /*获取系统时间*/
    wx.startRecord({
      success: function (res) {
        var diff = (that.endTime - that.startTime) / 1000;
        diff = Math.ceil(diff);
        that.submitVoiceComment({ url: res.tempFilePath, timeLen: diff });  /*获取临时文件路径*/
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  },
  /**
   * 提交语音评论
   */
  submitVoiceComment: function (audio) {
    var newData = {
      username: "青石",
      avatar: "/images/avatar/avatar-4.png",
      create_time: new Date().getTime() / 1000,
      content: {
        txt: '',
        img: [],
        audio: audio
      }
    };
    this.dbNews.newComment(newData);
    this.showCommentSuccessToast();
    this.bindCommentData();
  },
  /**
   * 结束录音
   */
  recordEnd: function () {
    this.setData({  /*还原输入时语音背景框*/
      recodingClass: ''
    });
    this.endTime = new Date();
    wx.stopRecord();
  },
  /**
   * 播放、暂停语音
   */
  playAudio: function (event) {
    var url = event.currentTarget.dataset.url,
      that = this;
    if (url == this.data.currentAudio) {  /*相等表示播放状态*/
      wx.pauseVoice();
      this.data.currentAudio = '';  /*永远记录正处于播放状态的语音*/
    }
    else {
      this.data.currentAudio = url;
      wx.playVoice({
        filePath: 'url',
        complete: function () { /*结束执行的方法 */
          that.data.currentAudio = '';  /*取消正在播放的状态*/
        }
      });
    }
  },
  /**
   * 删除评论
   */
  delComment: function (event) {
    var idx = event.currentTarget.dataset.idx;
    var comments = this.dbNews.delCommentData(idx);
    this.setData({
      comments: comments
    })
    //显示操作的结果
    this.showCommentDelToast();
    //重新渲染并绑定所有评论
    this.bindCommentData();
  },
  /**
   * 删除评论提示
   */
  showCommentDelToast: function () {
    wx.showToast({
      title: '删除成功！',
      duration: 1000,
      icon: "success"
    })
  }
})