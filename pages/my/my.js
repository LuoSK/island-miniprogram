import {
  BookModel
} from '../../models/book.js'
import {
  ClassicModel
} from '../../models/classic.js'
const classicModel = new ClassicModel()
const bookModel = new BookModel()
Page({


  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  onLoad: function(options) {
    this.userAuthorized()
    this.getMyBookCount()
    this.getMyFavor()
  },
  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },
  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.count
        })
      })
  },
  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo(event) {

    const userInfo = event.detail.userInfo

    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        authorized: true
      })

    }

  },
  onAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  }
})