<!--
 * @Author: your name
 * @Date: 2020-06-04 22:04:42
 * @LastEditTime: 2020-06-09 21:29:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\pages\home\home-album\index.vue
--> 
<template>
  <view>
    <!-- 轮播图开始 -->
    <view class="album_swiper">
      <swiper indicator-dots autoplay circular> 
        <swiper-item v-for="item in banner" :key="item.id"> 
          <image :src="item.thumb" mode="widthFix"></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 轮播图结束 -->
  </view>
</template>

<script>
export default {
  mounted() {
    this.request({
      url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
      data: {
        limit: 30,
        order: "new",
        skip: 0
      }
    }).then(res => {
      console.log(res)
      this.banner = res.res.banner
      this.album = res.res.album
    });
  },
  data() {
    return {
      // 轮播图列表
      banner: [],
      // 专辑列表
      album: []
    }
  }
};
</script>

<style lang='scss'>
.album_swiper {
  swiper {
    height: calc(750rpx / (640/284));
    siwper-item {
      display: flex;
      justify-content: center;
      align-items: center;
      image {
        height: 100%;
      }
    }
  }
}
</style>
