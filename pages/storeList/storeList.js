// pages/storeList/storeList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    huoName: [],
    dateTime: "货物名称"
  },

  // 详情页面
  itemClick(e) {
    wx.navigateTo({
      url: '/pages/kindsRecord/kindsRecord?id=' + e.currentTarget.dataset.id,
    })
  },

  // 监听选择时间
  bindDateChange(e) {
    var dataTime = e.detail.value;
    this.setData({
      dateTime: this.data.huoName[dataTime],
      listData: []
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getStorageList();
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

  //获取用户存储列表
  getStorageList() {
    app._get('user/getGoodsList', {}, res => {
      //console.log(res)
      this.setData({
        dataList: res.data
      })
    })
  }
})