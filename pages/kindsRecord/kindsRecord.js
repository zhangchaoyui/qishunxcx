// pages/kindsRecord/kindsRecord.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    page: 1,
    goods_id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      goods_id: options.id,
      eid:options.eid
    })
    this.getStorageList();
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
    this.setData({
      page: this.data.page++,
    })
    this.getStorageList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  //获取用户存储列表
  getStorageList() {
    let data = {};
    data.goods_id = this.data.goods_id;
    data.page = this.data.page;
    data.extant_id=this.data.eid
    app._post_form('user/getGoodsListInfo', data, res => {
      console.log(res)
      this.setData({
        data: res.data,
        dataList: this.data.dataList.concat(res.data.list)
      })
    })
  }
})