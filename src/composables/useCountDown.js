import dayjs from "dayjs"
import { computed, ref } from "vue"

export const useCountDown = () => {
  const time = ref(null)
  let timer = null
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  const start = (currentTime) => {
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }
  // 返回一个清理函数，由调用者来执行
  const stop = () => {
    timer && clearInterval(timer)
  }

  return {
    formatTime,
    start,
    stop
  }
}
