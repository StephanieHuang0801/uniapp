<!--
 * @Author: your name
 * @Date: 2020-06-14 20:59:43
 * @LastEditTime: 2020-06-14 21:23:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\dist\dev\mp-weixin\components\swipeAction.vue
--> 
<template>
  <view @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      //按下的时间
      startTime: 0,
      startX: 0,
      startY: 0
    };
  },
  methods: {
    handleTouchStart(event) {
        this.startTime = Date.now()
        this.startX = event.changedTouches[0].clientX 
        this.startY = event.changedTouches[0].clientY 
    },
    handleTouchEnd(event) {
        const endTime = Date.now()
        const endX = event.changedTouches[0].clientX
        const endY = event.changedTouches[0].clientY
        if (endTime - this.startTime > 2000) {
            return
        }
        let direction = ''
        if (Math.abs(endX - this.startX) > 10) {
            direction = endX -this.startX > 0 ? 'right': 'left'
        } else {
            return
        }
        this.$emit('swipeAction', {direction})
    }
  }
};
</script>

<style lang='scss' scoped>
</style>