// pages/historyBill /historyBill .js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    total_money:0,
    page: 1
  },

  // 详情页
  dataClick(e) {
    //console.log(e);
    wx.navigateTo({
      url: '/pages/historyBillList/historyBillList?id='+e.currentTarget.dataset.id,
    })
  },

  // 监听选择时间
  bindDateChange(e) {
    var dataTime = e.detail.value,
      year = dataTime.substr(0, 4),
      month = dataTime.substr(5, 2),
      dayListYearMonth = year + "年" + month + "月"
    this.setData({
      dateTime: dayListYearMonth,
      datatime: year + '-' + month,
      month: month,
      page:1,
      dataList:[]
    });
    this.gethostiyTime()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var data = new Date(),
      y = data.getFullYear(),
      m = data.getMonth() + 1;
    if (m < 10) {
      m = "0" + m
    }
    this.setData({
      dateTime: y + "年" + m + "月",
      datatime: y + '-' + m,
    });
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
    this.gethostiyTime()
  },

  //获取历史账单信息
  gethostiyTime(){
    wx.showLoading({
      title: '加载中',
    })
    let data = {};
    data.month_time = this.data.datatime;
    data.page = this.data.page;
    app._post_form('account/month_settlement', data, res => {
      wx.hideLoading();
      for(let i in res.data.list){
        res.data.list[i].create_time= res.data.list[i].create_time.substr(5)
      }
      this.setData({
        dataList:this.data.dataList.concat(res.data.list),
        total_money: res.data.total_money
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      dataList:[]
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.page++
    this.gethostiyTime();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})