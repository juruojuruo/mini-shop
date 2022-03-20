// pages/cart/cart.js
import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast,
} from '../../utils/asyncWx.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
//收货地址
    address: {},
    //购物车
    cart: [],
    // 全选状态
    allChecked: true,
    //总价
    totalPrice: 0,
    //总数量
    totalNum: 0
  },
  onShow() {
    const address =wx.getStorageSync("address")
    const cart =wx.getStorageSync("cart") || []
    this.setData({address})
    this.setCart(cart)
  },
  
    async handleChooseAddress() {
      try {
        const scope = await getSetting()
        if (scope === false) {
          await openSetting();
        }
        let address = await chooseAddress();
        address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
        wx.setStorageSync('address', address)
      } catch (err) {
        console.log(err);
      }
    },
  handleItemChange(e) {
    const goods_id=e.currentTarget.dataset.id
    let {cart} = this.data
    let index = cart.findIndex(value => value.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  setCart(cart) {
    let allChecked = true
    let totalPrice= 0
    let totalNum = 0
    cart.forEach(v => {
      if(v.checked) {
        totalPrice +=v.num * v.goods_price
        totalNum += v.num
      }else {
        allChecked = false
      }
    })
    allChecked = cart.length !=0 ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync("cart", cart)
  },
  handleItemAllChange() {
    let {cart, allChecked} = this.data
    allChecked = !allChecked
    cart.forEach(value => value.checked = allChecked)
    this.setCart(cart)
  },
  async numChange(e) {
    const {operation, id} = e.currentTarget.dataset
    let {cart} = this.data
    const index = cart.findIndex(v =>v.goods_id===id)
    if(cart[index].num === 1 && operation === -1) {
      const res = await showModal({ content: '您是否要删除?',})
      if(res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
      }
    }else {
      cart[index].num += operation
      this.setCart(cart)
    }
  },
  async allPlay() {
    const {totalNum, address} =this.data
    if(!address.username) {
      wx.switchTab({
        url: 'pages/pay/pay'
      })
      // await showToast('未填联系方式')
    }else if(totalNum === 0) {
      await showToast('未选购商品')
    }else {
      wx.navigateTo({
        url: 'pages/pay/pay'
      })
    }
  }
})
