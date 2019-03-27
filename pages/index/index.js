//index.js
//获取应用实例
let network = require('../../utils/network.js')
const app = getApp()

Page({
  data: {

  },
  getIndexData() {
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
            client:'wx'
          },
          success(res) {
            console.log(res)
          },
        })
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