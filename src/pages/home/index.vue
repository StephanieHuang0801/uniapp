<!--
 * @Author: your name
 * @Date: 2020-06-04 22:02:17
 * @LastEditTime: 2020-06-20 17:27:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\pages\home\index.vue
--> 
<template>
  <view>
    <view class="home_tab">
      <!-- 上 -->
      <view class="home_tab-title">
        <!-- 左 -->
        <view class="title_inner">
          <uni-segmented-control
            :current="current"
            :values="items"
            @clickItem="onClickItem"
            style-type="text"
            active-color="#d4237a"
          ></uni-segmented-control>
        </view>
        <!-- 右 -->
        <view class="iconfont iconsearch"></view>
      </view>
      <!-- 下 -->
      <view class="home_tab_content">
        <view v-show="current === 0">
          <home-recommend></home-recommend>
        </view>
        <view v-show="current === 1">
          <home-category></home-category>
        </view>
        <view v-show="current === 2">
          <home-new></home-new>
        </view>
        <view v-show="current === 3">
          <home-album></home-album>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import { homeAlbum } from "./home-album/index";
import { homeCategory } from "./home-category/index";
import { homeNew } from "./home-new/index";
import { homeRecommend } from "./home-recommend/index";
export default {
  data() {
    return {
      items: ["推荐", "分类", "最新", "专辑"],
      current: 1
    };
  },
  components: {
    homeAlbum,
    homeCategory,
    homeNew,
    homeRecommend,
    uniSegmentedControl
  },
  methods: {
    // tabs栏自带方法
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.home_tab-title {
    position: relative;
    .title_inner {
        width: 60%;
        margin: auto;
    }
    .iconfont {
        position: absolute;
        right: 5%;
        top: 50%;
        transform: translateY(-50%);
    }
}

</style>
