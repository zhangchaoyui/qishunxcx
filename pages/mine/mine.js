// pages/mine/mine.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    listData: [{
      imgUrl: "/images/ziliao.png",
      navUrl: "/pages/datumInfo/datumInfo",
      text: "资料信息"
    }, {
      imgUrl: "/images/cunchu.png",
      navUrl: "/pages/cunchuList/cunchuList",
      text: "订单列表"
    }, {
      imgUrl: "/images/zhangdan.png",
      navUrl: "/pages/historyBill/historyBill",
      text: "账单列表"
    }, {
      imgUrl: "/images/fankyu.png",
      navUrl: "/pages/helpTickling/helpTickling",
      text: "帮助与反馈"
    }, {
      imgUrl: "/images/guanyu.png",
      navUrl: "/pages/aboutMine/aboutMine",
      text: "关于平台"
    }, ],
  },

  // 点击头像事件
  onLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  // 
  cuncuInfo() {
    wx.navigateTo({
      url: '/pages/storeList/storeList',
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
    var _this = this,
      token = wx.getStorageSync('token');
    if (!token) {
      wx.showModal({
        title: '提示',
        content: '请您先登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login',
            });
          } else if (res.cancel) {
            wx.switchTab({
              url: '/pages/home/home',
            });
          }
        }
      });
    } else {
      var imageUrl = wx.getStorageSync('imageUrl'),
        nickName = wx.getStorageSync('nickName');
      if (imageUrl && nickName) {
        this.setData({
          nickName,
          imageUrl,
          isLogin: true
        });
      };
      app._get('user/getUserInfo', {}, res => {
        this.setData({
          userinfo: res.data
        })
      })
    }
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

  }, //显示对话框-提交
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200);
    this.setData({
      showModeText: false,
      backModel: true
    });
  },

  backModel() {
    this.setData({
      showModalStatus: false,
      showModalStatusFinsh: false
    });
    if (!this.data.showModalStatus && !this.data.showModalStatusFinsh) {
      this.setData({
        backModel: false,
        showModeText: true
      });
    }
  },

  //隐藏对话框-提交
  hideModalFinsh: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatusFinsh: false
      })
    }.bind(this), 200);
    setTimeout(res => {
      this.setData({
        showModalStatus: false
      });
    }, 200)

  },

  //退出功能
  sign_out() {
    wx.clearStorageSync(); //清楚缓存
    wx.redirectTo({
      url: '../login/login',
    })
  }
})