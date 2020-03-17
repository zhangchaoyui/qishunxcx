// pages/advertising/advertising.js
let app = getApp();

// 富文本插件
const wxParse = require("../../wxParse/wxParse.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 获取公告详情
  getArticleInfo(articleId) {
    app._get('index/getArticleInfo', {
      article_id: articleId
    }, (res) => {
      this.setData({
        title: res.data[0].title,
        create_time: res.data[0].create_time,
        description: res.data[0].description,
      });

      // 富文本转码
      if (res.data[0].content.length > 0) {
        wxParse.wxParse('content', 'html', res.data[0].content, this, 0);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取广告详情
    this.getArticleInfo(options.articleid);
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

  }
})