<!--
 * @Author: your name
 * @Date: 2020-06-04 22:03:54
 * @LastEditTime: 2020-06-20 18:33:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\pages\home\home-category\index.vue
--> 
<template>
  <view class="category">
    <navigator class="img" v-for="item in category" :key="item.id" :url="`/pages/imgCategory/index?id=${item.id}`">
      <image :src="item.cover" mode="aspectFill"></image>
      <div class="imgName">{{item.name}}</div>
    </navigator>
  </view>
</template>

<script>
export default {
  data() {
    return {
      category: []
    };
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: "分类"
    });
    this.getCategory();
  },
  methods: {
    async getCategory() {
      const res = await uni.request({
        url: "http://157.122.54.189:9088/image/v1/vertical/category"
      });
      console.log("分类", res[1].data.res.category);
      this.category = res[1].data.res.category;
    }
  }
};
</script>

<style lang='scss' scoped>
.category {
  display: flex;
  flex-wrap: wrap;
  padding: 5rpx;
  .img {
    position: relative;
    width: 33%;
    border: 3rpx solid #fff;
    image {
      height: 250rpx;
    }
  
    .imgName {
      position: absolute;
      bottom: 5rpx;
      left: 10rpx;
      font-size: 34rpx;
      color: #fff;
      background-image: linear-gradient(to right top, rgba(0,0,0,.2),rgba(0,0,0,0));
    }
  }
}

</style>
