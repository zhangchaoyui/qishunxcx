const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 授权登录
   */
  getUserInfo(e) {
    let _this = this;
    var userInfo = {
      nickName: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl
    };
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.hideLoading();
          wx.getUserInfo({
            success(userRes) {
              wx.setStorageSync("imageUrl", userRes.userInfo.avatarUrl);
              wx.setStorageSync("nickName", userRes.userInfo.nickName);

              wx.login({
                success(resLogin) {
                  // 发送用户信息
                  app._post_form('Login/login', {
                    code: resLogin.code,
                    is_auth: 1,
                    user_info: JSON.stringify(userInfo)
                  }, result => {
                    // if (result.data.is_auth == 1) {
                    wx.setStorageSync("is_auth", false);
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
   * 暂不登录
   */
  onNotLogin() {
    let _this = this;
    // 跳转回原页面
    wx.switchTab({
      url: '../index/index',
    });
  },

  /**
   * 授权成功 跳转回原页面
   */
  onNavigateBack() {
    wx.navigateBack();
  },

})