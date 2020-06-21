<!--
 * @Author: your name
 * @Date: 2020-06-20 23:37:49
 * @LastEditTime: 2020-06-21 11:34:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\pages\video\video-main\index.vue
--> 
<template>
  <scroll-view scroll-y enable-flex class="video_main"  @scrolltolower="handleScrollToLower"> 
      <view class="video_item" v-for="item in content" :key="item.id" @click="goVideo(item)">
          <image :src="item.img" mode="aspectFill"></image>
      <view>
  </scroll-view>
</template>

<script>
export default {
  props: ["urlobj"],
  data() {
    return {
        content: [],
        hasMore: true
    };
  },
  mounted() {
    this.getVideoList();
  },
  watch: {
    urlobj() {
      this.getVideoList()
      this.content = []
    }
  },
  methods: {
    goVideo(item){
        getApp().globalData.video = item
        uni.navigateTo({
            url: '/pages/videoPlay/index'
        })
    },
    handleScrollToLower() {
        if(this.hasMore) {
            console.log('到底要翻页')
            this.urlobj.params.skip+=this.urlobj.params.limit
            this.getVideoList()
        } else {
          uni.showToast({
            title: '到底了宝贝儿:)',
            icon: 'none'
          })
        }
    },
    async getVideoList() {
      const res = await this.request({
        url: this.urlobj.url,
        data: this.urlobj.params
      })
      console.log(res.res.videowp)
      this.content = [...this.content, ...res.res.videowp]
      if(res.res.videowp.length === 0) {
         uni.showToast({
            title: '到底了宝贝儿:)',
            icon: 'none'
          })
          this.hasMore = false
          return
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.video_main {
height: calc(100vh - 36px);
display: flex;
flex-wrap: wrap;
  .video_item {
    width: 33.3%;
    border: 3rpx solid #fff;
    height: 500rpx;
  }
}
</style>