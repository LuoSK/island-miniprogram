import {
  KeywordModel
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'
import {
  paginationBev
} from '../behaviors/pagination.js'
const bookModel = new BookModel()
const keywordModel = new KeywordModel()
Component({
  behaviors: [paginationBev],
  properties: {
    more: {
      type: Number,
      observer: 'loadMore'
    }
  },

  attached: function() {
    const hotWords = keywordModel.getHot()
    this.setData({
      historyWords: keywordModel.getHistory()
    })
    hotWords.then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    q: '',
  
    loadingCenter: false
  },


  methods: {
    onCancel(event) {
      this.triggerEvent('cancel', {}, {})
      this.initialize()
    },

    onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      this.initialize()
      const q = event.detail.value || event.detail.text
      this.setData({
        q
      })
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },

    onClear(event) {
      this._closeResult()
      this.initialize()
    },
    loadMore() {


      if (this.isLocked() || !this.data.q) {
        return
      }

      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q)
          .then(res => {
            this.setMoreData(res.books)
            this.unLocked()
          }, () => {
            this.unLocked()
          })
      }
    },
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
    
    _showResult() {
      this.setData({
        searching: true
      })
    },
    _closeResult() {
      this.setData({
        searching: false,
        q: '',
        noneResult: false,
        loadingCenter: false,
        loading: false
      })
    }
  }
})