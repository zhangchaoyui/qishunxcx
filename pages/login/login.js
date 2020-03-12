let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '', // 手机号
    password: '', // 密码
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

  // 确定按钮
  butConfirm() {
    var _this = this,
      phone = _this.data.phone,
      password = _this.data.password;

    // 信息不全
    if (phone == "" || password == "") {
      app.hintComifg("请完善用户信息");
      return false;
    };

    // 手机号验证
    var myreg = /^[1]([3-9])[0-9]{9}$/;
    if (!myreg.test(_this.data.phone)) {
      app.hintComifg("请输入正确的手机号");
      return false;
    };

    wx.showLoading({
      title: "正在登录",
      mask: true
    });
    wx.login({
      success(resLogin) {
        console.log(resLogin);
        app._post_form('Login/login', {
          phone: phone,
          password: password
        }, res => {
          app.hintComifg('登录成功~')
          wx.getStorageSync('');
          wx.hideLoading();
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync("imageUrl", res.data.avatarUrl);
          wx.setStorageSync("nickName", res.data.nickName);
          wx.setStorageSync("user_enterpriseInfo", 0);
          if (res.data.is_auth == 0) {
            wx.setStorageSync("is_auth", true);
          };
          if (res.data.nickName == "") {
            wx.setStorageSync("nickName", res.data.phone);
          };
          if (res.data.nickName == "") {
            wx.setStorageSync("imageUrl", "../../images/pic22.png");
          };
          setTimeout(res => {
            wx.switchTab({
              url: "/pages/home/home"
            });
          }, 1500)
        })
      },
      fail(err) {
        app.hintComifg("登录用户不是该小程序的开发者");
      }
    });
  },

  // 注册
  enroll() {
    wx.navigateTo({
      url: '/pages/enroll/enroll',
    })
  },

  // 忘记密码
  findPassword() {
    wx.navigateTo({
      url: '/pages/findPassword/findPassword',
    })
  },

  // 微信登录
  getUserInfo(e) {
    let _this = this;
    var userInfo = {
      nickName: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl
    };
    wx.showLoading({
      title: "正在登录",
      mask: true
    });
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.hideLoading();
          wx.getUserInfo({
            success(userRes) {
              wx.login({
                success(resLogin) {
                  console.log(resLogin)
                  // 发送用户信息
                  app._post_form('Login/login', {
                    code: resLogin.code,
                    user_info: JSON.stringify(userInfo)
                  }, result => {
                    console.log(result)
                    // if (result.data.is_auth == 1) {
                    wx.setStorageSync("is_auth", false);
                    wx.setStorageSync("imageUrl", userRes.userInfo.avatarUrl);
                    wx.setStorageSync("nickName", userRes.userInfo.nickName);
                    wx.setStorageSync('token', result.data.token);
                    // };
                    wx.switchTab({
                      url: "/pages/home/home"
                    });
                  });
                }
              });

            },
            fail(err) {
              app.hintComifg("获取用户信息失败");
            }
          })
        } else {
          app.hintComifg("请在微信设置中授权");
        }
      }
    })
  },

  /**
   * 授权成功 跳转回原页面
   */
  onNavigateBack() {},

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