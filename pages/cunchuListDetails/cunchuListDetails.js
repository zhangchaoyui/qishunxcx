// pages/cunchuListDetails/cunchuListDetails.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showImage: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = {},
      str;
    data.order_id = options.id
    this.setData({
      pick: options.pick
    })
    if (options.pick == 0) {
      app._post_form('/user/getPutOrderInfo', data, res => {
        let hours = app.formatTimeTwo(res.data.data.put_goods_time, 'h');
        if (hours < 12) {
          str = '上午';
        } else {
          str = '下午';
        }
        let time = app.formatTimeTwo(res.data.data.put_goods_time, 'Y/M/D') + '   ' + str;
        if (res.data.data.goods[0].pack_nums > 0) {
          let showImage = true
          this.setData({
            data: res.data.data,
            goods: res.data.data.goods,
            showImage: showImage,
            pick: options.pick,
            time: time,
            orderType: options.id
          })
        } else {
          let showAImage = false
          this.setData({
            data: res.data.data,
            goods: res.data.data.goods,
            showAImage: showAImage,
            time: time,
          })
        }

      })
    } else {
      app._post_form('/user/getPickOrderInfo', data, res => {
        res.data.data.update_time = app.formatTimeTwo(res.data.data.update_time, 'M/D')
        let time = app.formatTimeTwo(res.data.data.pick_goods_time, 'Y/M/D');
        if (res.data.data.goods[0].pack_nums > 0) {
          let showImage = true
          this.setData({
            data: res.data.data,
            showImage: showImage,
            time: time,
            goods: res.data.data.goods,
          })
        } else {
          let showAImage = false
          this.setData({
            data: res.data.data,
            showAImage: showAImage,
            time: time,
            goods: res.data.data.goods,
          })
        }
      })
    }
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


  //订单复制
  orderCopy(e) {
    let orderData = {},
      data = {},
      that = this;
    orderData.status = e.currentTarget.dataset.status;
    orderData.copyID = e.currentTarget.dataset.id;
    wx.setStorageSync('copyID', orderData);
    data.put_and_pick = this.data.pick;
    data.order_id = e.currentTarget.dataset.id
    app._post_form('user/abolish', data, res => {
      app.hintComifg(res.data);
      setTimeout(res => {
        if (orderData.status == 1) {
          wx.switchTab({
            url: '../inventory/inventory',
          })
        } else {
          wx.switchTab({
            url: '../pickUpGoods/pickUpGoods',
          })
        }
        // wx.redirectTo({
        //   url: '../cunchuList/cunchuList',
        // })
      }, 1200)
    })
  },

  
  //预览单个图片
  previewMoreImage(e) {
    let src = e.currentTarget.dataset.src;
    let urlarr = [];
    urlarr.push(src)
    wx.previewImage({
      current: src,
      urls: urlarr
    })
  },
})