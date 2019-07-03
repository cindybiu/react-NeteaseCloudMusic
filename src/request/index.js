import axios from 'axios'
import { store } from '../store'
import { actions } from '../actions/'
const api = 'http://192.168.31.117:3000/'

// eslint-disable-next-line no-unused-vars

export const request = {
  getBanner,
  getPersonalized,
  getAlbum,
  getDjprogram,
  login,
  getUserInfo,
  getUserSubcount,
  logout,
  getUserPlaylist,
  getPlaylistDetail,
  // getSongDetail,
  getSongUrl
}

async function getBanner () {
  // 获取banner
  try {
    const res = await axios({
      url: api + 'banner?type=1',
      withCredentials: true, //关键
      method: 'GET',
    })
    if (res.data.code === 200) return res.data || {}
    return 0
  } catch (err) {
    return 0
  }
}
async function getPersonalized () {
  // 获取推荐歌单
  try {
    const res = await axios({
      url: api + 'personalized',
      withCredentials: true, //关键
      method: 'GET',
    })
    if (res.data.code === 200) return res.data || {}
    return 0
  } catch (err) {
    return 0
  }
}

async function getAlbum () {
  // 获取新碟上架列表
  try {
    const res = await axios({
      url: api + 'top/album',
      withCredentials: true, //关键
      method: 'GET',
    })
    if (res.data.code === 200) return res.data || {}
    return 0
  } catch (err) {
    return 0
  }
}

async function getDjprogram () {
  // 获取推荐电台
  try {
    const res = await axios({
      url: api + 'personalized/djprogram',
      withCredentials: true, //关键
      method: 'GET',
    })
    if (res.data.code === 200) return res.data || {}
    return 0
  } catch (err) {
    return 0
  }
}


async function login (params) {
  // 手机登录
  try {
    const res = await axios({
      url: api + 'login/cellphone',
      withCredentials: true, //关键
      method: 'GET',
      params
    })
    if (res.data.code === 200) return res.data || {}
    return 0
  } catch (err) {
    return 0
  }
}

async function getUserInfo (id) {
  // 手机登录
  try {
    const res = await axios({
      url: api + 'user/detail',
      withCredentials: true, //关键
      method: 'GET',
      params: {
        uid: id
      }
    })
    if (res.data.code === 200) return res.data || {}
    return 0
  } catch (err) {
    return 0
  }
}

async function getUserSubcount (id) {
  // 手机登录
  try {
    const res = await axios({
      url: api + 'user/subcount',
      withCredentials: true, //关键
      method: 'GET',
      params: {
        uid: id
      }
    })
    if (res.data.code === 200) return res.data || {}
    return 0
  } catch (err) {
    return 0
  }
}

async function logout (id) {
  // 退出登录
  try {
    const res = await axios({
      url: api + 'logout',
      withCredentials: true, //关键
      method: 'GET',
      params: {
        uid: id
      }
    })
    if (res.data.code === 200) {
      store.dispatch(actions.clearUserInfo())
      return res.data || {}
    }
    return 0
  } catch (err) {
    return 0
  }
}


async function getUserPlaylist (id) {
  // 获取用户歌单
  try {
    const res = await axios({
      url: api + 'user/playlist',
      withCredentials: true, //关键
      method: 'GET',
      params: {
        uid: id
      }
    })
    if (res.data.code === 200) return res.data || {}
    return 0
  } catch (err) {
    return 0
  }
}

async function getPlaylistDetail (id) {
  // 获取歌单详情
  try {
    const res = await axios({
      url: api + 'playlist/detail',
      withCredentials: true, //关键
      method: 'GET',
      params: {
        id: id
      }
    })
    if (res.data.code === 200) return res.data || {}
    return 0
  } catch (err) {
    return 0
  }
}



// async function getSongDetail (id) {
//   // 获取歌曲详情
//   try {
//     const res = await axios({
//       url: api + 'song/detail',
//       withCredentials: true, //关键
//       method: 'GET',
//       params: {
//         ids: id
//       }
//     })
//     if (res.data.code === 200) return res.data.songs[0] || {}
//     return 0
//   } catch (err) {
//     return 0
//   }
// }
async function getSongUrl (id) {
  // 获取歌曲url
  try {
    const res = await axios({
      url: api + 'song/url',
      withCredentials: true, //关键
      method: 'GET',
      params: {
        id: id
      }
    })
    if (res.data.code === 200) return res.data.data[0].url|| {}
    return 0
  } catch (err) {
    return 0
  }
}



