import {
    request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftMenuList: [],
        rightContent: [],
        currentIndex: 0,
        scrollTop: 0
    },
    Cates: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const Cates = wx.getStorageSync("cates")
        if (!Cates) {
            this.getCates()
        } else {
            if (Date.now() - Cates.time > 1000 * 10) {
                this.getCates()
            } else {
                this.Cates = Cates.data
                let leftMenuList = this.Cates.map(v => v.cat_name)
                let rightContent = this.Cates[0].children
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }

    },
   async getCates() {
        const result = await request({
            url: "/categories"
        })
        this.Cates = result
        wx.setStorageSync('cates', {
            time: Date.now(),
            data: this.Cates
        })
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
            leftMenuList,
            rightContent
        })
    },
    handleItemTap(e) {
        const {
            index
        } = e.currentTarget.dataset;
        let rightContent = this.Cates[index].children
        this.setData({
            currentIndex: index,
            rightContent,
            scrollTop: 0
        })


    }


})