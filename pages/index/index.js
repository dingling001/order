//index.js
//获取应用实例
let network = require('../../utils/network.js')
const app = getApp()

Page({
  data: {

  },
  getIndexData() {
    network.GET({
      url: 'wxclient/order/getOrders',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      params: {},
      success(res) {
        console.log(res)
      },
    })
  },
  onLoad: function() {
    this.getIndexData()
  },
  onShow: function() {
    this.getIndexData()
  }
})