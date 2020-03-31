// pages/cunchuList/cunchuList.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: ["存货订单", "提货订单"],
    currtab: 0, //订单列表类型
    mineTabList: ["未处理", "处理中", "已处理"],
    mineTabList2: ["未处理", "已处理"],
    currtabMine: 0, //订单状态
    dataList: [], //数据列表
    page: 1, //分页
  },

  // tab切换
  tab(e) {
    this.setData({
      currtab: e.currentTarget.dataset.index,
      dataList: [],
      currtabMine: 0
    });
    this.getOderList();
  },

  // 订单切换
  mineTab(e) {
    this.setData({
      currtabMine: e.currentTarget.dataset.index,
      dataList: []
    });

    this.getOderList();
  },

  // 订单详情
  itemsClick(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/cunchuListDetails/cunchuListDetails?id=' + e.currentTarget.dataset.id + '&pick=' + e.currentTarget.dataset.pick,
    })
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOderList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      dataList: []
    })
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
    this.setData({
      dataList: []
    })
    wx.showLoading({
      title: '加载中',
    })
    let a = this.getOderList();
    if (a) {
      wx.stopPullDownRefresh();
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    })
    this.getOderList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //获取用户订单列表
  getOderList() {
    let data = {},
      currtabMine = this.data.currtabMine,
      type = 0;
    data.put_and_pick = this.data.currtab;
    if (currtabMine == 1) {
      type = 2
    } else if (currtabMine == 2) {
      type = 3
    }
    data.status = type;
    data.page = this.data.page;
    app._post_form('user/getOrder', data, res => {
      wx.hideLoading();
      let data = res.data.data;
      for (let i in data) {
        data[i].create_time = app.formatTimeTwo(data[i].create_time, 'Y/M/D H:M')
        if (data[i].update_time != 0) {
          data[i].update_time = app.formatTimeTwo(data[i].update_time, 'Y/M/D H:M')
        }
      }
      this.setData({
        dataList: this.data.dataList.concat(data),
      })
    })
    return true;
  },

  //废除订单
  abolish(e) {
    let data = {},
      that = this;
    data.put_and_pick = this.data.currtab;
    data.order_id = e.currentTarget.dataset.id
    app._post_form('user/abolish', data, res => {
      app.hintComifg(res.data);
      that.setData({
        dataList: []
      })
      //返回上一页
      setTimeout(res => {
        this.getOderList();
      }, 2000)
      // that.getOderList();
    })
  },

  //订单复制
  orderCopy(e) {
    let orderData = {};
    orderData.status = e.currentTarget.dataset.status;
    orderData.copyID = e.currentTarget.dataset.id;
    wx.setStorageSync('copyID', orderData);
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
    }, 500)
  }
})