import {
  BookModel
} from '../../models/book.js'
const bookModel = new BookModel()
import {
  LikeModel
} from '../../models/like.js'
let likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading()
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)
    Promise.all([detail, comments, likeStatus])
      .then(res => {
        this.setData({
          book: res[0],
          comments: res[1].comments,
          likeStatus: res[2].like_status,
          likeCount: res[2].fav_nums
        })
        wx.hideLoading()
      })

  },

  onLike(event) {
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  onCancel(event) {
    this.setData({
      posting: false
    })
  },
  onPost(event) {
    const comment = event.detail.text || event.detail.value
    if (!comment) {
      return
    }
    console.log(comment)
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    bookModel.postComment(this.data.book.id, comment)
      .then(res => {
        wx.showToast({
          title: '+ 1',
          icon: 'none'
        })
        this.data.comments.unshift({
          content: comment,
          nums: 1
        })
        this.setData({
          comments: this.data.comments,
          posting: false
        })
      })
  },
  onFakePost(event) {
    this.setData({
      posting: true
    })
  }
})