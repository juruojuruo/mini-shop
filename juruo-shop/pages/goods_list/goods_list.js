// pages/goods_list/goods_list.js
import {
    request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            {
                id:0,
                value: "综合",
                isActive: false
            },
            {
                id:1,
                value: "销量",
                isActive: false
            },
            {
                id:2,
                value: "价格",
                isActive: false
            }
        ],
        goodsList: []
    },
    QueryParams: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.QueryParams.cid = options.cid;
        this.getGoodsList()

    },
    async getGoodsList() {
        const res = await request({url: "/goods/search", data: this.QueryParams})
        this.setData({
            goodsList: [...this.data.goodsList, ...res.goods]
        })
        wx.stopPullDownRefresh()
    },
    handleTabsItemChange(e) {
        const {index} = e.detail;
        let {tabs} = this.data;
        tabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
        this.setData({
            tabs
        })
    },
    onPullDownRefresh() {
        this.setData({
            goodsList: []
        })
        this.QueryParams.pagenum = 1
        this.getGoodsList()
    }

})
