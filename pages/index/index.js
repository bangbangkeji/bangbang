//index.js
//获取应用实例
const app = getApp()
var newsCon = {}
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
        var that = this
        
        wx.request({
          url: 'http://192.168.0.191:8080/bb-admin/app/bbApp/getIndexData',
            headers: {
                'Content-Type': 'application/json'
            },
            
            success: function (res) {
                //将获取到的json数据，存在名字叫list的这个数组中
              var list = {};
                that.setData({
                  list: res.data.result.hy_msg_size,
                    //res代表success函数的事件对，data是固定的，list是数组
                  
                })
            }
        }),
         wx.request({
           
           url: app.globalData.host+'/bbApp/getMessageList',

            headers: {
              'Content-Type': 'application/json'
            },

            success: function (res) {
              console.log("11");
              //将获取到的json数据，存在名字叫list的这个数组中
              if(res.data.code=="0"){
                  that.setData({
                    newsCon: res.data.result.message_list[0].content
                    //res代表success函数的事件对，data是固定的，list是数组

                  })
              }

            },
           fail: function (res) {
             //console.log(res);
           },
           complete: function (res) {
             console.log(res);
             that.setData({
               newsCon: "欢迎使用帮帮货运"
               //res代表success函数的事件对，data是固定的，list是数组

             })
           }
            
          })


    },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
