/*
 * @Author: your name
 * @Date: 2020-06-07 18:35:43
 * @LastEditTime: 2020-06-07 18:53:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \my-project\src\utils\request.js
 */ 
export default (params)=> {
    uni.showLoading({
        title: '加载中'
    })
    return new Promise((resolve, reject)=>{
        wx.request({
            ...params,
            success(res) {
                resolve(res.data)
            },
            fail(err) {
                reject(err)
            },
            complete() {
                uni.hideLoading()
            }
        })
    })
}