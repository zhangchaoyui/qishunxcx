// pages/home/home.js
let app = getApp();

// 站点配置文件
import siteinfo from '../../siteinfo.js';
// 富文本插件
const wxParse = require("../../wxParse/wxParse.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu: [{
      imgUrl: "/images/area.png",
      title: "面积租赁",
      urls: "/pages/advertising/advertising?articleid=11"
    }, {
      imgUrl: "/images/storage.png",
      title: "仓储租赁",
      urls: "/pages/advertising/advertising?articleid=12"
    }, {
      imgUrl: "/images/save.png",
      title: "存储入库",
      urls: "/pages/pickUpGoods/pickUpGoods"
    }, {
      imgUrl: "/images/quSave.png",
      title: "取货出库",
      urls: "/pages/inventory/inventory"
    }, ],
    advertising: [{
      text: "国家发展改革委关于印发《国家物流枢纽布局和建设规划》的..."
    }, {
      text: "国务院办公厅关于印发深化收费公路制度改革的通知"
    }, {
      text: "国务院办公厅转发促进高质量发展意见的通知"
    }, {
      text: "国家发展改革委关于印发《国家物流枢纽布局和建设规划》的..."
    }, ]
  },

  // 打电话
  phoneClick() {
    console.log(2)
    wx.makePhoneCall({
      phoneNumber: this.data.detail.user.mobile,
    })
  },

  // 点击导航
  addresClick() {
    var detail = this.data.detail,
      latitude = Number(detail.user.latitude),
      longitude = Number(detail.user.longitude),
      name = detail.user.address;

    wx.openLocation({
      type: 'gcj02',
      latitude: latitude,
      longitude: longitude,
      name: name,
      address: name,
      scale: 28
    });
  },

  // 注册
  enroll() {
    wx.navigateTo({
      url: '/pages/enroll/enroll',
    })
  },

  //隐藏对话框-提交
  hideModal: function () {
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
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  //显示对话框-提交
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
    }.bind(this), 200)
  },

  btnClick() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  tabClick(e) {
    console.log(e)
    if (e.currentTarget.dataset.index <= 1) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      })
    } else {
      wx.switchTab({
        url: e.currentTarget.dataset.url,
      })
    }
  },

  // 获取首页信息
  getIndex() {
    app._get('index/index', {}, (res) => {
      for (let i in res.data.article) {
        if (res.data.article[i].title == '联系我们') {
          wxParse.wxParse('contact', 'html', res.data.article[i].content, this, 5);
        } else if (res.data.article[i].title == '奇顺云储') {
          wxParse.wxParse('qishun', 'html', res.data.article[i].content, this, 5);
        } else if (res.data.article[i].title == '仓储服务') {
          wxParse.wxParse('cangchu', 'html', res.data.article[i].content, this, 5);
        }
      }
      this.setData({
        advert: res.data.advert,
        article: res.data.article,
        notices: res.data.notices
      });
    });
  },

  // 跳转广告详情
  articleClick(e) {
    var articleid = e.currentTarget.dataset.articleid;
    wx.navigateTo({
      url: '/pages/advertising/advertising?articleid=' + articleid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this,
      siteroot = siteinfo.siteroot;

    _this.setData({
      imagUrlTop: siteroot
    });

    // 获取首页信息
    _this.getIndex();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var is_auth = wx.getStorageSync("is_auth");
    if (is_auth) {
      wx.navigateTo({
        url: '/pages/loginAccredit/loginAccredit',
      });
    };
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
    let _this = this;
    return {
      title: "奇顺物流",
      path: "/pages/home/home",
      imageUrl: '../../images/B1.png'
    };
  }
})