<!--
 * @Author: your name
 * @Date: 2020-06-11 20:55:26
 * @LastEditTime: 2020-06-14 20:59:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\pages\home\album\index.vue
--> 
<template>
<view>
    <!-- 专辑背景图 开始 -->
    <view class="bgImg">
        <view class="imgContent">
            <image :src="album.cover" mode="widthFix"></image>
        </view>
        <view class="bgInfo">
            <view class="albumName">{{album.name}}</view>
            <view class="followBtn">关注专辑</view>
        </view>
    </view>
    <!-- 专辑背景图 结束 -->
    <!-- 作者信息 开始 -->
    <view class="author">
        <view class="author_name">
            <view class="author_avatar">
                <image :src="album.user.avatar" mode="widthFix"></image>
            </view>
            <view class="name">{{album.user.name}}</view>
        </view>
        <view class="author_info"><text>{{album.desc}}</text></view>
    </view>
    <!-- 作者信息 开始 -->
    <!-- 专辑墙纸 开始 -->
    <view class="wallpaper">
        <view class="wallpaper_image" v-for="(item, index) in wallpaper" :key="item.id">
            <!-- :src="item.thumb+item.rule.replace('$<Height>',360)" -->
           <go-detail :list="wallpaper" :index="index" class="wallpaperDetail">    
              <image :src="item.thumb+item.rule.replace('$<Height>',360)" mode="widthFix" ></image>
           </go-detail>
        </view>
    </view>
    <!-- 专辑墙纸 结束 -->

</view>
</template>

<script>
import goDetail from '../../components/goDetail'
export default {
  onLoad(options) {
    this.id = options.id
    // 这个仕女图有图片评论数据返回
    // this.id = '5e0ea895e7bce739990ba8a1'
    this.getAlbumDetail()
  },
  components: {
    goDetail
  },
  onReachBottom() {
    this.params.skip += this.params.limit
    this.first = 0
    if(this.hasMore) {
      this.getAlbumDetail()
    } else {
      uni.showToast({
        title: '到底了:)',
        icon: 'none'
      })
    }
  },
  methods: {
    getAlbumDetail() {
      this.request({
        url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
        // url: `http://157.122.54.189:9088/image/v1/wallpaper/album/5e5cf679e7bce739db1281e4/wallpaper`,
        data: this.params
      }).then(res => {
          // console.log(res)
          if (Object.keys(this.album).length === 0) {
              this.album = res.res.album
          }
          if(res.res.wallpaper.length === 0) {
             uni.showToast({
               title: '到底了:)',
               icon: 'none'
             })
             this.hasMore = false
             return
          }
          this.wallpaper = [...this.wallpaper, ...res.res.wallpaper]
      })    
    }
  },
  data() {
    return {
      params: {
        limit: 30,
        order: "new",
        skip: 0,
        // 当first为1，返回值中有album；当first为0，返回值中只有wallpaper
        first: 1
      },
      id: 0,
      album: {},
      wallpaper: [],
      hasMore: true
    }
  }}
</script>

<style lang='scss' scoped>
.bgImg {
   position: relative;
  .bgInfo {
    display: flex;
    height: 80rpx;
    align-items: center;
    padding: 0 20rpx;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    bottom: 10rpx;
    color: #fff;
    .albumName {
      font-size: 40rpx;
    }
    .followBtn {
      width: 152rpx;
      height: 60rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10rpx;
      padding: 5 10rpx;
      font-size: 30rpx;
      background-color: $themeColor;
    }
  }
}
.author {
  padding: 10rpx;
  .author_name {
    display: flex;
    .author_avatar {
      height: 70rpx;
      width: 70rpx;
    }

    .name {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 34rpx;
      color: #000;
      margin-left: 10rpx;
    }
  }

  .author_info {
     padding: 5rpx 0;
     font-size: 32rpx;
     color: #333;
  }
}
.wallpaper {
  display: flex;
  flex-wrap: wrap;
  .wallpaper_image {
    width: 33.3%;
    height: 130rpx;
    border: 1rpx solid #fff;
    .wallpaperDetail {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
  }
}
</style>