/*
 * @Author: your name
 * @Date: 2020-06-02 21:11:43
 * @LastEditTime: 2020-06-03 22:04:00
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\main.js
 */ 
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.theme ="the 9"

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
