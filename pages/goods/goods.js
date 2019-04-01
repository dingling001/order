// pages/goods/goods.js
let network = require('../../utils/network.js');
var page = 0;
var limit = 10;
var name = '';
var secondaryCategory = '';
var loadMore = function(that) {
  var that = this;
  wx.showLoading({
    title: '加载中……',
  })
  wx.getStorage({
    key: 'token',
    success: function(res_token) {
      network.GET({
        url: 'wxclient/commodity/commodityList',
        header: {
          "Content-Type": "application/json;charset=UTF-8",
          "token": res_token.data
        },
        params: {
          paltform: 'wx',
          page: page,
          limit: limit,
          name: name,
          secondaryCategory: secondaryCategory
        },
        success(res) {
          let goodsList = res.data.data.records;
          for (let i in goodsList) {
            goodsList[i].picture = goodsList[i].picture.split(',')[0]
          }
          for (var i = 0; i < res.data.data.records.length; i++) {
            goodsList.push(res.data.data.records[i]);
          }
          that.setData({
            goodsList: goodsList
          })
          page++;
          wx.hideLoading()
        },
      })
    },
  })
}

Page({
  data: {
    palt: [],
    palt_name: '线上平台菜单导入',
    palt_list: [],
    index: 0,
    goodsList: [],
    gategory: [],
    gindex: 0,
    limit: 10,
    scrollTop: 0,
    scrollHeight: 0
  },

  palt_fun(e) {
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.palt_list[e.detail.value])
    this.importCategory(this.data.palt_list[e.detail.value].code)
    // this.getGoodsList(this.data.palt[e.detail.value], '')
  },

  get_platform() {
    let that = this;
    wx.getStorage({
      key: 'token',
      success: function(res_token) {
        network.GET({
          url: 'wxclient/platform/list',
          header: {
            "Content-Type": "application/json;charset=UTF-8",
            "token": res_token.data
          },
          params: {
            paltform: 'wx',
          },
          success(res) {
            let palt = [];
            for (let i in res.data.data) {
              palt.push(res.data.data[i].name)
            }
            that.setData({
              palt: palt,
              palt_list: res.data.data
            })
          },
        })
      },
    })
  },
  // getGoodsList(name = '', secondaryCategory = '') {
  //   let that = this;
  //   wx.showLoading({
  //     title: '加载中……',
  //   })
  //   wx.getStorage({
  //     key: 'token',
  //     success: function(res_token) {
  //       network.GET({
  //         url: 'wxclient/commodity/commodityList',
  //         header: {
  //           "Content-Type": "application/json;charset=UTF-8",
  //           "token": res_token.data
  //         },
  //         params: {
  //           paltform: 'wx',
  //           limit: that.data.limit,
  //           name: name,
  //           secondaryCategory: secondaryCategory
  //         },
  //         success(res) {
  //           let goodsList = res.data.data.records;
  //           for (let i in goodsList) {
  //             goodsList[i].picture = goodsList[i].picture.split(',')[0]
  //           }
  //           that.setData({
  //             goodsList: res.data.data.records
  //           })

  //           wx.hideLoading()
  //         },
  //       })
  //     },
  //   })
  // },
  // 输入价格
  supply_fn(e) {
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.id;
    let goodsList = this.data.goodsList;
    let supplyPrice = e.detail.value;
    for (let i in goodsList) {
      if (id == goodsList[i].id) {
        goodsList[i].supplyPrice = supplyPrice;
        this.setData({
          goodsList: goodsList
        })
      }
    }
  },
  // 上传价格
  commoditySave(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    let categoryName = that.data.goodsList[index].categoryName;
    let id = that.data.goodsList[index].id;
    let name = that.data.goodsList[index].name;
    let picture = that.data.goodsList[index].picture;
    let platformCode = that.data.goodsList[index].platformCode;
    let secondaryCategoryName = that.data.goodsList[index].secondaryCategoryName;
    let skuCode = that.data.goodsList[index].skuCode;
    let skuid = that.data.goodsList[index].skuid;
    let spec = that.data.goodsList[index].spec;
    let supplyPrice = that.data.goodsList[index].supplyPrice;
    let unit = that.data.goodsList[index].unit;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.POST({
          url: 'wxclient/commodity/commoditySave',
          header: {
            "Content-Type": "application/json;charset=UTF-8",
            "token": res_token.data
          },
          params: {
            paltform: 'wx',
            categoryName,
            id,
            name,
            picture,
            platformCode,
            secondaryCategoryName,
            skuCode,
            skuid,
            spec,
            supplyPrice,
            unit,
          },
          success(res) {
            console.log(res)
          },
        })
      },
    })

  },
  left_nav(e) {
    let gindex = e.currentTarget.dataset.index;
    this.setData({
      gindex: gindex
    })
    // this.getGoodsList(this.data.gategory[gindex].name)
  },
  // 获取分类
  getCategoryVo() {
    let that = this;
    wx.getStorage({
      key: 'token',
      success: function(res_token) {
        network.GET({
          url: 'wxclient/category/getCategoryVo',
          header: {
            "Content-Type": "application/json;charset=UTF-8",
            "token": res_token.data
          },
          params: {
            paltform: 'wx',
          },
          success(res) {
            // that.getGoodsList(res.data.data[0].name)
            that.setData({
              gategory: res.data.data
            })
          },
        })
      },
    })
  },
  // 根据平台导入分类数据
  importCategory(platformCode) {
    let that = this;
    wx.getStorage({
      key: 'token',
      success: function(res_token) {
        network.GET({
          url: 'wxclient/category/importCategory',
          header: {
            "Content-Type": "application/json;charset=UTF-8",
            "token": res_token.data
          },
          params: {
            paltform: 'wx',
            platformCode: platformCode
          },
          success(res) {
            // that.getGoodsList(res.data.data[0].name)
            that.setData({
              gategory: res.data.data
            })
          },
        })
      },
    })
  },
  onLoad: function(options) {
    this.get_platform();
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

    this.getCategoryVo();
    loadMore(that);
  },

  bindDownLoad: function() {
    var that = this;
    loadMore(that);
    console.log("lower");
  },
  scroll: function(event) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  topLoad: function(event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    loadMore(this);
    console.log("lower");
  },
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})