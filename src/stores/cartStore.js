import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useUserStore } from "./user";
import { insertCartAPI, getCartListAPI, delCartAPI, mergeCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)

  const cartList = ref([])
  const updateNewList = async () => {
    const res = await getCartListAPI()
    cartList.value = res.result
  }
  const addCart = async (goods) => {
    console.log('添加', goods);
    const { skuId, count } = goods
    if (isLogin.value) {
      await insertCartAPI({ skuId, count })
      updateNewList()
    } else {
      const item = cartList.value.find((item) => item.skuId === goods.skuId)

      if (item) {
        item.count += goods.count
      } else {
        cartList.value.push(goods)
      }
    }
  }
  const delCart = async (skuId) => {
    if (isLogin.value) {
      await delCartAPI([skuId])
      updateNewList()
    } else {
      const cartIndex = cartList.value.findIndex((item) => item.skuId === skuId)
      cartList.value.splice(cartIndex, 1)
    }
  }
  const clearCart = () => {
    cartList.value = []
  }
  const singleCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }
  const allCheck = (selected) => {
    cartList.value.forEach((item) => item.selected = selected)
  }

  const totalCpunt = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  const totalPrice = computed(() => cartList.value.reduce((a, c) => a + c.price * c.count, 0))

  const selectCount = computed(() => cartList.value.filter(item => item.selected === true).reduce((a, c) => a + c.count, 0))
  const selectPrice = computed(() => cartList.value.filter(item => item.selected === true).reduce((a, c) => a + c.price * c.count, 0))

  const isAll = computed(() => cartList.value.every((item) => item.selected))



  return {
    cartList,
    totalCpunt,
    totalPrice,
    isAll,
    selectCount,
    selectPrice,
    singleCheck,
    addCart,
    delCart,
    allCheck,
    clearCart,
    updateNewList,
  }
}, {
  persist: true
})
