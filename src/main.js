/*
 * @Author: your name
 * @Date: 2020-06-02 21:11:43
 * @LastEditTime: 2020-06-07 18:41:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\main.js
 */ 
import Vue from 'vue'
import App from './App'
import request from './utils/request'

Vue.config.productionTip = false
Vue.prototype.theme ="the 9"
Vue.prototype.request = request

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
