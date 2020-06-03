<!--
 * @Author: your name
 * @Date: 2020-06-03 20:46:51
 * @LastEditTime: 2020-06-03 22:13:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\components\img.vue
--> 
<template>
    <view>
        <view>{{mytitle}}</view>
        <image class="yuyan" :src="mysrc" @click="showMessage"></image>
        <slot></slot>
    </view>
</template>
<script>
export default {
     props:['mysrc', 'mytitle'],
     methods: {
         showMessage() {
             this.$emit('indexEHandle', this.mytitle)
         }
     }
}
</script>
<style lang="scss">
.yuyan {
  border-radius: 50%;
  width: 50vw;
  height: 50vw;
}

</style>