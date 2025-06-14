import dayjs from "dayjs"
import { computed, onUnmounted, ref } from "vue"

export const useCountDown = () => {
  const time = ref(null)
  const timer = null
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  const start = (currentTime) => {
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }
  onUnmounted(() => {
    timer && clearInterval(timer)
  })

  return {
    formatTime,
    start
  }
}
