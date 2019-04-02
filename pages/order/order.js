// pages/order/order.js
let network = require('../../utils/network.js')
const app = getApp()

Page({
  data: {
    tab:0,
    size:10,
    records:[]
  },
  order_tab(e){
    var that = this;
    if (this.data.tab === e.target.dataset.tab) {
      return false;
    } else {
      that.setData({
        tab: e.target.dataset.tab
      })
    }
    this.getOrderList(this.data.tab)
  },
  getOrderList(orderStatus){
    wx.showLoading({
      title: '加载中……',
    })
    let that = this;
    wx.getStorage({
      key: 'token',
      success: function (res_token) {
        network.GET({
          url: 'wxclient/order/getOrderList',
          header: {
            "Content-Type": "application/json;charset=UTF-8",
            "token": res_token.data
          },
          params: {
            platform: 'wx',
            current:0,
            size:that.data.size,
            orderStatus: orderStatus
          },
          success(res) {
            that.setData({
              records: res.data.data.records
            })
          },
        })
      },
    })
    wx.hideLoading()
  },

  onLoad: function (options) {
    this.getOrderList(0)
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

  }
})
