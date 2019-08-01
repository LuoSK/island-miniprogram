import {
  config
} from '../config.js'

const tips = {
  1: 'Sorry,something is wrong.',
  1000: 'Parameter error.',
  1005: 'Appkey is useless.',
  1007: 'The path error.',
  3000: 'Journals is not exist.'
}
class HTTP {
  request({
    url,
    data = {},
    method = 'GET'
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }

  _request(url, resolve, reject, data = {}, method = 'GET') {


    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        "context-type": "application/json",
        "appkey": config.appkey

      },
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        this._show_error(1)
      }
    })
  }
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    console.log(error_code)
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}
export {
  HTTP
}