# netease_cloud_webapp_react

---
> 网上看到有人使用vue写高仿网易云音乐webapp,于是我便想用react也写一个，顺利的话之后还会使用flutter、小程序等语言，就当做是学习练练手，力求将还原度达到100%，目前看到网上高仿的都是网易云5.0或之前的，而且将模仿的最新的6.0版本。本人是工作不到一年的小菜鸡，自知编程能力不足，希望各位大佬多多指教。 本项目将持续更新。。。。

### 首先要开启node服务
```
# 接口API地址 
https://binaryify.github.io/NeteaseCloudMusicApi/#/

# 拉取node服务至本地
git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git

# install dependencies
npm install

# node根目录中启动服务
node app.js

```

### 安装运行
```
# 安装依赖
npm install

# 本地运行
npm run start

```

### 实现的功能
目前实现的功能比较少，基本就是整体大的框架布局先出来，再从每个页面进去抠细节。先看看几个页面

![](https://img-blog.csdnimg.cn/20190618172911541.gif)
#### 主要功能：
- [x]  我的页面
- [x]  发现页面
- [x]  手机登录功能
- [x]  退出登录功能
