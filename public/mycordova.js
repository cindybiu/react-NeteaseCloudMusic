document.addEventListener('deviceready', function () {
  cordova.getAppVersion.getVersionNumber().then(function (version) {
    window.now_version = version
  })
}, false)

var f_scanCode = function() {
  console.log("==gzb==g_scanCode=index.html=")
  console.log(window.plugins)
  console.log(window.plugins.barcodeScanner)
  window.plugins.barcodeScanner.scan(window.onScanOk, window.onScanError)    
}


//判断当前在苹果平台还是安卓平台
document.addEventListener("deviceready", onDeviceReady2, false)
function onDeviceReady2() {
  window.g_platform = device.platform
}

var ref = null
document.addEventListener("deviceready", onDeviceReady, false)
function onDeviceReady() {
  window.open = cordova.InAppBrowser.open
  //ref= window.open;
  //ref.addEventListener('exit', exitCallback);
}

function exitCallback() {
  console.log('浏览器关闭...')
}

document.addEventListener("deviceready", onMediaReady, false);
function onMediaReady() {
  var musicSrc = 'http://tic-id-card.oss-cn-hangzhou.aliyuncs.com/backgroundmusic/qn7n2.mp3'
  function mediaSuccess () {
  }
  function mediaError () {
    console.log('音频加载失败')
  }
  window.$c_media = new Media(musicSrc, mediaSuccess, mediaError)
}

window.g_scanCode = f_scanCode 


  
//推送   
var f_JPushGo = function(){
      console.log("===g_JPushGo==html=");
      var onDeviceReady = function() {
        window.onJPushDeviceReady("ok");
        document.addEventListener("jpush.receiveRegistrationId", function (event) {
          window.getdata = event.registrationId;
          console.log('==11==',window.getdata)  
          window.onJPushGetRegistrationID(event.registrationId);
        }, false)
        
        // window.JPush.startJPushSDK() // add by zjs
        initiateUI();
      };
      
      var getRegistrationID = function() {
        window.JPush.getRegistrationID(onGetRegistrationID);
      };
      
      var onGetRegistrationID = function(data) {
        try {
          // alert("JPushPlugin:registrationID is " + data) // add by zjs
        console.log("JPushPlugin:registrationID is " + data);
        window.getdata= data;
        console.log('==22==', window.getdata)  
        if (data.length == 0) {
          var t1 = window.setTimeout(getRegistrationID, 1000);
        }
        window.onJPushGetRegistrationID(data);
        } catch (exception) {
        console.log(exception);
        }
      };
      
      var onTagsWithAlias = function(event) {
        try {
        console.log("onTagsWithAlias");
        var result = "result code:" + event.resultCode + " ";
        result += "tags:" + event.tags + " ";
        result += "alias:" + event.alias + " ";
        } catch (exception) {
        console.log(exception)
        }
      };
      
      var onOpenNotification = function(event) {
        try {
        var alertContent;
        if (device.platform == "Android") {
          alertContent = event.alert;
        } else {
          alertContent = event.aps.alert;
        }
        window.onJPushOpenNotification(alertContent);
        } catch (exception) {
        console.log("JPushPlugin:onOpenNotification" + exception);
        }
      };
      
      var onReceiveNotification = function(event) {
        try {
        var alertContent;
        if (device.platform == "Android") {
          alertContent = event.alert;
          console.log(event+"========onReceiveNotification11==========")
        } else {
          alertContent = event.aps.alert;
          console.log(event+"========onReceiveNotification22==========")
          console.log(event)
        }
        window.onJPushNotification(event);
        } catch (exception) {
        console.log(exception)
        }
      };
      
      var onReceiveMessage = function(event) {
        try {
        var message;
        if (device.platform == "Android") {
          message = event.message;
        } else {
          message = event.content;
        }
        window.onJPushMessage(event);
        } catch (exception) {
        console.log("JPushPlugin:onReceiveMessage-->" + exception);
        }
      };
      
      var initiateUI = function() {
        try {
          window.JPush.init();
          window.JPush.setDebugMode(true);
          window.setTimeout(getRegistrationID, 1000);

        if (device.platform != "Android") {
          window.JPush.setApplicationIconBadgeNumber(0);
        }
        } catch (exception) {
        console.log(exception);
        }
        
      };

    //    /*
    //     * 停止极光推送
    //     * */
    // var _stopPush = function () {
    //   window.plugins.jPushPlugin.stopPush();
    // };
    // /*
    //  * 重启极光推送
    //  * */
    // var _resumePush = function () {
    //   window.plugins.jPushPlugin.rsesumePush();
    // };


      
      document.addEventListener("deviceready", onDeviceReady, false);
      document.addEventListener("jpush.openNotification", onOpenNotification, false);
      document.addEventListener("jpush.receiveNotification", onReceiveNotification, false);
      document.addEventListener("jpush.receiveMessage", onReceiveMessage, false);
    }


//开启内部浏览器
 var f_openUrl = function(url){

          console.log(url)
          try {
            if (!cordova || !cordova.ThemeableBrowser) {
              return;
            }
          } catch (err) {
            console.log('不是客户端')
            return
          }
          
          const backButton = {
            align: 'left',
            event: 'backPressed'
          };
          if (device.platform == "Android") {
              backButton.image = 'back';
              backButton.imagePressed = 'back_pressed';
          } else {
            backButton.wwwImage = 'images/back.png';
            backButton.wwwImagePressed = 'images/back_pressed.png';
            backButton.wwwImageDensity = 2;
          }
    
          cordova.ThemeableBrowser.open(url, '_blank', {
            statusbar: {
              color: '#5A81E9'
            },
            toolbar: {
                height: 44,
                color: '#5A81E9'
            },
            title: {
                color: '#FFFFFF',
                showPageTitle: true
            },
          backButton,
          //forwardButton: {
              //image: 'forward',
              //imagePressed: 'forward_pressed',
              //align: 'left',
              //event: 'forwardPressed'
          //},
          closeButton: {
              image: 'close',
              imagePressed: 'close_pressed',
              align: 'left',
              event: 'closePressed'
          },
          //customButtons: [
              //{
                 // image: 'share',
                //imagePressed: 'share_pressed',
                 // align: 'right',
                 // event: 'sharePressed'
              //}
          //],
          // menu: {
          //     image: 'menu',
          //     imagePressed: 'menu_pressed',
          //     title: 'Test',
          //     cancel: 'Cancel',
          //     align: 'right',
          //     items: [
          //         {
          //             event: 'helloPressed',
          //             label: 'Hello World!'
          //         },
          //         {
          //             event: 'testPressed',
          //             label: 'Test!'
          //         }
          //     ]
          // },
          backButtonCanClose: true
        }).addEventListener('backPressed', function(e) {
          console.log('back pressed');
        }).addEventListener('helloPressed', function(e) {
          console.log('hello pressed');
        }).addEventListener('sharePressed', function(e) {
          console.log(e.url);
        }).addEventListener(cordova.ThemeableBrowser.EVT_ERR, function(e) {
          console.error(e.message);
        }).addEventListener(cordova.ThemeableBrowser.EVT_WRN, function(e) {
          console.log(e.message);
        });
} 

window.g_openurl = f_openUrl;
window.g_JPushGo = f_JPushGo;

