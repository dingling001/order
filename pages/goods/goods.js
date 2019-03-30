// pages/goods/goods.js
let network = require('../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    palt: [],
    palt_name: '线上平台菜单导入',
    palt_list: [],
    index: 0,
    goodsList: [],
    gategory: [],
    gindex: 0
  },
  palt_fun(e) {
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.palt_list[e.detail.value])
    this.importCategory(this.data.palt_list[e.detail.value].code)
    this.getGoodsList(this.data.palt[e.detail.value], '')
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
  getGoodsList(name = '', secondaryCategory = '') {
    let that = this;
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
            name: name,
            secondaryCategory: secondaryCategory
          },
          success(res) {
            let goodsList = res.data.data;
            for (let i in goodsList) {
              goodsList[i].picture = goodsList[i].picture.split(',')[0]
            }
            that.setData({
              goodsList: res.data.data
            })

            wx.hideLoading()
          },
        })
      },
    })
  },
  left_nav(e) {
    console.log(e)
    let gindex = e.currentTarget.dataset.index;
    this.setData({
      gindex: gindex
    })
    this.getGoodsList(this.data.gategory[gindex].name)
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
            that.getGoodsList(res.data.data[0].name)
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
            that.getGoodsList(res.data.data[0].name)
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
    this.getCategoryVo();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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