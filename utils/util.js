const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getWeatherIcon = weather => {
  switch (weather) {
    case "晴":
      return "icon-tianqi-qing"
      break
    case "多云":
      return "icon-tianqi-duoyun"
      break
    case "阴":
      return "icon-tianqi-yin"
      break
    case "阵雨":
      return "icon-tianqi-zhenyu"
      break
    case "雷阵雨":
      return "icon-tianqi-leizhenyu"
      break
    case "雷阵雨伴有冰雹":
      return "icon-tianqi-leiyubingbao"
      break
    case "雨夹雪":
      return "icon-tianqi-yujiaxue"
      break
    case "小雨":
      return "icon-tianqi-xiaoyu"
      break
    case "中雨":
      return "icon-tianqi-zhongyu"
      break
    case "大雨":
      return "icon-tianqi-dayu"
      break
    case "暴雨":
      return "icon-tianqi-baoyu"
      break
    case "大暴雨":
      return "icon-tianqi-dabaoyu"
      break
    case "特大暴雨":
      return "icon-tianqi-tedabaoyu"
      break
    case "阵雪":
      return "icon-tianqi-zhenyu"
      break
    case "小雪":
      return "icon-tianqi-xiaoxue"
      break
    case "中雪":
      return "icon-tianqi-zhongxue"
      break
    case "大雪":
      return "icon-tianqi-daxue"
      break
    case "暴雪":
      return "icon-tianqi-baoxue"
      break
    case "雾":
      return "icon-tianqi-wu"
      break
    case "冻雨":
      return "icon-tianqi-dongyu"
      break
    case "沙尘暴":
      return "icon-tianqi-shachenbao"
      break
    case "小雨转中雨":
      return "icon-tianqi-xiaoyuzhuanzhongyu"
      break
    case "中雨转大雨":
      return "icon-tianqi-zhongyuzhuandayu"
      break
    case "大雨转暴雨":
      return "icon-tianqi-dayuzhuanbaoyu"
      break
    case "暴雨转大暴雨":
      return "icon-tianqi-baoyuzhuandabaoyu"
      break
    case "大暴雨转特大暴雨":
      return "icon-tianqi-dayuzhuantedabaoyu"
      break
    case "小雪转中雪":
      return "icon-tianqi-xiaoxuezhuanzhongxue"
      break
    case "中雪转大雪":
      return "icon-tianqi-zhongxuezhuandaxue"
      break
    case "大雪转暴雪":
      return "icon-tianqi-daxuezhuanbaoxue"
      break
    case "浮尘":
      return "icon-tianqi-fuchen"
      break
    case "扬沙":
      return "icon-tianqi-yangsha"
      break
    case "强沙尘暴":
      return "icon-tianqi-tedashachenbao"
      break
    case "霾":
      return "icon-tianqi-wumai"
      break
    default:
      return ""
      break
  }
}

const getCurrentTemp = date => {
  return date.substring(date.indexOf("：") + 1, date.indexOf(")"))
}

const arrayPartition = (arr, groupLength) => {
  let idx = 0;
  var newArr = [];

  while(idx < arr.length) {
    newArr.push(arr.slice(idx, idx += groupLength));
  }

  return newArr;
}

module.exports = {
  formatTime: formatTime, // 时间格式转换
  getWeatherIcon: getWeatherIcon, // 根据字符串获取对应天气的图标
  getCurrentTemp: getCurrentTemp, // 截取字符串中当前气温信息
  arrayPartition: arrayPartition  // 数组分组
}
