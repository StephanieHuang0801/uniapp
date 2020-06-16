<!--
 * @Author: your name
 * @Date: 2020-06-14 12:35:42
 * @LastEditTime: 2020-06-14 15:59:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\components\goDetail.vue
--> 
<template>
  <view @click="clickHotImg" class="goDetail"> 
    <slot></slot>
  </view>
</template>

<script>
export default {
  props:['list', 'index'],
  methods:{
    clickHotImg() {
      getApp().globalData.imgList = this.list
      getApp().globalData.imgIndex = this.index
      uni.navigateTo({
        url: '../../pages/imgDetail/index'
      })
    }
  }

};
</script>

<style lang='scss' scoped>
.goDetail {
  width: 100%;
}
</style>