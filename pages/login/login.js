// pages/login/login.js
let network = require('../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 60,
    msg: '获取验证码',
    cansend: true,
    phone: '',
    code: '',
    loginType: 2
  },
  timer: function() {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              alreadySend: false,
              send: true
            })
            resolve(setTimer)
          }
        }, 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },
  // 登录
  onGotUserInfo(e) {
    let that = this;
    if (e.detail.userInfo) {
      if (!(/^1[3456789]\d{9}$/.test(that.data.phone))) {
        wx.showToast({
          title: '输入手机号有误',
          icon: 'none',
          duration: 2000
        })
      } else if (that.data.code == '') {
        wx.showToast({
          title: '请输入验证码',
          icon: 'none',
          duration: 2000
        })
      } else {
        network.POST({
          url: '/wxclient/user/login',
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          params: {
            phone: that.data.phone,
            code: that.data.code,
            loginType: that.data.loginType,
          },
          success(res) {
            if (res.data.code == 200) {
              wx.showToast({
                title: '登录成功',
              })
              wx.setStorage({
                key: 'token',
                data: res,
                success() {
                  wx.switchTab({
                    url: '../index/index',
                  })
                }
              })
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }
          },
        })
      }
    }

  },
  phone_fun(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  code_fun(e) {
    this.setData({
      code: e.detail.value
    })
  },
  // 发送验证码
  getCode() {
    let that = this
    // 手机号码格式验证
    if (!(/^1[3456789]\d{9}$/.test(that.data.phone))) {
      wx.showToast({
        title: '输入手机号有误',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (that.data.msg !== '获取验证码') {
      return
    }
    const countDown = setInterval(() => {
      if (that.data.count <= 0) {
        that.setData({
          count: 60,
          cansend: true,
          msg: '获取验证码'
        })
        clearInterval(countDown)
        return
      }
      that.data.count--
        that.setData({
          count: that.data.count,
          cansend: false,
          msg: that.data.count < 10 ? `请等待0${that.data.count}s` : `请等待${that.data.count}s`
        })
    }, 1000);
    network.GET({
      url: 'wxclient/user/sendCode',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      params: {
        phone: that.data.phone
      },
      success(res) {
        if (res.data.code == 200) {
          wx.showToast({
            title: '发送成功',
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      },
    })

  },


  onLoad: function(options) {
    wx.getStorage({
      key: 'token',
      success: function(res) {
        wx.switchTab({
          url: '../index/index',
        })
      },
    })
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