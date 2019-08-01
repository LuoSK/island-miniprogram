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
  request(params) {
    if (!params.method) {
      params.method = "GET"
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        "context-type": "application/json",
        "appkey": config.appkey

      },
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          params.success && params.success(res.data)
        } else {
          let error_code = res.data.error_code
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