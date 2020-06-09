<!--
 * @Author: your name
 * @Date: 2020-06-02 21:11:43
 * @LastEditTime: 2020-06-04 21:59:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\App.vue
--> 
<script>
export default {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  globalData: {
    date: "2020-05-30"
  }
};
</script>

<style>
@import "./styles/base.wxss";
@import "./styles/iconfont.wxss";
</style>
