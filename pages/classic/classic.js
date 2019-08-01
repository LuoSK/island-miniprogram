import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()
Page({
  data: {
    classicData: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },
  onLike: function(event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classicData.id, this.data.classicData.type)
  }, 


  onPrevious: function(event) {
    this._updateClassic('previous')
  },


  onNext: function(event) {
    this._updateClassic('next')
  },


  onLoad: function(options) {

    classicModel.getLatest((res) => {
      console.log(res)
      this.setData({
        classicData: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },


  _updateClassic: function(direction) {
    let index = this.data.classicData.index
    classicModel.getClassic(index, direction, (res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classicData: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  _getLikeStatus: function(artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  }
})