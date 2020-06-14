<!--
 * @Author: your name
 * @Date: 2020-06-04 22:04:42
 * @LastEditTime: 2020-06-11 21:19:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\pages\home\home-album\index.vue
--> 
<template>
  <scroll-view class="album" scroll-y @scrolltolower="handleToLower">
    <!-- 轮播图开始 -->
    <view class="album_swiper">
      <swiper indicator-dots autoplay circular> 
        <swiper-item v-for="item in banner" :key="item.id"> 
          <image :src="item.thumb" class="swiper_img"></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 轮播图结束 -->
    <!-- 专辑列表开始 -->
    <view class="album_list">
      <navigator class="album_item" v-for="item in album" :key="item.id" :url="`../../pages/album/index?id=${item.id}`">
        <!-- 左 -->
        <view class="album_img">
          <image :src="item.cover" :mode="aspectFill"></image>
        </view>
        <!-- 右 -->
        <view class="album_info">
          <view class="album_name">{{item.name}}</view>
          <view class="album_desc">{{item.desc}}</view>
          <view class="album_follow">+ 关注</view>
        </view>
      </navigator>
    </view>
    <!-- 专辑列表结束 -->
  </scroll-view>
</template>

<script>
export default {
  methods: {
    handleToLower() {
      if(this.hasMore) {
        this.params.skip+= this.params.limit
        this.getAlbumList()
      } else {
        uni.showToast({
          title: '没有更多数据了:)',
          icon: 'none'
        })
      }
    },
    getAlbumList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
        data: this.params
      }).then(res => {
        if(this.banner.length === 0) {
          this.banner = res.res.banner
        }        
        if(res.res.album.length === 0) {
          this.hasMore = false
          return
        }
        this.album = [...this.album, ...res.res.album]
      })    
    }
  },
  mounted() {
    this.getAlbumList()
    uni.setNavigationBarTitle({
      title: '专辑'
    })
  },
  data() {
    return {
      // 轮播图列表
      banner: [],
      // 专辑列表
      album: [],
      hasMore: true,
      params: {
        limit: 30,
        order: "new",
        skip: 0
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.album {
  height: calc(100vh - 45rpx);
}
.album_swiper {
  swiper {
    height: calc(750rpx / (640/284));
    image {
      height: 100%;
    }
  }
}
.album_list {
  padding: 5rpx 10rpx 0 5rpx;
  .album_item {
    height: 250rpx;
    overflow: hidden;
    border-bottom: 2rpx solid #ccc;
    padding: 10rpx;
    display: flex;
    justify-content: space-between;
    .album_img {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5rpx;
      image {
        width: 200rpx;
        height: 200rpx;
      }
    }

    .album_info {
      flex: 2;
      padding: 10rpx;
      overflow: hidden;
      position: relative;
      .album_name {
        font-size: 34rpx;
        color: #333;
        font-weight: 600;
      }
      .album_desc {
        font-size: 28rpx;
        color: #666;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .album_follow {
        width: 120rpx;
        padding: 5rpx;
        border: 2rpx solid $themeColor;
        color: $themeColor;
        position: absolute;
        right: 10rpx;
        bottom: 40rpx;
      }
    }
  }
}
</style>
