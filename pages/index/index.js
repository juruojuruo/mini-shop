import {
  request
} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    catesList: [],
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCateList();
    this.getSwiperList();
    this.getFloorList()
  },
  //或者轮播图
  getSwiperList() {
    request({
      url: "/home/swiperdata"
    }).then(result => {
      this.setData({
        swiperList: result
      })
    })
  },
  //或者导航栏
  getCateList() {
    request({
      url: "/home/catitems"
    }).then(result => {
      this.setData({
        catesList: result
      })
    })
  },
  //楼层
  getFloorList() {
    request({
      url: "/home/floordata"
    }).then(result => {
      this.setData({
        floorList: result
      })
    })
  }
})