//index.js
//获取应用实例
let network = require('../../utils/network.js')
const app = getApp()

Page({
  data: {
    list: [],
    orderCount: 0,
    orderSum: 0
  },
  getIndexData() {
    wx.showLoading({
      title: '加载中……',
    })
    let that = this;
    wx.getStorage({
      key: 'token',
      success: function(res_token) {
        network.GET({
          url: 'wxclient/order/getOrders',
          header: {
            "Content-Type": "application/json;charset=UTF-8",
            "token": res_token.data
          },
          params: {
            platform: 'wx'
          },
          success(res) {
            that.setData({
              orderCount: res.data.data.orderCount,
              orderSum: res.data.data.orderSum,
              list: res.data.data.list,
            })
          },
        })
      },
    })
    wx.hideLoading()
  },
  onLoad: function() {
    this.getIndexData()
  },
  onShow: function() {
    this.getIndexData()
  }
})
