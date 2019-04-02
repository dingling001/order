// pages/my/my.js
let network = require('../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myinfo: []
  },
  geMyData() {
    let that = this;
    wx.getStorage({
      key: 'token',
      success: (res_token) => {
        network.GET({
          url: 'wxclient/shop/userCenter',
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            'token': res_token.data
          },
          params: {},
          success(res) {
            console.log(res)
            that.setData({
              myinfo: res.data.data
            })
          },
        })
      },
    })

  },
  loginout() {
    let that = this;
    wx.getStorage({
      key: 'token',
      success: function(res_token) {
        network.GET({
          url: 'wxclient/user/logout',
          header: {
            "Content-Type": "application/json;charset=UTF-8",
            "token": res_token.data
          },
          params: {
            platform: 'wx',
          },
          success(res) {
            wx.removeStorage({
              key: 'token',
              success: function() {
                wx.reLaunch({
                  url: '../login/login',
                })
              },
            })
          },
        })
      },
    })
  },
  call_managePhone(e) {
    let phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  call_shopPhone(e) {
    let phone = e.currentTarget.dataset.phone;
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  onLoad: function(options) {
    this.geMyData()
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
    this.geMyData()
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