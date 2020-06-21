<!--
 * @Author: your name
 * @Date: 2020-06-21 12:04:18
 * @LastEditTime: 2020-06-21 13:01:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\pages\videoPlay\index.vue
--> 
<template>
  <view>
    <image :src="video.img" class="bgImg"></image>
    <view class="menu">
      <view class="iconfont iconjingyin" @click="handleMute"></view>
      <view class="iconfont iconzhuanfa"><button open-type="share" class="share"></button></view>
    </view>
    <view class="video">
      <video :src="video.video" objectFit="fill" :muted="isMuted"></video>
    </view>
    <view class="download" @click="downloadVideo">下载高清</view>
  </view>
</template>

<script>
export default {
  onLoad() {
    console.log(getApp().globalData.video)
    this.video = getApp().globalData.video
  },
  data(){
      return{
          video: {},
          isMuted: false
      }
  },
  methods: {
      handleMute() {
          this.isMuted = !this.isMuted
      },
      async downloadVideo(){
          await uni.showLoading({title: '下载中'})
          const { tempFilePath } = (await uni.downloadFile({ url: this.video.video }))[1]
          await uni.saveVideoToPhotosAlbum({
              filePath: tempFilePath
          })
          uni.hideLoading()
          await uni.showToast({title: '下载成功'})
      }
  }
};
</script>

<style lang='scss' scoped>
.bgImg {
    position: absolute;
    height: 100vh;
    width: 100vw;
    filter: blur(20px);
    z-index: -1;
}
.menu {
  display: flex;
  justify-content: flex-end;
  .iconfont {
    height: 80rpx;
    width: 80rpx;
    border-radius: 50%;
    margin: 10rpx 10rpx 0 0;
    font-size: 50rpx;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.iconzhuanfa {
    position: relative;
    .share {
      position: absolute;
      right: 0;
      bottom: 0;
      height: 80rpx;
      width: 80rpx;
      opacity: 0;
    }
}
.video {
  display: flex;
  justify-content: center;
  video {
    height: 600rpx;
    width: 360rpx;
  }
}

.download {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 360rpx;
  height: 100rpx;
  border: 1rpx solid #fff;
  color: #fff;
  font-size: 34rpx;
  border-radius: 50rpx;
  background-color: rgba(0, 0, 0, 0.2);
  margin: 20rpx auto 0 auto;
}
</style>
