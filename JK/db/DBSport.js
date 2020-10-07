class DBSport {
  /*当前类的构造器*/
  constructor(newsId) {
    this.storageKeyName = 'sportList';
    this.newsId = newsId;
  }
  /*得到全部文章信息*/
  getAllNewsData() {
    var res = wx.getStorageSync(this.storageKeyName);
    if (!res) {
      res = require("../data/data.js").sportList;
      this.execSetStorageSync(res);
    }
    return res;
  }
  /*初始化缓存数据*/
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data)
  }
  /*获取指定id号的文章数据*/
  getNewsItemById() {
    var newsData = this.getAllNewsData();
    var len = newsData.length;
    for (var i = 0; i < len; i++) {
      if (this.newsId == newsData[i].newsId) {
        return {
          index: i,
          data: newsData[i]
        }
      }
    }
  }
  /*收藏、点赞、评论*/
  updataNewsData(category, newComment) {
    var itemData = this.getNewsItemById(),
      newsData = itemData.data,
      allNewsData = this.getAllNewsData();
    switch (category) {
      case 'collect':
        if (!newsData.collectionStatus) {
          newsData.collectionNum++;
          newsData.collectionStatus = true;
        }
        else {
          newsData.collectionNum--;
          newsData.collectionStatus = false;
        }
        break;
      case 'like':
        if (!newsData.likeStatus) {
          newsData.likeNum++;
          newsData.likeStatus = true;
        }
        else {
          newsData.likeNum--;
          newsData.likeStatus = false;
        }
        break;
      case 'comment':
        newsData.comments.push(newComment);
        newsData.commentNum++;
        break;
      case 'reading':
        newsData.readingNum++;
        break;
      case 'del':
        newsData.comments.splice(newComment, 1);
        newsData.commentNum--;
        break;
      default: break;
    }
    allNewsData[itemData.index] = newsData;
    this.execSetStorageSync(allNewsData);
    return newsData;
  }
  /*收藏实现方法*/
  collect() {
    return this.updataNewsData('collect');
  }
  /*点赞实现方法*/
  like() {
    return this.updataNewsData('like');
  }
  newComment(newComment) {
    this.updataNewsData('comment', newComment);
  }
  /**
   * 阅读增加
   */
  addReadingTimes() {
    this.updataNewsData('reading');
  }
  /**
   * 删除评论
   */
  delCommentData(idx) {
    this.updataNewsData('del', idx);
  }
  getCommentData() {
    var itemData = this.getNewsItemById().data;
    itemData.comments.sort(this.compareWithTime);
    var len = itemData.comments.length;
    var util = require('../utils/util.js');
    for (var i = 0; i < len; i++) {
      var comment = itemData.comments[i];
      comment.create_time = util.getDiffTime(comment.create_time, true);
    }
    return itemData.comments;
  }
  /*对时间进行排序*/
  compareWithTime(value1, value2) {
    return parseFloat(value1.create_time) - parseFloat(value2.create_time);
  }
};
export { DBSport}