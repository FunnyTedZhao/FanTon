const app = getApp()

var bmap = require("../../statics/js/bmap-wx.min.js")
const { APP_MOOK_ROOT } = require("../../config/rootConfig.js")
const { BAIDU_AK } = require("../../config/interfaceConfig.js")

Page({
  data: {
    ak: "",
    hasLocationInfo: false,
    locationInfo: {},
    weather: "",
  },
  getWeatherInfo(ak, lat, lng) {
    let that = this
    let BMap = new bmap.BMapWX({
      ak: ak
    })

    BMap.weather({
      location: lng + "," + lat,
      success(data) {
        const currentWeather = data.originalData.results[0]["weather_data"][0]
        let currentTemperature = currentWeather.date

        that.setData({
          weather: currentTemperature.substring(currentTemperature.indexOf("：") + 1, currentTemperature.indexOf(")"))
        })
      }
    })
  },
  onLoad: function () {
    if (app.globalData.locationInfo) {
      this.setData({
        ak: app.globalData.ak,
        locationInfo: app.globalData.locationInfo,
        hasLocationInfo: true
      })
    } else {
      // 加入 callback 以防 Page.Load 先于 App.onLaunch 执行
      app.locationInfoReadyCallback = (res, data) => {
        this.setData({
          ak: app.globalData.ak,
          locationInfo: {
            latitude: res.latitude,
            longitude: res.longitude,
            location:data.originalData.results[0].name
          },
          hasLocationInfo: true
        })
      }
    }

    /* 页面事件开始 */
    this.getWeatherInfo(this.data.ak, this.data.locationInfo.latitude, this.data.locationInfo.longitude)
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

/* 晴 | 多云 | 阴 | 阵雨 | 雷阵雨 | 雷阵雨伴有冰雹 | 雨夹雪 | 小雨 | 中雨 | 大雨 | 暴雨 | 大暴雨 | 特大暴雨 | 阵雪 | 小雪 | 中雪 | 大雪 | 暴雪 | 雾 | 冻雨 | 沙尘暴 | 小雨转中雨 | 中雨转大雨 | 大雨转暴雨 | 暴雨转大暴雨 | 大暴雨转特大暴雨 | 小雪转中雪 | 中雪转大雪 | 大雪转暴雪 | 浮尘 | 扬沙 | 强沙尘暴 | 霾 */