<!--
 * @Author: your name
 * @Date: 2020-06-20 23:15:40
 * @LastEditTime: 2020-06-21 12:23:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\pages\video\index.vue
--> 
<template>
  <view>
    <view class="video_tab">
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
      <view class="video_tab_content">
        <view v-if="current < 4">
          <video-main :urlobj="{url: items[current].url, params:items[current].params}"></video-main>
        </view>
        <view v-if="current === 4">
          <video-category :urlobj="{url: items[current].url, params:items[current].params}"></video-category>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import videoCategory from './videoCategory/index'
import videoMain from './video-main/index'
export default {
  data() {
    return {
      items: [
        { title: "推荐", url:"http://157.122.54.189:9088/videoimg/v1/videowp/featured",params:{limit:30,skip:0,order:"hot"} },
        { title: "娱乐", url:"http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",params:{limit:30,skip:0,order:"new"} },
        { title: "最新", url:"http://157.122.54.189:9088/videoimg/v1/videowp/videowp",params:{limit:30,skip:0,order:"new"} },
        { title: "热门", url:"http://157.122.54.189:9088/videoimg/v1/videowp/videowp",params:{limit:30,skip:0,order:"hot"} },
        { title: "分类", url:"http://157.122.54.189:9088/videoimg/v1/videowp/category",params:{} }
      ],
      current: 0
    };
  },
  components: {
    uniSegmentedControl,
    videoCategory,
    videoMain
  },
  methods: {
    // tabs栏自带方法
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex
      } else {
        return
      }
    }
  }
};
</script>

<style lang='scss' scoped>
</style>