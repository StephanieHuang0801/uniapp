<!--
 * @Author: your name
 * @Date: 2020-06-04 22:03:32
 * @LastEditTime: 2020-06-11 20:39:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\pages\home\home-recommend\index.vue
--> 
<template>
  <scroll-view scroll-y class="recommend_view" @scrolltolower="handlerToLower">
    <!-- 推荐列表 开始 -->
    <view class="recommend_wrap">
        <navigator :url="`/pages/album/index?id=${item.target}`" class="recommend_item" v-for="item in recommends" :key="item.id">
          <image :src="item.thumb" mode="widthFix"></image>
        </navigator>
    </view>
    <!-- 推荐列表  -->
    <!-- 月份列表 开始 -->
    <view class="months_wrap">
      <!-- 上 -->
      <view class="months_title">
        <!-- 左 -->
        <view class="months_title_info">
          <!-- 月份数字 -->
          <text class="date">{{months.DD}}/</text>
          <text class="mon">{{months.MM}} 月</text>
          <!-- 文字 -->
          <text class="months_text">多远都可以达到</text>
        </view>
        <!-- 右 -->
        <text class="months_title_more">更多 ></text>
      </view>
      <!-- 下 -->
      <view class="months_content">
        <view class="image_wrap" v-for="item in months.items" :key="item.id">
          <image :src="item.img+item.rule.replace('$<Height>','360')" mode="aspectFill"></image>
        </view>
      </view>
    </view>  
    <!-- 月份列表 结束 -->
    <!-- 热门开始 -->
    <view class="hots_wrap">
      <view class="hot_title">
        <text>热门</text>
      </view>
      <view class="hot_content">
        <view class="img_wrap" v-for="item in hots" :key="item.id">
          <image :src="item.thumb" mode="widthFix"></image>
        </view>
      </view>
    </view>
    <!-- 热门结束 -->
  </scroll-view>
</template>

<script>
import moment from 'moment';
export default {
  methods: {
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
        data: this.params
      })
      .then((res)=> {
        if(res.res.vertical.length === 0) {
          this.hasMore = false
          return
        }        
        if(this.recommends.length === 0) {
          // 首次请求
          this.recommends = res.res.homepage[1].items
          this.months = res.res.homepage[2]
          this.months.MM = moment(this.months.stime).format("MM")
          this.months.DD = moment(this.months.stime).format("DD")
        }
        this.hots = [...this.hots, ...res.res.vertical]
        console.log('推荐列表', res.res.homepage[1].items)
      })
    },
    handlerToLower() {
      if(this.hasMore) {
        this.params.skip+=this.params.limit
        this.getList()
      } else {
        uni.showToast({
          title: '到底了:)',
          icon: 'none'
        })
      }
    }
  },
  mounted() {
    this.getList()
    uni.setNavigationBarTitle({
      title: '推荐'
    })
  },
  data() {
    return {
      // 推荐列表
      recommends: [],
      // 月份
      months: {},
      // 热门
      hots: [],
      params: {
        limit: 30,
        order: 'hot',
        skip: 0
      },
      // 判断是否还有下一页
      hasMore: true
    }
  }
};
</script>

<style lang='scss' scoped>
.recommend_view {
  height: calc(100vh - 45px);
}
.recommend_wrap {
  display: flex;
  flex-wrap: wrap;
  .recommend_item {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 5rpx solid #fff;
  }
}
.months_wrap {
  .months_title {
    padding: 20rpx 30rpx 20rpx 30rpx;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    font-weight: 600;
    .months_title_info {
      color: $themeColor;
      font-size: 40rpx;
      .mon {
        margin-left: 10rpx;
        font-size: 34rpx;
      }
      .months_text {
        margin-left: 20rpx;
        color: #666;
        font-size: 40rpx;
      }
    }
    .months_title_more {
      color: $themeColor;
      font-size: 30rpx;
    }
  }
  .months_content {
    display: flex;
    flex-wrap: wrap;
    .image_wrap {
      border: 5rpx solid #fff;
      width: 33%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.hots_wrap {
  .hot_title {
    padding: 20rpx;
    text {
      padding-left: 10rpx;
      font-size: 36rpx;
      font-weight: 600;
      border-left: solid 3rpx $themeColor;
    }
  }

  .hot_content {
    display: flex;
    flex-wrap: wrap;
    .img_wrap {
      width: 33.3%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 5rpx solid #fff;
    }
  }
}
</style>