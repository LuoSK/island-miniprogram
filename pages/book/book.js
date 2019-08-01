import {
  BookModel
} from '../../models/book.js'
const bookModel = new BookModel()
Page({

  data: {
    books: [],
    searching: false,
    more: false
  },

  onLoad: function(options) {
    bookModel.getHotList()
      .then(res => {
        console.log(res)
        this.setData({
          books: res
        })
      })
  },
  onSearching(event) {
    this.setData({
      searching: true
    })
  },
  onCancel(event) {
    this.setData({
      searching: false
    })
  },
  onReachBottom() {
    this.setData({
      more: !this.data.more
    })
  }
})