<!--
 * @Author: your name
 * @Date: 2020-06-02 21:40:55
 * @LastEditTime: 2020-06-03 22:12:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\pages\index2\index.vue
--> 
<template>
  <view class="content">
    <my-yuyan @indexEHandle="eventHandle" :mysrc="xuanyan" mytitle="渲言">
      <checkbox></checkbox>
    </my-yuyan>
    <my-yuyan @indexEHandle="eventHandle" :mysrc="yuyan" mytitle="喻言">
      <checkbox></checkbox>
    </my-yuyan>
  </view>
</template>

<script>
import { myYuyan } from "../../components/img";
export default {
  data() {
    return {
      xuanyan:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591198770665&di=3bdaf80f7bd15f03dfea55bf88e391a0&imgtype=0&src=http%3A%2F%2Fimglf5.nosdn0.126.net%2Fimg%2FbjZaRmVpWExkaE1ScFc3VzRjUW1INUJhcTcxVGNTcVF0VGpFYkxXelNiZWZnMW1SYjAzUFJBPT0.jpg%3FimageView%26thumbnail%3D500x0%26quality%3D96%26stripmeta%3D0%26type%3Djpg",
      yuyan:
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591200770069&di=a90535dc0ff79617758b4ec32484e1bd&imgtype=0&src=http%3A%2F%2Fwx2.sinaimg.cn%2Flarge%2F59853be1ly1gff7y14skvj20c80c8dna.jpg"
    };
  },
  onLoad() {},
  methods: {
    showId(event) {
      console.log(event.currentTarget.dataset.id);
    },
    eventHandle(e) {
      console.log(e);
    }
  },
  components: {
    myYuyan
  },
  onLoad() {
    console.log(this.theme);
    console.log(getApp().globalData.date);
  }
};
</script>

<style lang='scss'>
.content {
  .title {
    font-size: 36rpx;
    color: $uni-color-primary;
  }
}
</style>
