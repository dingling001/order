// pages/my/changepass/changepass.js
let network = require('../../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    new_pass: ''
  },

  passwrod_fun(e) {
    this.setData({
      new_pass: e.detail.value
    })
  },
  savepass() {
    let that = this;
    if (this.data.new_pass == '') {
      wx.showToast({
        title: '请输入新密码',
        icon: 'none'
      })
    } else if (this.data.new_pass.length < 6) {
      wx.showToast({
        title: '密码不得少于6位',
        icon: 'none'
      })
    } else {
      wx.getStorage({
        key: 'token',
        success: function(res_token) {
          network.GET({
            url: 'wxclient/user/updatePassword',
            header: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
              "token": res_token.data
            },
            params: {
              platform: 'wx',
              password: that.data.new_pass
            },
            success(res) {
              wx.showToast({
                title: res.data.data,
              })
              setTimeout((res) => {
                wx.navigateBack({
                  delta: 1
                })
              }, 1500)
            },
          })

        },
      })
    }
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
  onShareAppMessage: function() {

  }
})
