// pages/goods/goods.js
let network = require('../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    palt: ['饿了么', '美团外卖', '京东到家'],
    palt_name: '线上平台菜单导入',
    index:-1,
    goodsList:[{
      "categoryName": "测试",
      "id": 0,
      "name": "",
      "picture": "",
      "platformCode": "",
      "secondaryCategoryName": "",
      "skuCode": "",
      "skuid": 0,
      "spec": "",
      "supplyPrice": 0,
      "unit": ""
	}
    ],
    gategory:[{

    }],
    gindex:0
  },
  palt_fun(e) {
    console.log(e)
    this.setData({
      index: e.detail.value
    })
  },
  getGoodsList(){
    let that=this;
    wx.getStorage({
      key: 'token',
      success: function (res_token) {
        network.GET({
          url: 'wxclient/commodity/commodityList',
          header: {
            "Content-Type": "application/json;charset=UTF-8",
            "token": res_token.data
          },
          params: {
            client: 'wx',
            name:'',
            econdaryCategory:''
          },
          success(res) {
            console.log(res)
           if(res.data.code==200){
             that.setData({
               goodsList: res.data.data
             })
           }
          },
        })
      },
    })
  },
  // 获取分类
  getCategoryVo(){
    let that = this;
    wx.getStorage({
      key: 'token',
      success: function (res_token) {
        network.GET({
          url: 'wxclient/category/getCategoryVo',
          header: {
            "Content-Type": "application/json;charset=UTF-8",
            "token": res_token.data
          },
          params: {
            client: 'wx',
          },
          success(res) {
            console.log(res)
          },
        })
      },
    })
  },
  onLoad: function(options) {
    this.getGoodsList();
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