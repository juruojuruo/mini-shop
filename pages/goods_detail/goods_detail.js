import {
    request
} from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodData: {}
    },
    GoodsInfo: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const {goods_id} = options
        this.getGoodsDetail(goods_id)
        
    },
    async getGoodsDetail(goods_id) {
        const res = await request({url: "/goods/detail",data: {goods_id}})
        this.GoodsInfo = res
        this.setData({
            goodData: {
                goods_name: res.goods_name,
                goods_price: res.goods_price,
                
                goods_introduce: res.goods_introduce.replace(/\.webp/g,'.jpb'),
                pics: res.pics
            }
            
        })
    },
    handlePreviewImage(e) {
        const urls = this.GoodsInfo.pics.map(v => v.pics_mid)
        const current = e.currentTarget.dataset.url
    wx.previewImage({
        current,
        urls,
    })
    },
    handleCartAdd() {
        let cart = wx.getStorageSync("cart") || [];
        let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
        if (index === -1) {
            this.GoodsInfo.num = 1
            this.GoodsInfo.checked = true
            cart.push(this.GoodsInfo)
        } else {
            cart[index].num++
            console.log( cart[index].num)
        }
        wx.setStorageSync('cart', cart)
        wx.showToast({
            title: '已经加入购物车',
            icon: 'success',
            // true 防止用户 手抖 疯狂点击按钮
            mask: true
        })
        
    }
    
})
