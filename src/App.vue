<!--
 * @Author: your name
 * @Date: 2020-06-02 21:11:43
 * @LastEditTime: 2020-06-03 22:07:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\App.vue
--> 
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			date: '2020-05-30'
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
