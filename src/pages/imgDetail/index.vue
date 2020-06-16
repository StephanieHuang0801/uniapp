<!--
 * @Author: your name
 * @Date: 2020-06-14 13:11:14
 * @LastEditTime: 2020-06-16 21:43:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\pages\imgDetail\index.vue
--> 
<template>
  <view class="imgDetail">  
    <!-- 专辑图片 开始 -->
    <view class="authod">
      <view class="authorInfo">
      <view class="avatar">
        <image :src="imgDetail.user.avatar" mode="widthFix"></image>
      </view>
      <view class="userInfo">
        <view class="userName">{{imgDetail.user.name}}</view>
        <view class="updateTime">{{commemtTime}}</view>
      </view>
      </view>
      <view class="albumImg">
        <swipe-action @swipeAction="handleSwipeAction">
          <image  
            v-if="imgUrl" 
            :src="imgUrl"
            mode="scaleToFill">
          </image>
        </swipe-action>
      </view>
      <view class="thumb">
        <view class="zan iconfont icondianzan">{{imgDetail.rank}}</view>
        <view class="shoucang iconfont iconshoucang">收藏</view>
      </view>
    </view>
    <view class="download" @click="handleClick">
      下载图片
    </view>
    <!-- 专辑图片 结束 -->
  </view>
</template>
      
<script>
import moment from 'moment'
import swipeAction from '../../components/swipeAction'
moment.locale('zh-cn')
export default {
  components: {
    swipeAction
  },
  onLoad() {
    const{imgIndex} = getApp().globalData
    this.getData()
    this.imgIndex = imgIndex
    // console.log('缓存的数据', getApp().globalData)
  },
  methods: {
    // 下载图片
    async handleClick() {
      await uni.showLoading({
        title: '下载中'
      })
      const res1 = await uni.downloadFile({url: this.imgDetail.img})
      console.log('res1', res1)
      const {tempFilePath} = res1[1]
      const res2 = await uni.saveImageToPhotosAlbum({ filePath: tempFilePath})
      console.log('res2', res2)
      console.log('下载成功')
      uni.hideLoading()
      await uni.showToast({
        title: '下载成功'
      })
    },
    getData () {
      const{imgList} = getApp().globalData
      this.imgDetail = imgList[this.imgIndex]
      this.imgUrl = this.imgDetail.thumb+this.imgDetail.rule.replace('$<Height>',360)
      this.commemtTime = moment(this.imgDetail.atime*1000).fromNow()
      this.getComments(this.imgDetail.id)
    },
    handleSwipeAction (e) {
      console.log(e)
      const{imgList} = getApp().globalData
      if(e.direction === 'left' && this.imgIndex < imgList.length - 1) {
        // 左滑 跳转下一页 index++
        this.imgIndex++
        this.getData()
      } else if (e.direction === 'right' && this.imgIndex > 0) {
        // 右滑 返回 index--
        this.imgIndex--
        this.getData()
      } else {
        uni.showToast ({
          title: '没有更多数据啦 :)',
          icon: 'none'
        })
      }
    },
    getComments(id) {
      this.request({
        url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`
      })
      .then(res => {
        // console.log('图片评论', res.res.album)
        // this.album = res.res.
      })
    }
  },
  data() {
    return {
      imgDetail: {},
      imgIndex: 0,
      imgUrl: '',
      commemtTime: '',
      album: [],
      comment: [],
      hot: []
    }
  }
};
</script>

<style lang='scss' scoped>
.authorInfo {
  padding: 20rpx;
  display: flex;
  .avatar {
    width: 80rpx;
    height: 80rpx;
    image {
      border-radius: 50%;
    }
  }
  .userInfo {
    margin-left: 15rpx;
    .userName {
      color: #333;
      font-size: 34rpx;
      font-weight: 600;
    }
    .updateTime {
      color: #666;
      font-size: 30rpx;
    }
  }
}
.albumImg {
  height: 440rpx;
  overflow: hidden;
}
.thumb {
  padding: 20rpx 0;
  display: flex;
  justify-content: space-around;
  color: #666;
  border-bottom: 1rpx solid #ddd;
  .zan {
    text-align: center;
    flex: 1;
  }
  .shoucang {
    text-align: center;
    flex: 1;
  }
}
.imgDetail{
  position: relative;
  padding: 5px;
  height: 1100rpx;
}
.download {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);;
  width: 95%;
  font-size: 36rpx;
  background-color: $themeColor;
  color: #fff;
  font-weight: 600;
  bottom: 10rpx;
  text-align: center;
  padding: 10rpx 0;
}
</style>