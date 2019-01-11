var bmap = require("statics/js/bmap-wx.min.js")
const { APP_MOOK_ROOT } = require("config/rootConfig.js")
const { BAIDU_AK } = require("config/interfaceConfig.js")

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    /* wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    }) */
    // 获取用户信息
    /* wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    }) */

    // 获取百度地图ak
    this.getAk()
  },
  globalData: {
    // userInfo: null,
    ak: null,
    locationInfo: null
  },
  // 获取百度地图ak
  getAk() {
    let that = this
    wx.request({
      url: APP_MOOK_ROOT + BAIDU_AK,
      success(res) {
        that.globalData.ak = res.data.data

        that.getLocationInfo(that.globalData.ak)
      }
    });
  },
  // 获取经纬度及定位信息
  getLocationInfo(ak) {
    let that = this

    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        that.globalData.locationInfo = {
          latitude: res.latitude,
          longitude: res.longitude
        }

        // 实例化百度地图API
        let BMap = new bmap.BMapWX({
          ak: ak
        })

        // 获取周边信息
        BMap.search({
          location: that.globalData.locationInfo["latitude"] + "," + that.globalData.locationInfo["longitude"],
          radius: 100,
          query: "酒店$房地产$公司企业$政府机构",
          scope: 2,
          success(data) {
            that.globalData.locationInfo["location"] = data.originalData.results[0].name

            if (that.locationInfoReadyCallback) {
              that.locationInfoReadyCallback(res, data)
            }
          }
        })
      }
    })
  }
})