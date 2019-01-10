const app = getApp()

var bmap = require("../../statics/js/bmap-wx.min.js");
const { APP_MOOK_ROOT } = require("../../config/rootConfig.js");
const { BAIDU_AK } = require("../../config/interfaceConfig.js");

Page({
  data: {
    ak: "",
    location: "",
    weather: "",
  },
  getAk() {
    let that = this;
    wx.request({
      url: APP_MOOK_ROOT + BAIDU_AK,
      success(res) {
        that.setData({
          ak: res.data.data
        });

        that.getLocationInfo(that.data.ak);
      }
    })
  },
  getLocationInfo(ak) {
    let that = this;

    wx.getLocation({
      type: "gcj02",
      success: function(res) {
        let BMap = new bmap.BMapWX({
          ak: ak
        });

        BMap.weather({
          location: res.longitude + "," + res.latitude,
          success(data) {
            const currentWeather = data.originalData.results[0]["weather_data"][0];
            let currentTemperature = currentWeather.date;

            that.setData({
              weather: currentTemperature.substring(currentTemperature.indexOf("：") + 1, currentTemperature.indexOf(")")) + " " + currentWeather.weather
            });
          }
        });

        BMap.search({
          location: res.latitude + "," + res.longitude,
          radius: 100,
          query: "酒店$房地产$公司企业$政府机构",
          scope: 2,
          success(data) {
            that.setData({
              location: data.originalData.results[0].name
            });
          }
        })
      }
    })
  },
  onLoad: function () {
    this.getAk();
  },
  onShow: function () {}
})

/* Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
}) */
