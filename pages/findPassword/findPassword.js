// pages/findPassword/findPassword.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '', // 手机号
    password: '', // 密码
    usrPassword: '', //二次密码
    authcode: '', // 验证码
    codename: '获取验证码'
  },

  // 获取手机号
  phone(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  // 获取密码
  password(e) {
    this.setData({
      password: e.detail.value
    });
  },

  // 获取二次密码
  usrPassword(e) {
    this.setData({
      usrPassword: e.detail.value
    });
    if (this.data.password !== this.data.usrPassword) {
      app.hintComifg("密码输入不一致");
      return false;
    };

  },

  // 获取验证号
  authcode(e) {
    this.setData({
      authcode: e.detail.value
    });
  },

  // 确定按钮
  butConfirm() {

    var phone = this.data.phone,
      password = this.data.password,
      usrPassword = this.data.usrPassword,
      authcode = this.data.authcode;
    // 信息不全
    if (phone == "" || password == "" || usrPassword == "" || authcode == '') {
      app.hintComifg("请完善用户信息");
      return false;
    };

    // 手机号验证
    var myreg = /^[1]([3-9])[0-9]{9}$/;
    if (!myreg.test(this.data.phone)) {
      app.hintComifg("请输入正确的手机号");
      return false;
    };

    // 两次密码不一致
    if (this.data.password !== this.data.usrPassword) {
      app.hintComifg("密码输入不一致");
      return false;
    };

    console.log(phone, password, authcode);

    app._post_form('login/updatePassword', {
      phone: phone,
      code: authcode,
      password: password
    }, res => {
      if (res.code == 1) {
        app.hintComifg(res.msg);
        wx.navigateTo({
          url: '/pages/login/login',
        });
      } else if (res.code == -1) {
        app.hintComifg(res.msg);
      };
    });

  },

  // 验证码数据
  getCode: function () {
    var _this = this;
    app._post_form('login/sms', {
      phone: _this.data.phone
    }, res => {
      wx.showToast({
        title: res,
        icon: 'none',
        duration: 2000 //持续的时间
      });
      var num = 61;
      var timer = setInterval(function () {
        num--;
        if (num <= 0) {
          clearInterval(timer);
          _this.setData({
            codename: '重新发送',
            disabled: false
          })

        } else {
          _this.setData({
            codename: num + "s"
          })
        }
      }, 1000)
    });
  },

  //获取验证码
  getVerificationCode() {
    var _this = this;
    var myreg = /^[1]([3-9])[0-9]{9}$/;
    if (_this.data.phone == "") {
      app.hintComifg("手机号不能为空");
      return false;
    }
    if (!myreg.test(_this.data.phone)) {
      app.hintComifg("请输入正确的手机号");
      return false;
    };

    // 请求
    _this.getCode();

    _this.setData({
      disabled: true
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