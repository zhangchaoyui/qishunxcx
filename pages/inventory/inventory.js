// pages/inventory/inventory.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    max: 200, //最多字数 (根据自己需求改变)
    // 提货数量
    allT: "0",
    allJ: "0",
    pagehide: 0,
    // 时间选择
    multiIndex: [0, 0, 0, 0],
    multiArray: [],
    year: "",
    month: "",
    day: "",
    orderData: "请选择预计到达时间",
    // 所选货物列表    
    cargoData: [],
    //外包装列表
    waibz: [],
    type: 1, //出货类型
    huoList: [{
      // 选择提取的货品 
      extant_goods_id: '',
      showImage: true,
      showAImage: true,
      showxz: true,
      wbz: "",
      cargoItem: "请选择货物信息",
      allTValue: "",
      allJValue: "",
      goods_id: '',
      pick_status: '',
      allT: "0",
      allJ: "0",
      choose_id: 0,
      cate_name: '',
      cate_type: "",
      place_name: ''
    }],
    // 上传驾驶证正面
    jszshowImgT: true,
    // 上传驾驶证反面
    jszshowImgTh: true,
    // 上传行驶证正面
    xszshowImgT: true,
    // 上传行驶证正反面
    xszshowImgTh: true,
    showModeText: true,
    order_id: '',
    button_change: true
  },

  // 显示选择提取的货品 
  have(e) {
    var index = e.currentTarget.dataset.index;
    this.data.huoList[index].showImage = true;
    this.setData({
      huoList: this.data.huoList,
      type: e.currentTarget.dataset.type
    });
    if (this.data.huoList[index].showImage) {
      this.data.huoList[index].showAImage = false;
      this.data.huoList[index].showxz = true;
      this.data.huoList[index].wbz = "";
      this.setData({
        huoList: this.data.huoList
      });
    };
  },

  // 显示选择外包装 
  notHave(e) {
    var index = e.currentTarget.dataset.index;
    this.data.huoList[index].showAImage = true;
    this.setData({
      huoList: this.data.huoList,
      type: e.currentTarget.dataset.type
    });
    if (this.data.huoList[index].showAImage) {
      this.data.huoList[index].showImage = false;
      this.data.huoList[index].showxz = false;
      this.data.huoList[index].cargoItem = "";
      this.setData({
        huoList: this.data.huoList,
        allT: 0,
        allJ: 0
      });
    };
  },

  // 选择提取的货品    
  cargoItem(e) {
    var index = e.currentTarget.dataset.index,
      id = e.currentTarget.dataset.id,
      that = this;
    for (let i in that.data.huoList) {
      if (id == that.data.huoList[i].choose_id) {
        wx.showToast({
          title: '当前提货列表已选择当前货物~',
          icon: 'none',
          duration: 2000
        })
        return false;
      }
    }

    this.data.huoList[index].allTValue = ''
    that.data.huoList[index].allT = e.currentTarget.dataset.weight / 1000
    that.data.huoList[index].cargoItem = e.currentTarget.dataset.name
    that.data.huoList[index].cate_name = e.currentTarget.dataset.cate_name
    that.data.huoList[index].cate_type = e.currentTarget.dataset.cate_type == 0 ? '正品' : '副品'
    that.data.huoList[index].place_name = e.currentTarget.dataset.place_name
    that.data.huoList[index].choose_id = e.currentTarget.dataset.id
    that.data.huoList[index].goods_id = e.currentTarget.dataset.goods_id
    this.setData({
      huoList: that.data.huoList
    })
  },

  // 选择外包装 
  waibz(e) {
    //console.log(e)
    var index = e.currentTarget.dataset.index;
    this.data.huoList[index].wbz = e.currentTarget.dataset.item;
    //console.log(e.currentTarget.dataset.index, e.currentTarget.dataset.cindex)
    if (this.data.type == 1) {
      if (this.data.pack[e.currentTarget.dataset.cindex].weight == 0) {
        wx.showToast({
          title: '当前提货列表已选择外包装数量~',
          icon: 'none',
          duration: 2000
        })
        return false;
      } else {
        this.data.huoList[index].goods_id = this.data.shipmentData.pack[index].goods_id;
        this.data.huoList[index].pick_status = this.data.type;
        this.data.huoList[index].allJ = this.data.pack[e.currentTarget.dataset.cindex].weight
        this.data.pack[e.currentTarget.dataset.cindex].weight = 0
      }
    }
    this.setData({
      huoList: this.data.huoList,
      allJ: this.data.shipmentData.pack[index].weight
    });
  },

  // 获取提货数量
  allT(e) {
    var index = e.currentTarget.dataset.index;
    this.data.huoList[index].allTValue = this.data.huoList[index].allT;
    // this.data.huoList[index].allTValue = this.data.allT;
    this.setData({
      huoList: this.data.huoList
    });
  },

  // 获取提货件数
  allJ(e) {
    var index = e.currentTarget.dataset.index;
    this.data.huoList[index].allJValue = this.data.huoList[index].allJ;
    this.setData({
      huoList: this.data.huoList
    });
  },

  allTClick(e) {
    var index = e.currentTarget.dataset.index;
    this.data.huoList[index].allTValue = e.detail.value;
    if (e.detail.value > this.data.huoList[index].allT) {
      this.data.huoList[index].allTValue = this.data.huoList[index].allT
    }
    this.setData({
      huoList: this.data.huoList
    });
  },

  allJClick(e) {
    var index = e.currentTarget.dataset.index;
    this.data.huoList[index].allJValue = e.detail.value;
    this.setData({
      huoList: this.data.huoList
    });
  },

  // 添加货物
  addClick() {
    this.data.huoList.push({
      showImage: false,
      showAImage: true,
      showxz: false,
      wbz: "",
      cargoItem: "请选择货物信息",
      allTValue: "",
      allJValue: "",
      goods_id: '',
      pick_status: '',
      allT: "0",
      allJ: "0",
      choose_id: 0,
      cate_name: '',
      cate_type: "",
      place_name: '',
      extant_goods_id: ''
    })
    this.setData({
      huoList: this.data.huoList
    })
  },

  // 删除货物
  huowItemClick(e) {
    var index = e.currentTarget.dataset.index;
    this.data.huoList.splice(index, 1);
    this.setData({
      huoList: this.data.huoList
    });
  },

  // -------------

  // 上传驾驶证正面
  jszClaceZImg() {
    let _this = this;

    if (_this.data.jszshowImgT == false) {
      _this.setData({
        image_jszZ: null,
        jszshowImgT: true
      });
    }
    this.setData({
      pagehide: 1
    })
    /**
     * 选择图片
     */
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        _this.setData({
          image_jszZ: res.tempFilePaths,
        });
        //console.log(_this.data.image_jszZ, 1);
        _this.data.image_jszZ.forEach((filePath, fileKey) => {
          wx.uploadFile({
            url: app.api_root + 'upload/upload',
            filePath: filePath,
            name: 'file',
            formData: {
              file: _this.data.image_jszZ,
              token: wx.getStorageSync('token')
            },
            success: function (res) {
              let result = typeof res.data === "object" ? res.data : JSON.parse(res.data);
              _this.setData({
                'jszZId': result.id
              })
            }
          });
        });

      }
    });

  },

  // 删除驾驶证正面
  offerjszClaceZ() {
    this.setData({
      jszshowImgT: false,
      pagehide: 0
    })
  },

  // 上传驾驶证反面
  jszClaceFImg() {
    let _this = this;

    if (_this.data.jszshowImgTh == false) {
      _this.setData({
        image_jszF: null,
        jszshowImgTh: true
      });
    }
    this.setData({
      pagehide: 1
    })
    /**
     * 选择图片
     */
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        _this.setData({
          image_jszF: res.tempFilePaths,
        });
        //console.log(_this.data.image_jszF, 1);

        _this.data.image_jszF.forEach((filePath, fileKey) => {
          wx.uploadFile({
            url: app.api_root + 'upload/upload',
            filePath: filePath,
            name: 'file',
            formData: {
              file: _this.data.image_jszF,
              token: wx.getStorageSync('token')
            },
            success: function (res) {
              let result = typeof res.data === "object" ? res.data : JSON.parse(res.data);
              _this.setData({
                'jszFId': result.id
              })
            }
          });
        });

      }
    });

  },

  // 删除驾驶证反面
  offerjszClaceF() {
    this.setData({
      jszshowImgTh: false,
      pagehide: 0
    })
  },


  // ---------------------------

  // 上传行驶证正面
  xszClaceZImg() {
    let _this = this;

    if (_this.data.xszshowImgT == false) {
      _this.setData({
        image_xszZ: null,
        xszshowImgT: true
      });
    }
    this.setData({
      pagehide: 1
    })
    /**
     * 选择图片
     */
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        _this.setData({
          image_xszZ: res.tempFilePaths,
        });
        //console.log(_this.data.image_xszZ, 1);
        _this.data.image_xszZ.forEach((filePath, fileKey) => {
          wx.uploadFile({
            url: app.api_root + 'upload/upload',
            filePath: filePath,
            name: 'file',
            formData: {
              file: _this.data.image_xszZ,
              token: wx.getStorageSync('token')
            },
            success: function (res) {
              let result = typeof res.data === "object" ? res.data : JSON.parse(res.data);
              _this.setData({
                'xszZId': result.id
              })
            }
          });
        });
      }
    });

  },

  // 删除行驶证正面
  offerxszClaceZ() {
    this.setData({
      xszshowImgT: false,
      pagehide: 0
    })
  },

  // 上传行驶证反面
  xszClaceFImg() {
    let _this = this;

    if (_this.data.xszshowImgTh == false) {
      _this.setData({
        image_xszF: null,
        xszshowImgTh: true
      });
    }
    this.setData({
      pagehide: 1
    })
    /**
     * 选择图片
     */
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        _this.setData({
          image_xszF: res.tempFilePaths,
        });
        //console.log(_this.data.image_xszF, 1);

        _this.data.image_xszF.forEach((filePath, fileKey) => {
          wx.uploadFile({
            url: app.api_root + 'upload/upload',
            filePath: filePath,
            name: 'file',
            formData: {
              file: _this.data.image_xszF,
              token: wx.getStorageSync('token')
            },
            success: function (res) {
              let result = typeof res.data === "object" ? res.data : JSON.parse(res.data);
              _this.setData({
                'xszFId': result.id
              })
            }
          });
        });
      }
    });
  },

  // 删除行驶证反面
  offerxszClaceF() {
    this.setData({
      xszshowImgTh: false,
      pagehide: 0
    })
  },

  // 备注
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len, //当前字数
      currentWordValue: value
    });
  },

  // 时间选择
  //value 改变时触发 change 事件
  bindMultiPickerChange: function (e) {
    var dateStr =
      this.data.multiArray[0][this.data.multiIndex[0]] +
      this.data.multiArray[1][this.data.multiIndex[1]] +
      this.data.multiArray[2][this.data.multiIndex[2]] +
      this.data.multiArray[3][this.data.multiIndex[3]],
      nyr = this.data.multiArray[0][this.data.multiIndex[0]] +
      this.data.multiArray[1][this.data.multiIndex[1]] +
      this.data.multiArray[2][this.data.multiIndex[2]],
      sxw = this.data.multiArray[3][this.data.multiIndex[3]];
    this.setData({
      orderData: dateStr,
      nyr,
      sxw
    });
  },

  //某一列的值改变时触发
  bindMultiPickerColumnChange: function (e) {
    var date = new Date();
    var year1 = date.getFullYear()
    var month1 = date.getMonth() + 1
    var day1 = date.getDate()
    var hour1 = date.getHours()
    // //console.log("当前年份" + this.data.month + '修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex,
      year: this.data.year,
      month: this.data.month,
      day: this.data.day,
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        var yearStr = data.multiArray[e.detail.column][e.detail.value];
        var year = yearStr.substring(0, yearStr.length - 1)
        data.year = parseInt(year);
        var surplusMonth = this.surplusMonth(year);
        data.multiArray[1] = surplusMonth;
        if (data.year == year1) {
          data.month = month1;
        } else {
          data.month = 1;
        }
        if (data.year == year1 && month1 == data.month) {
          data.day = day1;
        } else {
          data.day = 1;
        }
        var surplusDay = this.surplusDay(data.year, data.month, data.day);
        data.multiArray[2] = surplusDay;
        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        data.multiIndex[3] = 0;
        break;
      case 1:
        //console.log('选择月份' + data.multiArray[e.detail.column][e.detail.value]);
        var monthStr = data.multiArray[e.detail.column][e.detail.value];
        var month = monthStr.substring(0, monthStr.length - 1);
        data.month = month;
        data.day = 1;
        if (data.year == year1 && month1 == data.month) {
          data.day = day1;
        } else {
          data.day = 1;
        }
        var surplusDay = this.surplusDay(data.year, data.month, data.day);
        data.multiArray[2] = surplusDay;
        data.multiIndex[2] = 0;
        data.multiIndex[3] = 0;
        break;
      case 2:
        //console.log('选择日' + data.multiArray[e.detail.column][e.detail.value]);
        var dayStr = data.multiArray[e.detail.column][e.detail.value];
        var day = dayStr.substring(0, dayStr.length - 1);
        data.day = day;
        data.multiIndex[3] = 0;
        break;
      case 3:
        var hourStr = data.multiArray[e.detail.column][e.detail.value];
        var hour = hourStr.substring(0, hourStr.length - 1);
        data.hour = hour;
        break;
    }
    this.setData(data)
  },

  //月份计算
  surplusMonth: function (year) {
    var date = new Date();
    var year2 = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    var monthDatas = [];
    if (year == year2) {
      var surplusMonth = 12 - month;
      monthDatas.push(month + "月")
      for (var i = month; i < 12; i++) {
        monthDatas.push(i + 1 + "月")
      }
    } else {
      for (var i = 0; i < 12; i++) {
        monthDatas.push(i + 1 + "月")
      }
    }
    return monthDatas;
  },

  //天数计算
  surplusDay: function (year, month, day) {
    var days = 31;
    var dayDatas = [];
    var date = new Date();
    var year2 = date.getFullYear()
    var month2 = date.getMonth() + 1
    switch (parseInt(month)) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        days = 31;
        break;
        //对于2月份需要判断是否为闰年
      case 2:
        if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
          days = 29;
          break;
        } else {
          days = 28;
          break;
        }
        case 4:
        case 6:
        case 9:
        case 11:
          days = 30;
          break;
    }
    if (year == year2 && month == month2) {
      dayDatas.push(day + "日")
      for (var i = day; i < days; i++) {
        dayDatas.push(i + 1 + "日")
      }
    } else {
      // //console.log(month + "月" + days + "天")
      for (var i = 0; i < days; i++) {
        dayDatas.push(i + 1 + "日")
      }
    }
    return dayDatas;
  },

  // ******

  // 司机姓名
  sijiName(e) {
    this.setData({
      sijiNameValue: e.detail.value
    })
  },
  // 联系电话
  sijiPhone(e) {
    this.setData({
      sijiPhoneValue: e.detail.value
    })
  },
  // 身份证
  sijiId(e) {
    this.setData({
      sijiIdValue: e.detail.value
    })
  },
  // 车型号
  sijiCareTyoe(e) {
    this.setData({
      sijiCareTyoeValue: e.detail.value
    })
  },
  // 车牌号
  sijiCareMark(e) {
    this.setData({
      sijiCareMarkValue: e.detail.value
    })
  },

  // ******

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
    }.bind(this), 200);
    this.setData({
      showModeText: true,
      backModel: false
    });
  },

  //显示对话框-提交
  showModal: function () {
    var sijiNameValue = this.data.sijiNameValue,
      sijiPhoneValue = this.data.sijiPhoneValue,
      sijiIdValue = this.data.sijiIdValue,
      sijiCareTyoeValue = this.data.sijiCareTyoeValue,
      sijiCareMarkValue = this.data.sijiCareMarkValue,
      image_jszZ = this.data.jszZId,
      image_jszF = this.data.jszFId,
      image_xszZ = this.data.xszZId,
      image_xszF = this.data.xszFId,
      orderData = this.data.orderData,
      currentWordValue = this.data.currentWordValue,
      huoList = this.data.huoList,
      nyr = this.data.nyr,
      sxw = this.data.sxw;

    // 信息未完善
    if (sijiNameValue == undefined || sijiPhoneValue == undefined || sijiIdValue == undefined || sijiIdValue == undefined || sijiCareTyoeValue == undefined || sijiCareMarkValue == undefined || sijiCareMarkValue == undefined || image_jszZ == undefined || image_jszF == undefined || image_xszZ == undefined || image_xszF == undefined) {
      wx.showToast({
        title: '请完善出库提货信息~',
        icon: 'none',
        duration: 1000
      })
      return false;
    };
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

  // ---

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
    this.setData({
      showModeText: true
    });
  },

  //显示对话框-提交
  showModalFinsh: function () {
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
      showModalStatusFinsh: true
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

  // 返回首页
  returnIndex() {
    this.hideModal();
    this.hideModalFinsh();
    this.setData({
      pagehide: 0,
      button_change: true
    })
    wx.switchTab({
      url: "/pages/home/home"
    })
  },

  // 查看详情
  listClick() {
    this.hideModal();
    this.hideModalFinsh();
    this.setData({
      pagehide: 0,
      button_change: true
    })
    wx.navigateTo({
      url: '/pages/cunchuList/cunchuList',
    })
  },

  // 确定提交
  btnClick() {
    this.setData({
      button_change: false
    })

    var sijiNameValue = this.data.sijiNameValue,
      sijiPhoneValue = this.data.sijiPhoneValue,
      sijiIdValue = this.data.sijiIdValue,
      sijiCareTyoeValue = this.data.sijiCareTyoeValue,
      sijiCareMarkValue = this.data.sijiCareMarkValue,
      image_jszZ = this.data.jszZId,
      image_jszF = this.data.jszFId,
      image_xszZ = this.data.xszZId,
      image_xszF = this.data.xszFId,
      orderData = this.data.orderData,
      currentWordValue = this.data.currentWordValue,
      huoList = this.data.huoList,
      nyr = this.data.nyr,
      sxw = this.data.sxw;

    // 信息未完善
    if (sijiNameValue == undefined || sijiPhoneValue == undefined || sijiIdValue == undefined || sijiIdValue == undefined || sijiCareTyoeValue == undefined || sijiCareMarkValue == undefined || sijiCareMarkValue == undefined || image_jszZ == undefined || image_jszF == undefined || image_xszZ == undefined || image_xszF == undefined || nyr == undefined && nyr == "") {
      wx.showToast({
        title: '请完善用户信息',
        icon: 'none',
        duration: 1000
      })
      this.setData({
        button_change: true
      })
      return false;
    };
    // 信息未完善
    if (sijiNameValue == '' || sijiPhoneValue == '' || sijiIdValue == '' || sijiIdValue == '' || sijiCareTyoeValue == '' || sijiCareMarkValue == '' || sijiCareMarkValue == '' || image_jszZ == '' || image_jszF == '' || image_xszZ == '' || image_xszF == '') {
      wx.showToast({
        title: '请完善用户信息',
        icon: 'none',
        duration: 1000
      })
      this.setData({
        button_change: true
      })
      return false;
    };

    // 验证手机号
    var myreg = /^[1]([3-9])[0-9]{9}$/;
    if (!myreg.test(sijiPhoneValue)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      });
      this.setData({
        button_change: true
      })
      return false;
    };

    // 验证身份证
    var myreg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (!myreg.test(sijiIdValue)) {
      wx.showToast({
        title: '请输入正确的身份证号',
        icon: 'none',
        duration: 1000
      });
      this.setData({
        button_change: true
      })
      return false;
    };

    if (nyr == undefined || nyr == '') {
      app.hintComifg('请输入预计到货时间');
      this.setData({
        button_change: true
      })
      return false;
    } else {
      var year = nyr.split('年'),
        month = nyr.split('月'),
        eary = nyr.split('日'),
        month2 = month[0].split('年'),
        eary2 = eary[0].split('年'),
        eary3 = eary2[1].split('月'),
        y = year[0],
        m = month2[1],
        e = eary3[1],
        yme = y + '-' + m + '-' + e;

      var mydata = yme;
      mydata = mydata.replace(/-/g, '/');
      //console.log("返回时间：" + mydata);
      var time = Date.parse(new Date(mydata)) / 1000;
    }

    let driver = {};
    driver.driver_name = sijiNameValue;
    driver.mobile = sijiPhoneValue;
    driver.driving_licence1 = image_jszZ;
    driver.driving_licence2 = image_jszF;
    driver.driving_permit1 = image_xszZ;
    driver.driving_permit2 = image_xszF;
    driver.idcard = sijiIdValue;
    driver.car_num = sijiCareMarkValue;
    driver.car_type = sijiCareTyoeValue

    let fromData = [];
    for (let i in huoList) {
      let data = {};
      if (huoList[i].goods_id == '') {
        app.hintComifg('请输入货品~');
        this.setData({
          button_change: true
        })
        return false;
      }
      data.goods_id = huoList[i].goods_id
      if (huoList[i].allJValue == '') {
        data.weight = huoList[i].allTValue
      } else if (huoList[i].allTValue == '') {
        data.weight = huoList[i].allJValue
      }
      data.pick_status = huoList[i].pick_status
      data.extant_goods_id = huoList[i].choose_id
      fromData.push(data);
    }

    //发给后端数据
    var dataList = {
      'goods': JSON.stringify(fromData),
      'comment': currentWordValue,
      'pick_goods_time': time,
      'am_and_pm': sxw,
      'driver': JSON.stringify(driver)
    };
    app._post_form('pick_order/pickOrder', dataList, res => {
      wx.removeStorageSync('copyID');
      //console.log(res);
      if (res.code == 1) {
        // 显示提交成功的弹框
        this.showModalFinsh();
        this.setData({
          button_change: true
        })
      };
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var surplusMonth = this.surplusMonth(year);
    var surplusDay = this.surplusDay(year, month, day);
    this.setData({
      multiArray: [
        [year + '年', (year + 1) + '年', (year + 2) + '年'],
        surplusMonth,
        surplusDay, ["上午", "下午"]
      ],
      year: year,
      month: month,
      day: day,
      copyID: wx.getStorageSync('copyID')
    })
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
    var token = wx.getStorageSync('token');
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
      if (this.data.pagehide == 0) {
        this.clearUser();
        this.getDeliveryinfo(); //获取提货基础信息

      }
    };
  },

  //获取提货基础信息
  getDeliveryinfo() {
    let copy = wx.getStorageSync('copyID'),
      data = {},
      orderdata;
    if (copy && copy.status == 1) {
      data.order_id = copy.copyID;
      app._get('pick_order/pickOrder', data, res => {
        if (res.data.goods == [] || res.data.goods.length == 0) {
          wx.showToast({
            title: '您当前没有可提的货物~',
            icon: 'none',
            duration: 3000
          });
          return false;
        }
        // 所选货物列表    
        let cargoData = [],
          waibz = [],
          huoList = [];
        //获取订单信息
        for (let i in res.data.order.goods) {
          huoList.push({
            // 选择提取的货品 
            extant_goods_id: '',
            showImage: false,
            showAImage: true,
            showxz: true,
            wbz: "",
            cargoItem: '请选择货物类型',
            allTValue: '',
            allJValue: "",
            goods_id: '',
            pick_status: '',
            allT: '',
            allJ: "0",
            choose_id: 0,
            cate_name: '',
            cate_type: '',
            place_name: ''
          });
        }
        //获取提货基础信息
        for (let i in res.data.goods) {
          cargoData.push(res.data.goods[i]);
        }
        let comment = res.data.order.comment
        let currentWordNumber = parseInt(comment.length);

        orderdata = app.formatTimeTwo(res.data.order.pick_goods_time, 'Y年M月D日')
        this.setData({
          button_change: true,
          cargoData: cargoData,
          waibz: waibz,
          shipmentData: res.data, //出货总信息
          pack: res.data.pack,
          huoList: huoList,
          sijiNameValue: res.data.order.driver.driver_name, //订单司机姓名
          sijiPhoneValue: res.data.order.driver.mobile, //订单司机联系电话
          sijiIdValue: res.data.order.driver.idcard, //订单身份证号
          sijiCareTyoeValue: res.data.order.driver.car_type, //订单司机车型号
          sijiCareMarkValue: res.data.order.driver.car_num, //订单司机车牌号
          currentWordValue: res.data.order.comment,
          image_jszZ: res.data.order.driver.driving_licence1,
          image_jszF: res.data.order.driver.driving_licence2,
          image_xszZ: res.data.order.driver.driving_permit1,
          image_xszF: res.data.order.driver.driving_permit2,
          jszZId: res.data.order.driver.driving_licence1_id,
          jszFId: res.data.order.driver.driving_licence1_id,
          xszZId: res.data.order.driver.driving_permit1_id,
          xszFId: res.data.order.driver.driving_permit2_id,
          orderData: orderdata, //到货时间
          nyr: orderdata,
          currentWordNumber: currentWordNumber
        })
      });
    } else {
      app._get('pick_order/pickOrder', data, res => {
        if (res.data.goods == [] || res.data.goods.length == 0) {
          wx.showToast({
            title: '您当前没有可提的货物~',
            icon: 'none',
            duration: 3000
          });
          return false;
        }
        if (res.data.goods.length == 0 && res.data.pack.length == []) {
          this.setData({
            allT: 0,
            allJ: 0
          })
        } else {
          // 所选货物列表    
          let cargoData = [],
            waibz = [];
          //获取提货基础信息
          for (let i in res.data.goods) {
            cargoData.push(res.data.goods[i]);
          }
          //外包装信息
          // for (let i in res.data.pack) {
          //   waibz.push(res.data.pack[i].pack.pack_name);
          // }
          this.setData({
            cargoData: cargoData,
            waibz: waibz,
            shipmentData: res.data, //出货总信息
            pack: res.data.pack,
          })
        }
      });
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.removeStorageSync('copyID');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorageSync('copyID');
    this.clearUser();
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

  //清楚用户操作信息
  clearUser() {
    this.setData({
      orderData: '请选择预计到达时间',
      sijiNameValue: '',
      sijiPhoneValue: '',
      sijiIdValue: '',
      sijiCareTyoeValue: '',
      sijiCareMarkValue: '',
      cargoData: {},
      jszZId: '',
      jszFId: '',
      xszZId: '',
      xszFId: '',
      image_jszZ: [],
      image_jszF: [],
      image_xszZ: [],
      image_xszF: [],
      allT: 0,
      allJ: 0,
      currentWordValue: '',
      huoList: [{
        // 选择提取的货品 
        showImage: false,
        showAImage: true,
        showxz: false,
        wbz: "",
        cargoItem: "",
        allTValue: "",
        allJValue: "",
        goods_id: '',
        pick_status: '',
        allT: 0,
        allJ: 0,
        extant_goods_id: ''
      }],
    })
  }
})