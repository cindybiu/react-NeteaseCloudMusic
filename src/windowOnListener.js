const EventEmitter = require('events').EventEmitter
//const log = require('loglevel')
const g_eventEmitter = new EventEmitter()
window.g_eventEmitter = g_eventEmitter

function windowOnListener () {
  window.onJPushMessage = (event) => {
    // log.debug("===onJPushMessage===")
    // log.debug(event)
  }
  
  window.onJPushNotification = (event) => {
    // log.debug("===onJPushNotification===")
    // log.debug(event.extras)
    g_eventEmitter.emit('tic:JPush:Notification', event.extras)
  }
  
  window.onJPushOpenNotification = (event) => {
    // log.debug("===onJPushOpenNotification===")
    // log.debug(event)
  }
  
  window.onJPushGetRegistrationID = (event) => {
    // log.debug("===onJPushGetRegistrationID===")
    // log.debug(event)
    g_eventEmitter.emit('tic:JPush:GetRegistrationID', event)
  }
  
  window.onJPushDeviceReady = (event) => {
    // log.debug("===onJPushDeviceReady===")
    // log.debug(event)
  }
  
  // gzb add for JPush
  if (window.g_JPushGo) {
    // 延迟为了等启动好，才注册极光推送组件
    let testTimer = null
    let testFunc = () => {
      window.clearTimeout(testTimer)
      // log.debug("===g_JPushGo==index.js=")
      window.g_JPushGo()
    }
    testTimer = window.setTimeout(testFunc, 5000)
  }
  
  g_eventEmitter.on('ida:JPush:Notification', (event) => {
    console.log("open music----------")
    window.$playNoticeMusic && window.$playNoticeMusic()
  })

  window.onSystemBackKeyDown = (event) => { // 监听返回键
    event.preventDefault()
    const hash = window.location.hash
    if (hash === '#/store-search') {
      g_eventEmitter.emit('store-search-back')
    } else if (hash === '#/payResult') {
      g_eventEmitter.emit('pay-result-back')
    } else if (hash.indexOf('/submitOrder') > -1) {
      g_eventEmitter.emit('submitOrder-back')
    } else {
      window.history.go(-1)
    }
  }

  document.addEventListener("backbutton", window.onSystemBackKeyDown, false)
}

export default windowOnListener