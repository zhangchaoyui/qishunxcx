// pages/historyBillList/historyBillList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [{
      time: "仓储费",
      price: "568.00"
    }, {
      time: "大车进场费",
      price: "35.00"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let data = {};
    data.info_id=options.id
    app._post_form('account/settlement_info', data, res => {
      console.log(res);
      this.setData({
        data: res.data
      })
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

  }
})