// pages/login/login.js
let network = require('../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnValue: '获取验证码',
    btnDisabled: false,
    phone: '',
    code: '',
    second: 60
  },
  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          var second = this.data.second - 1;
          this.setData({
            second: second,
            btnValue: second + '秒',
            btnDisabled: true
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              btnValue: '获取验证码',
              btnDisabled: false
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  onGotUserInfo(e) {
    if(e.detail)
    wx.switchTab({
      url: '../index/index',
    })
  },
  phone_fun(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 发送验证码
  getCode() {
    let phoen_reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    this.timer()
    // /wxclient/user / sendCode
  },
  // 登录
  login_fun(e) {
    // /wxclient/user / login
  },
  onLoad: function(options) {

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
  // onShareAppMessage: function() {

  // }
})