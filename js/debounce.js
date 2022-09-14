/** 执行最后一次cb，规定时间内多次触发，清空之前计时，重新计时 */
function debounce(cb, wait) {
    var timer = null
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => cb(...args), wait)
    }
}