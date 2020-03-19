// pages/pickUpGoods/pickUpGoods.js
let app = getApp();

// 站点配置文件
import siteinfo from '../../siteinfo.js';

const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    max: 200, //最多字数 (根据自己需求改变)
    currect: 0,
    pagehide: 0, //页面参数
    // 货物选择
    cargoData: [],
    // 产地
    placeData: [],
    placeCure: 0,
    palceChild: '',
    userData: [],
    userData_gn: [],
    userData_gw: [],
    userData_zc: [],
    placeItem: "",
    // 型号
    versionData: [],
    versionCure: null,
    versionUserData: ['正品', '副品'], //产品型号子集
    versionItem: "",
    versionItemXh: "",
    showXz: true,
    // 时间选择
    // multiIndex: [ 0, 0],
    multiIndex: [0, 0, 0, 0],
    multiArray: [],
    year: "",
    month: "",
    day: "",
    orderData: "请选择预计到货时间",
    // 营业执照
    showImgO: true,
    // 上传身份证正面
    showImgT: true,
    // 上传身份证正面
    showImgTh: true,
    // 上传驾驶证正面
    jszshowImgT: true,
    // 上传驾驶证正面
    jszshowImgTh: true,
    // 上传行驶证正面
    xszshowImgT: true,
    // 上传行驶证正面
    xszshowImgTh: true,
    regionfather: 0,
    // 添加货物
    huowList: [{
      cargoItem: "",
      place: "",
      stairModel: "",
      levelModel: "",
      versionItemXh: "",
      versionItem: "",
      ondDun: "",
      ondJian: "",
      outerPacking: "",
      zhifang: 0, // 0 存放 1 卖掉
      cargo: false,
      place: false,
      version: false,
      showImage: false,
      showAImage: true,
      // 请选择置放方式
      putShow: true,
      putShowTwo: false,
      // 外包装
      baoz: [],
      // user_place:'',
    }],
    // 备注
    currentWordValue: "",
    showModeText: true,
    editUserList: [],
    butAuditText: "提交审核",
    userStatus: 0,
    // user_place:null,
    button_change: true
  },

  // tab切换
  tabAction(e) {
    var _this = this;
    _this.setData({
      currect: e.currentTarget.dataset.currect
    });
    // //console.log(e.currentTarget.dataset.currect);
    if (_this.data.currect == 0) {
      // 获取企业信息
      _this.getDateEditUser();
    } else {
      // 请求存货信息
      _this.getDateOrder();
    };
  },

  // 货物名称
  cargo(e) {
    var index = e.currentTarget.dataset.index;
    this.data.huowList[index].cargo = !this.data.huowList[index].cargo;
    this.setData({
      huowList: this.data.huowList
    });
  },

  // 货物名称选择
  cargoItem(e) {
    var index = e.currentTarget.dataset.index,
      item = e.currentTarget.dataset.item,
      goodId = e.currentTarget.dataset.goodid;
    this.data.huowList[index].cargoItem = item;
    this.data.huowList[index].cargoId = goodId;
    this.setData({
      huowList: this.data.huowList
    });
  },

  // 产地
  place(e) {
    var index = e.currentTarget.dataset.index;
    this.data.huowList[index].place = !this.data.huowList[index].place;
    this.setData({
      huowList: this.data.huowList
    });
  },

  // 产地一级选择
  placeCure(e) {
    let index = e.currentTarget.dataset.index,
      indexs = e.currentTarget.dataset.indexs,
      item = e.currentTarget.dataset.item,
      regionId = e.currentTarget.dataset.regionid;
    this.data.huowList[indexs].stairModel = item;
    // this.data.huowList[indexs].regionId = regionId;
    this.setData({
      huowList: this.data.huowList,
      placeCure: e.currentTarget.dataset.index,
      regionfather: e.currentTarget.dataset.index,
    });
    if (index == 0) {
      this.setData({
        userData: this.data.userData_gn,
      });
    } else if (index == 1) {
      this.setData({
        userData: this.data.userData_gw,
      });
    } else {
      this.setData({
        userData: this.data.userData_zc,
      });
    }
  },

  // 产地选择  
  placeItem(e) {
    var index = e.currentTarget.dataset.index,
      item = e.currentTarget.dataset.item,
      regionChildId = e.currentTarget.dataset.child;
    this.data.huowList[index].levelModel = item;
    this.data.huowList[index].regionId = regionChildId;
    this.setData({
      huowList: this.data.huowList,
      placeCure: e.currentTarget.dataset.idx,
    });
  },

  // 型号
  version(e) {
    var index = e.currentTarget.dataset.index;
    this.data.huowList[index].version = !this.data.huowList[index].version;
    this.setData({
      huowList: this.data.huowList
    });
  },

  // 型号一级选择
  versionCure(e) {
    let index = e.currentTarget.dataset.index,
      indexs = e.currentTarget.dataset.indexs,
      item = e.currentTarget.dataset.item,
      cateid = e.currentTarget.dataset.cateid;
    // //console.log(cateid)
    this.data.huowList[indexs].versionItemXh = item;
    this.data.huowList[indexs].cateid = cateid;
    this.setData({
      huowList: this.data.huowList,
      versionCure: index,
    });
  },

  // 型号选择  
  versionItem(e) {
    var index = e.currentTarget.dataset.index,
      item = e.currentTarget.dataset.item;
    this.data.huowList[index].versionItem = item;
    this.setData({
      huowList: this.data.huowList
    })
  },

  // 吨数
  one_dun(e) {
    var index = e.currentTarget.dataset.index;
    //console.log(e.detail.value);
    this.data.huowList[index].ondDun = e.detail.value;
    this.setData({
      ondDun: e.detail.value,
      huowList: this.data.huowList
    });
  },

  // 件数
  one_jian(e) {
    var index = e.currentTarget.dataset.index;
    this.data.huowList[index].ondJian = e.detail.value;
    this.setData({
      ondJian: e.detail.value,
      huowList: this.data.huowList
    });
  },

  // 外包装
  have(e) {
    var index = e.currentTarget.dataset.index,
      huowList = this.data.huowList;
    this.data.huowList[index].showImage = true;
    for (let i in huowList) {
      for (let j in this.data.pack) {
        if (huowList[i].baoz[j] != undefined) {
          break;
        } else {
          let pack = {};
          pack.id = this.data.pack[j].id
          pack.status = false
          pack.mutuoValue = ''
          pack.pack_name = this.data.pack[j].pack_name
          huowList[i].baoz[j] = pack
        }
      }
    }
    this.setData({
      huowList: this.data.huowList
    });

    if (this.data.huowList[index].showImage) {
      this.data.huowList[index].showAImage = false;
      this.setData({
        huowList: this.data.huowList
      });
    }
  },

  notHave(e) {
    var index = e.currentTarget.dataset.index;
    this.data.huowList[index].showAImage = true;
    this.data.huowList[index].outerPacking = "";
    this.setData({
      huowList: this.data.huowList
    });
    if (this.data.huowList[index].showAImage) {
      this.data.huowList[index].showImage = false;
      this.setData({
        huowList: this.data.huowList
      });
    }
  },

  // 请选择包装类别
  xzItem(e) {
    // 包装索引
    let idx = e.currentTarget.dataset.idx,
      // 货物索引
      index = e.currentTarget.dataset.index,
      id = e.currentTarget.dataset.id,
      huowList = this.data.huowList;
    huowList[index].baoz[idx].status == false ? huowList[index].baoz[idx].status = true : huowList[index].baoz[idx].status = false;
    this.setData({
      huowList
    });
  },

  // 请选择置放方式
  xzPut(e) {
    let index = e.currentTarget.dataset.index;
    this.data.huowList[index].putShow = !this.data.huowList[index].putShow;
    this.data.huowList[index].zhifang = 0;
    this.setData({
      huowList: this.data.huowList
    });
    if (this.data.huowList[index].putShow) {
      this.data.huowList[index].putShowTwo = false;
      this.setData({
        huowList: this.data.huowList
      });
    }
  },
  xzPutTwo(e) {
    let index = e.currentTarget.dataset.index;
    this.data.huowList[index].putShowTwo = !this.data.huowList[index].putShowTwo;
    this.data.huowList[index].zhifang = 1;
    this.setData({
      huowList: this.data.huowList
    });
    if (this.data.huowList[index].putShowTwo) {
      this.data.huowList[index].putShow = false;
      this.setData({
        huowList: this.data.huowList
      });
    }
  },

  // 木托件数 
  mutuo(e) {
    var indexsx = e.currentTarget.dataset.indexs,
      index = e.currentTarget.dataset.index,
      that = this;
    that.data.huowList[indexsx].baoz[index].mutuoValue = e.detail.value;

    that.setData({
      huowList: that.data.huowList
    });
  },

  // 添加货物
  addClick() {
    this.data.huowList.push({
      cargoItem: "",
      place: "",
      stairModel: "",
      levelModel: "",
      versionItemXh: "",
      versionItem: "",
      ondDun: "",
      ondJian: "",
      outerPacking: "",
      zhifang: 0, // 0 存放 1 卖掉
      cargo: false,
      place: false,
      version: false,
      showImage: false,
      showAImage: true,
      // 请选择置放方式
      putShow: true,
      putShowTwo: false,
      // 外包装
      baoz: []
    });
    this.setData({
      huowList: this.data.huowList
    });
  },

  // 删除货物
  huowItemClick(e) {
    var index = e.currentTarget.dataset.index;
    this.data.huowList.splice(index, 1);
    this.setData({
      huowList: this.data.huowList
    });
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
    //console.log(this.data.currentWordValue)
  },


  // 上传营业执照
  businessImg() {
    let _this = this;

    if (_this.data.showImgO == false) {
      _this.setData({
        image_list: null,
        showImgO: true
      });
    }
    this.setData({
      pagehide: 1
    })
    /**
     * 选择图片
     */
    let imageList = _this.data.image_list;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        _this.setData({
          image_list: res.tempFilePaths,
        });
        //console.log(_this.data.image_list, 1);

        _this.data.image_list.forEach(function (filePath, fileKey) {
          wx.uploadFile({
            url: app.api_root + 'upload/upload',
            filePath: filePath,
            name: 'file',
            formData: {
              file: _this.data.image_list,
              token: wx.getStorageSync('token')
            },
            success: function (res) {
              let result = typeof res.data === "object" ? res.data : JSON.parse(res.data);
              _this.setData({
                image_list: 'https://qishun.400539.com/' + result.src,
                'businessId': result.id,

              })
            }
          });
        });
      }
    });
  },

  // 删除营业执照
  offerOclick() {
    this.setData({
      showImgO: false,
      businessId: '',
      pagehide: 0
    })
  },

  // 上传身份证正面
  idClaceZImg() {
    let _this = this;

    if (_this.data.showImgT == false) {
      _this.setData({
        image_idZ: null,
        showImgT: true
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
          image_idZ: res.tempFilePaths,
        });
        _this.data.image_idZ.forEach((filePath, fileKey) => {
          wx.uploadFile({
            url: app.api_root + 'upload/upload',
            filePath: filePath,
            name: 'file',
            formData: {
              file: _this.data.image_idZ,
              token: wx.getStorageSync('token')
            },
            success: function (res) {
              let result = typeof res.data === "object" ? res.data : JSON.parse(res.data);
              _this.setData({
                image_idZ: 'https://qishun.400539.com/' + result.src,
                'idClaceZId': result.id
              })
            }
          });
        });
      }
    });

  },

  // 删除身份证正面
  offeridClaceZ() {
    this.setData({
      showImgT: false,
      idClaceZId: '',
      pagehide: 0
    })
  },

  // 上传身份证反面
  idClaceFImg() {
    let _this = this;

    if (_this.data.showImgTh == false) {
      _this.setData({
        image_idF: null,
        showImgTh: true
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
          image_idF: res.tempFilePaths,
        });
        //console.log(_this.data.image_idF, 1);

        _this.data.image_idF.forEach((filePath, fileKey) => {
          wx.uploadFile({
            url: app.api_root + 'upload/upload',
            filePath: filePath,
            name: 'file',
            formData: {
              file: _this.data.image_idF,
              token: wx.getStorageSync('token')
            },
            success: function (res) {
              let result = typeof res.data === "object" ? res.data : JSON.parse(res.data);
              //console.log(result, 7777);
              _this.setData({
                image_idF: 'https://qishun.400539.com/' + result.src,
                'offeridId': result.id
              })
            }
          });
        });

      }
    });

  },

  // 删除身份证反面
  offeridClaceF() {
    this.setData({
      showImgTh: false,
      offeridId: '',
      pagehide: 0
    })
  },


  // 上传驾驶证正面
  jszClaceZImg() {
    let _this = this;
    if (_this.data.jszshowImgT == false) {
      _this.setData({
        image_jszZ: null,
        jszshowImgT: true,
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
              //console.log(res);
              let result = typeof res.data === "object" ? res.data : JSON.parse(res.data);
              _this.setData({
                'jszZId': result.id,
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
      pagehide: 0,
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
    //console.log("当前年份" + this.data.month + '修改的列为', e.detail.column, '，值为', e.detail.value);
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
    this.setData(data);
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
    // if (this.data.auditCode) {
    //   app.hintComifg("用户信息未审核完毕, 请等待审核");
    //   return false;
    // } else {
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
    // };
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
      showModalStatusFinsh: false,
    });
    if (!this.data.showModalStatus && !this.data.showModalStatusFinsh) {
      this.setData({
        backModel: false,
        showModeText: true
      });
    }
  },


  // 获取企业信息
  qiUserfirm(e) {
    this.setData({
      qiUserfirm: e.detail.value
    })
  },
  qiUsername(e) {
    this.setData({
      qiUsername: e.detail.value
    })
  },
  qiUserphoneOne(e) {
    this.setData({
      qiUserphoneOne: e.detail.value
    })
  },
  qiUserphoneTwo(e) {
    this.setData({
      qiUserphoneTwo: e.detail.value
    })
  },
  qiOrder(e) {
    this.setData({
      qiOrder: e.detail.value
    })
  },
  qiYhzh(e) {
    this.setData({
      qiYhzh: e.detail.value
    })
  },
  qiZhuguanname(e) {
    this.setData({
      qiZhuguanname: e.detail.value
    })
  },
  qiZhuguanPhone(e) {
    this.setData({
      qiZhuguanPhone: e.detail.value
    })
  },

  // 确定提交
  btnClick() {
    this.setData({
      button_change: false
    })

    if (!wx.getStorageSync('user_enterpriseInfo')) {
      wx.showToast({
        title: '请先填写企业信息！',
        icon: 'none',
        duration: 1000
      })
      return false;
    }

    var sijiNameValue = this.data.sijiNameValue,
      sijiPhoneValue = this.data.sijiPhoneValue,
      sijiIdValue = this.data.sijiIdValue,
      sijiCareTyoeValue = this.data.sijiCareTyoeValue,
      sijiCareMarkValue = this.data.sijiCareMarkValue,
      jszZId = this.data.jszZId,
      jszFId = this.data.jszFId,
      xszZId = this.data.xszZId,
      xszFId = this.data.xszFId,
      currentWordValue = this.data.currentWordValue,
      huowList = this.data.huowList,
      nyr = this.data.nyr,
      sxw = this.data.sxw;

    // 信息未完善
    if (sijiNameValue == undefined || sijiPhoneValue == undefined || sijiIdValue == undefined || sijiIdValue == undefined || sijiCareTyoeValue == undefined || sijiCareMarkValue == undefined || currentWordValue == undefined || jszZId == undefined || jszFId == undefined || xszZId == undefined || xszFId == undefined || nyr == undefined) {
      wx.showToast({
        title: '请完善信息',
        icon: 'none',
        duration: 1000
      })
      this.setData({
        button_change: true
      })
      return false;
    };

    // 信息未完善
    if (sijiNameValue == '' || sijiPhoneValue == '' || sijiIdValue == '' || sijiCareTyoeValue == '' || sijiCareMarkValue == '' || jszZId == '' || jszFId == '' || xszZId == '' || xszFId == '' || nyr == '') {
      wx.showToast({
        title: '请完善信息',
        icon: 'none',
        duration: 1000
      })
      this.setData({
        button_change: true
      })
      return false;
    };

    // 验证手机号
    //console.log(sijiPhoneValue);
    var myreg = /^[1]([3-9])[0-9]{9}$/;
    if (!myreg.test(sijiPhoneValue)) {
      app.hintComifg('请输入正确的手机号');
      this.setData({
        button_change: true
      })
      return false;
    };

    // 验证身份证
    var myreg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (!myreg.test(sijiIdValue)) {
      this.setData({
        button_change: true
      })
      app.hintComifg('请输入正确的身份证号');
      return false;
    };

    var goods = [];
    huowList.forEach((item, index) => {
      var obj = {};
      obj.goods_id = item.cargoId;
      obj.weight = item.ondDun;
      obj.piece = item.ondJian;
      obj.place_id = item.regionId;
      obj.cate_id = item.cateid;
      if (item.versionItem != "") {
        obj.cate_type = item.versionItem == "正品" ? 0 : 1;
      }
      obj.put_status = item.putShow ? 0 : 1; // 0存放 1卖掉

      // 选择包装
      obj.pack = [];
      console.log(item.baoz)
      for (let ii in item.baoz) {
        var packObj = {};
        if (item.baoz[ii].status == 1) {
          if (item.baoz[ii].mutuoValue == '' || item.baoz[ii].mutuoValue == undefined) {
            app.hintComifg('请输入外包装数量');
            this.setData({
              button_change: true
            })
            return false;
          } else {
            packObj.pack_id = item.baoz[ii].id;
            packObj.pack_num = item.baoz[ii].mutuoValue;
            obj.pack.push(packObj);
          }
        };
      }
      goods.push(obj);
    });


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
    var driver = {};
    driver.car_type = sijiCareTyoeValue;
    driver.driving_licence1 = jszZId;
    driver.driving_licence2 = jszFId;
    driver.driving_permit1 = xszZId;
    driver.driving_permit2 = xszFId;
    driver.idcard = sijiIdValue;
    driver.car_num = sijiCareMarkValue;
    driver.driver_name = sijiNameValue;
    driver.mobile = sijiPhoneValue;

    var dataList = {
      'goods': JSON.stringify(goods),
      'comment': currentWordValue,
      'put_goods_time': time,
      'am_and_pm': sxw,
      'driver': JSON.stringify(driver)
    };

    //console.log(dataList);

    app._post_form('put_order/putOrder', dataList, res => {
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

  // 提交企业信息
  companyClick() {
    var UserName = this.data.qiUsername,
      qiUserphoneOne = this.data.qiUserphoneOne,
      qiUserphoneTwo = this.data.qiUserphoneTwo,
      qiOrder = this.data.qiOrder,
      qiYhzh = this.data.qiYhzh,
      qiZhuguanname = this.data.qiZhuguanname,
      qiZhuguanPhone = this.data.qiZhuguanPhone,
      bineiss = this.data.businessId,
      IdZheng = this.data.idClaceZId,
      IdFan = this.data.offeridId,
      qiUserfirm = this.data.qiUserfirm;
    // 信息未完善
    if (UserName == undefined || qiUserphoneOne == undefined || qiOrder == undefined || qiYhzh == undefined || qiZhuguanname == undefined || qiZhuguanPhone == undefined || bineiss == undefined || IdZheng == undefined || IdFan == undefined || qiUserfirm == undefined) {
      wx.showToast({
        title: '请完善用户信息',
        icon: 'none',
        duration: 1000
      })
      return false;
    };

    // 信息未完善
    if (UserName == '' || qiUserphoneOne == '' || qiUserphoneTwo == '' || qiOrder == '' || qiYhzh == '' || qiZhuguanname == '' || qiZhuguanPhone == '' || bineiss == '' || IdZheng == '' || IdFan == '' || qiUserfirm == '') {
      wx.showToast({
        title: '请完善用户信息',
        icon: 'none',
        duration: 1000
      })
      return false;
    };

    // 验证手机号
    var myreg = /^[1]([3-9])[0-9]{9}$/;
    if (!myreg.test(qiUserphoneOne) || !myreg.test(qiZhuguanPhone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      });
      return false;
    };

    var datas = {
      company_name: qiUserfirm,
      truename: UserName,
      mobile1: qiUserphoneOne,
      mobile2: qiUserphoneTwo,
      address: qiOrder,
      bank_card_num: qiYhzh,
      workman_name: qiZhuguanname,
      workman_mobile: qiZhuguanPhone,
      business_license: Number(bineiss),
      idcard_img1: Number(IdZheng),
      idcard_img2: Number(IdFan)
    };

    app._post_form('user/editUser', datas, res => {
      if (res.code == 1) {
        wx.showToast({
          title: "提交成功",
          icon: 'success',
          duration: 2000
        });
        wx.setStorageSync('user_enterpriseInfo', 1)
        this.setData({
          userStatus: 1,
          butAuditText: "修改资料"
        });
      };
    });
  },

  // 提交审核企业信息
  auditClick() {
    var UserName = this.data.qiUsername,
      qiUserphoneOne = this.data.qiUserphoneOne,
      qiUserphoneTwo = this.data.qiUserphoneTwo,
      qiOrder = this.data.qiOrder,
      qiYhzh = this.data.qiYhzh,
      qiZhuguanname = this.data.qiZhuguanname,
      qiZhuguanPhone = this.data.qiZhuguanPhone,
      bineiss = this.data.businessId,
      IdZheng = this.data.idClaceZId,
      IdFan = this.data.offeridId,
      qiUserfirm = this.data.qiUserfirm;
    // 信息未完善
    if (UserName == undefined || qiUserphoneOne == undefined || qiUserphoneTwo == undefined || qiOrder == undefined || qiYhzh == undefined || qiZhuguanname == undefined || qiZhuguanPhone == undefined || bineiss == undefined || IdZheng == undefined || IdFan == undefined || qiUserfirm == undefined) {
      wx.showToast({
        title: '请完善用户信息',
        icon: 'none',
        duration: 1000
      })
      return false;
    };

    // 信息未完善
    if (UserName == '' || qiUserphoneOne == '' || qiUserphoneTwo == '' || qiOrder == '' || qiYhzh == '' || qiZhuguanname == '' || qiZhuguanPhone == '' || bineiss == '' || IdZheng == '' || IdFan == '' || qiUserfirm == '') {
      wx.showToast({
        title: '请完善用户信息',
        icon: 'none',
        duration: 1000
      })
      return false;
    };


    // 验证手机号
    var myreg = /^[1]([3-9])[0-9]{9}$/;
    if (!myreg.test(qiUserphoneOne) || !myreg.test(qiUserphoneTwo) || !myreg.test(qiZhuguanPhone)) {
      app.hintComifg("请输入正确的手机号");
      return false;
    };

    app._post_form('user/editUser', datas, res => {
      if (res.code == 1) {
        wx.showToast({
          title: res.data,
          icon: 'success',
          duration: 2000
        });
        if (res.data[0].status == 0) {
          wx.setStorageSync('auditCode', false);
          this.setData({
            butAuditText: "提交"
          });
        } else if (res.data[0].status == 2) {
          wx.setStorageSync('auditCode', false);
          this.setData({
            butAuditText: "修改资料"
          });
        } else {
          wx.setStorageSync('auditCode', true);
          this.setData({
            butAuditText: "审核中"
          });
        }
      };
    });
  },

  // 返回首页
  returnIndex() {
    this.hideModal();
    this.hideModalFinsh();
    this.setData({
      pagehide: 0
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
      pagehide: 0
    })
    wx.navigateTo({
      url: '/pages/cunchuList/cunchuList',
    })
  },

  // 获取存货信息
  getDateOrder() {
    let data = {},
      huowList = this.data.huowList,
      huowList2 = [],
      copy = wx.getStorageSync('copyID');
    if (copy && copy.status == 0) {
      data.order_id = copy.copyID;
    }
    app._get('put_order/putOrder', data, res => {
      var packGai = res.pack;
      packGai.forEach((item, index) => {
        item.mutuoValue = ""
      });
      if (copy && copy.status == 0) {
        for (let i in res.order.goods) {
          huowList2.push({
            cargoItem: "",
            place: "",
            stairModel: "",
            levelModel: "",
            versionItemXh: "",
            versionItem: "",
            ondDun: "",
            ondJian: "",
            outerPacking: "",
            zhifang: 0, // 0 存放 1 卖掉
            cargo: true,
            place: false,
            version: false,
            showImage: false,
            showAImage: true,
            // 请选择置放方式
            putShow: true,
            putShowTwo: false,
            // 外包装
            baoz: []
          })
          console.log(huowList2);
          //复制功能
          console.log(3)
          // for (let i in res.order.goods) {
          //   for (let j in this.data.pack) {
          //     if (res.order.goods[i].pack_idss[j] != undefined) {
          //       if (res.order.goods[i].pack_idss[j].id == this.data.pack[j].id){
          //         console.log(1)
          //         let pack = {};
          //         pack.status = true;
          //         pack.pack_unit = 0;
          //         pack.pack_name = this.data.pack[j].pack_name
          //         pack.mutuoValue = res.order.goods[i].pack_idss[j].pack_nums;
          //         huowList2[i].baoz[j] = pack
          //       }else{
          //         console.log(2)
          //         let pack = {};
          //         pack.status = false;
          //         pack.pack_unit = 0;
          //         pack.pack_name = this.data.pack[j].pack_name
          //         pack.mutuoValue = 0;
          //         huowList2[i].baoz[j] = pack
          //       }
          //     }
          //   }
          // }
          if (res.order.goods[i].put_status) {
            huowList2[i].putShow = false;
            huowList2[i].putShowTwo = true;
          } else {
            huowList2[i].showAImage = true;
            huowList2[i].showImage = false;
          }
          huowList2[i].showAImage = false;
          huowList2[i].showImage = true;
          huowList2[i].cargo = false;
          huowList2[i].zhifang = res.order.goods[i].put_status;
          huowList2[i].cargoItem = res.order.goods[i].goods.goods_name //货物名称
          huowList2[i].stairModel = '' //产地
          huowList2[i].levelModel = res.order.goods[i].region.place_name //产地子集
          huowList2[i].versionItemXh = res.order.goods[i].cate.cate_name //型号
          huowList2[i].versionItem = res.order.goods[i].goods.cate_type == 0 ? '正品' : '副品'
          huowList2[i].ondDun = res.order.goods[i].weight / 1000 //吨数
          huowList2[i].ondJian = res.order.goods[i].piece //件数
          huowList2[i].cateid = res.order.goods[i].cate.id
          huowList2[i].cargoId = res.order.goods[i].goods_id
          huowList2[i].regionId = res.order.goods[i].place_id
        }
        let image_jszZ = [],
          image_jszF = [],
          image_xszZ = [],
          image_xszF = [],
          orderdata;
        orderdata = app.formatTimeTwo(res.order.put_goods_time, 'Y年M月D日') + res.order.am_and_pm;
        let comment = res.order.comment
        let currentWordNumber = parseInt(comment.length)

        this.setData({
          // huowList: huowList2,
          cate: res.cate,
          goods: res.goods,
          // pack: Object.assign({}, packGai),
          region: res.region,
          // 'huowList[0].baoz': packGai,
          order: res.order || [], //订单总数据
          sijiNameValue: res.order.driver.driver_name, //订单司机姓名
          sijiPhoneValue: res.order.driver.mobile, //订单司机联系电话
          sijiIdValue: res.order.driver.idcard, //订单身份证号
          sijiCareTyoeValue: res.order.driver.car_type, //订单司机车型号
          sijiCareMarkValue: res.order.driver.car_num, //订单司机车牌号
          currentWordValue: res.order.comment,
          image_jszZ: res.order.driver.driving_licence1,
          image_jszF: res.order.driver.driving_licence2,
          image_xszZ: res.order.driver.driving_permit1,
          image_xszF: res.order.driver.driving_permit2,
          jszZId: res.order.driver.driving_licence1_id,
          jszFId: res.order.driver.driving_licence1_id,
          xszZId: res.order.driver.driving_permit1_id,
          xszFId: res.order.driver.driving_permit2_id,
          orderData: orderdata, //到货时间
          nyr: orderdata,
          currentWordNumber: currentWordNumber,
          sxw: res.order.am_and_pm
        });
      } else {

        this.setData({
          cate: res.cate,
          goods: res.goods,
          pack: res.pack,
          region: res.region,
          huowList: huowList
        });
      }
    });
  },

  // 获取企业信息
  getDateEditUser() {
    var siteroot = siteinfo.siteroot;
    app._get('user/editUser', {}, res => {
      if (!res.data.workman_mobile) {
        wx.setStorageSync('user_enterpriseInfo', 1)
      }
      res.data[0].start_time = app.formatTimeTwo(res.data[0].start_time, 'Y/M/D')
      res.data[0].end_time = app.formatTimeTwo(res.data[0].end_time, 'Y/M/D')
      this.setData({
        editUserList: res.data[0],

      });
      // var listDta = res.data[0][0];
      if (res.data[0].company_name != "" || res.data[0].company_name != undefined) {
        let image_list, image_idZ, image_idF;
        //switch循环
        switch (res.data[0]) {
          case res.data[0].business_license_path == undefined:
            image_list = this.data.image_list;
            break;
          case res.data[0].idcard_img1_path == undefined:
            image_idZ = this.data.image_idZ;
            break;
          case res.data[0].idcard_img1_path == undefined:
            image_idF = this.data.image_idF;
            break;
          default:
            //console.log(1);
            image_list = siteroot + res.data[0].business_license_path,
              image_idZ = siteroot + res.data[0].idcard_img1_path,
              image_idF = siteroot + res.data[0].idcard_img2_path;
        }
        if (res.data[0].status == 0) {
          this.setData({
            butAuditText: "提交"
          });
        } else if (res.data[0].status == 2) {
          this.setData({
            butAuditText: "修改资料"
          });
        } else {
          this.setData({
            butAuditText: "审核中"
          });
        }
        wx.setStorageSync('auditCode', true);
        this.setData({
          qiUserfirm: res.data[0].company_name,
          qiUsername: res.data[0].truename,
          qiUserphoneOne: res.data[0].mobile1,
          qiUserphoneTwo: res.data[0].mobile2,
          qiOrder: res.data[0].address,
          qiYhzh: res.data[0].bank_card_num,
          qiZhuguanname: res.data[0].workman_name,
          qiZhuguanPhone: res.data[0].workman_mobile,
          businessId: res.data[0].business_license,
          idClaceZId: res.data[0].idcard_img1,
          offeridId: res.data[0].idcard_img2,
          image_list: image_list,
          image_idZ: image_idZ,
          image_idF: image_idF,
          userStatus: res.data[0].status
        });
        if (res.data[0].status == 0) {
          wx.setStorageSync('auditCode', false);
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this,
      date = new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      hour = date.getHours(),
      surplusMonth = _this.surplusMonth(year),
      surplusDay = _this.surplusDay(year, month, day);
    // 获取企业信息
    _this.getDateEditUser();
    _this.setData({
      multiArray: [
        [year + '年', (year + 1) + '年', (year + 2) + '年'],
        surplusMonth,
        surplusDay, ["上午", "下午"]
      ],
      year: year,
      month: month,
      day: day,
      auditCode: wx.getStorageSync('auditCode')
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
    var _this = this,
      token = wx.getStorageSync('token'),
      copyID = wx.getStorageSync('copyID')
    if (this.data.pagehide == 0) {
      this.clearUser();
      if (!token) {
        wx.showModal({
          title: '提示',
          content: '请您先登录',
          success(res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/login/login',
              });
            } else if (res.cancel) {
              wx.switchTab({
                url: '/pages/home/home',
              });
            }
          }
        });
        return false;
      } else {
        let usertype = wx.getStorageSync('user_enterpriseInfo');
        if (usertype) {
          // 获取存货信息
          _this.getDateOrder();
          this.setData({
            currect: 1
          })
        } else {
          // 获取企业信息
          _this.getDateEditUser();
        }
      }
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
      orderData: '请选择预计到货时间',
      currentWordValue: '',
      sijiNameValue: '',
      sijiPhoneValue: '',
      sijiIdValue: '',
      sijiCareTyoeValue: '',
      sijiCareMarkValue: '',
      jszZId: '',
      jszFId: '',
      xszZId: '',
      xszFId: '',
      image_jszZ: [],
      image_jszF: [],
      image_xszZ: [],
      image_xszF: [],
      nyr: '',
      sxw: '',
      huowList: [{
        cargoItem: "",
        place: "",
        stairModel: "",
        levelModel: "",
        versionItemXh: "",
        versionItem: "",
        ondDun: "",
        ondJian: "",
        outerPacking: "",
        zhifang: 0, // 0 存放 1 卖掉
        cargo: false,
        place: false,
        version: false,
        showImage: false,
        showAImage: true,
        // 请选择置放方式
        putShow: true,
        putShowTwo: false,
        // 外包装
        baoz: [],
      }],
    })
  }
})