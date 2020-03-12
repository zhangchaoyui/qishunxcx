// pages/helpTickling/helpTickling.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    max: 200,
    phone: "18669528519",
    contactValue: "",
    textareaValue: "",
    image_list: [],
    arr: [1, 2, 3],
    thumb: []
  },

  // 问题及反馈
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);

    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len //当前字数
    });
  },

  // 获取手机号
  contactWay(e) {
    this.setData({
      contactValue: e.detail.value
    });
  },

  // 获取问题与反馈
  textareaWay(e) {
    this.setData({
      textareaValue: e.detail.value
    });
  },

  // 选择图片
  chooseImage: function (e) {
    let _this = this,
      index = e.currentTarget.dataset.index,
      thumb = [];
    // 选择图片
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        _this.setData({
          image_list: _this.data.image_list.concat(res.tempFilePaths),
        });
        _this.loadServer(1, _this.data.image_list, false)
      }
    });
  },

  // 上传图片
  loadServer: function (imagesLength, formData, callBack) {
    let _this = this;
    // POST 参数
    let params = {
      file: formData,
      token: wx.getStorageSync('token')
    };

    // 文件上传
    formData.forEach((filePath, fileKey) => {
      wx.uploadFile({
        url: app.api_root + 'upload/upload',
        filePath: filePath,
        name: 'file',
        formData: params,
        success: function (res) {
          let result = typeof res.data === "object" ? res.data : JSON.parse(res.data);
          _this.data.thumb.push(result.id)
          _this.setData({
            'imgId': result.id,
            thumb: _this.data.thumb
          })
        }
      });
    });
  },

  // 删除图片
  offerOclick(e) {
    var idx = e.currentTarget.dataset.index,
      image_list = this.data.image_list;
    image_list.splice(idx, 1);
    this.setData({
      image_list: image_list
    });
  },

  // 提交
  btns() {
    var contactValue = this.data.contactValue,
      textareaValue = this.data.textareaValue;
    // 信息不全
    if (textareaValue == "" || contactValue == "") {
      wx.showToast({
        title: '请完善反馈信息',
        icon: 'none',
        duration: 1000
      })
      return false;
    };

    // 手机号验证
    var myreg = /^[1]([3-9])[0-9]{9}$/;
    if (!myreg.test(contactValue)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      });
      return false;
    };
    let data = {};
    data.mobile = contactValue;
    data.description = textareaValue;
    data.thumb = this.data.thumb;
    wx.showToast({
      title: '反馈成功~！',
      icon: 'none',
      duration: 2500
    });
    setTimeout((res) => {
      app._post_form('feedback/feed', data, res => {
        if (res.code == 1) {
          //返回上一页
          var pages = getCurrentPages(); //当前页面
          var beforePage = pages[pages.length - 2]; //前一页
          wx.navigateBack({
            success: function () {
              beforePage.onLoad(); // 执行前一个页面的onLoad方法
            }
          });
        }
      })
    }, 2000)
  },

  // 马上咨询
  consult() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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