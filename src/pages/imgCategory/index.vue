<!--
 * @Author: your name
 * @Date: 2020-06-20 17:48:06
 * @LastEditTime: 2020-06-20 23:05:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\pages\imgCategory\index.vue
--> 
<template>
  <view>
    <view class="category_tab">
      <!-- 上 -->
      <view class="title_inner">
        <uni-segmented-control
          :current="current"
          :values="items.map(e=>e.title)"
          @clickItem="onClickItem"
          style-type="text"
          active-color="#d4237a"
        ></uni-segmented-control>
      </view>
      <!-- 下 -->
      <scroll-view scroll-y enable-flex class="category_tab_content" @scrolltolower="handleScrollToLower">
          <view class="cate_item" v-for="item in vertical" :key="item.id">
              <image :src="item.thumb" mode="aspectFill"></image>
          </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
export default {
  data() {
    return {
      //   items: ["最新", "热门"],
      items: [
        { title: "最新", order: "new" },
        { title: "热门", order: "hot" }
      ],
      current: 0,
      params: {
        limit: 30,
        skip: 0,
        order: "new"
      },
      id: 0,
      vertical: [],
      hasMore: true
    };
  },
  components: {
    uniSegmentedControl
  },
  methods: {
    handleScrollToLower() {
        if(this.hasMore) {
            this.params.skip+=this.params.limit
            this.getCategoryDetail()
        } else {
          uni.showToast({
            title: '到底了宝贝儿:)',
            icon: 'none'
          })
        }
    },
    onLoad(options) {
      this.id = options.id
      this.getCategoryDetail()
      console.log(options.id)
    },
    // tabs栏自带方法
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex
        this.params.skip = 0 
        this.vertical = []
        this.params.order = this.items[e.currentIndex].order
        this.getCategoryDetail()
      } else {
        return
      }
    },
    async getCategoryDetail() {
      const res = await this.request({
        url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
        data: this.params
      })
      console.log(res)
      this.vertical = [...this.vertical, ...res.res.vertical]
      if(res.res.vertical.length === 0) {
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
.title_inner {
  width: 60%;
  margin: auto;
}
.category_tab_content {
  height: calc(100vh - 36rpx);
  display: flex;
  flex-wrap: wrap;
  .cate_item {
    width: 33%;
    border: 3rpx solid #fff;
    height: 500rpx;
  }
}
</style>