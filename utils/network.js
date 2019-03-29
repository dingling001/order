const API_URL = 'https://api.laidanl.com/'
const imgUrl = ''

var requestHandler = {
  url: "",
  header: "",
  params: {},
  success: function(res) {
    // success
  },
  fail: function() {

  },
}

function getUrlKey(key) {
  return decodeURIComponent((new RegExp('[?|&]' + key + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}
//GET请求
function GET(requestHandler) {
  request('GET', requestHandler)
}
//POST请求
function POST(requestHandler) {
  request('POST', requestHandler)
}

function request(method, requestHandler) {
  //注意：可以对params加密等处理
  var params = requestHandler.params;
  var url = requestHandler.url;
  var header = requestHandler.header;
  wx.request({
    url: API_URL + url,
    data: params,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: header, // 设置请求的 header
    success: function(res) {
      //注意：可以对参数解密等处理
      // console.log(res.data.code)
      if (res.data.code == 200) {
        requestHandler.success(res)
      } else if (res.data.code == 401) {
        wx.showToast({
          title: '登录已失效，点击登录！',
          icon: 'none'
        })
        wx.removeStorage({
          key: 'token',
          success(res) {
            console.log(res.data)
          }
        })
        wx.redirectTo({
          url: '/pages/login/login',
        })
      } else if (res.data.code == 500) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        requestHandler.success(res)
      }
    },
    fail: function(err) {
      wx.showToast({
        title: '网络延迟，稍后再试',
        icon: 'none'
      })
    },
    complete: function() {
      // complete
    }
  })
}

module.exports = {
  GET: GET,
  POST: POST,
  getUrlKey: getUrlKey,
  imgUrl: imgUrl,
}