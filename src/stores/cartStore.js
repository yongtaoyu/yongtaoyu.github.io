import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const addCart = (goods) => {
    console.log('添加', goods);
    const item = cartList.value.find((item) => item.skuId === goods.skuId)

    if (item) {
      item.count += goods.count
    } else {
      cartList.value.push(goods)
    }
  }
  const delCart = (skuId) => {
    const cartIndex = cartList.value.findIndex((item) => item.skuId === skuId)
    cartList.value.splice(cartIndex, 1)
  }
  const totalCpunt = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  const totalPrice = computed(() => cartList.value.reduce((a, c) => a + c.price * c.count, 0))



  return {
    cartList,
    addCart,
    delCart,
    totalCpunt,
    totalPrice,
  }
})
