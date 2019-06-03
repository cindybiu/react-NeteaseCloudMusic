import axios from 'axios'
const api = 'http://localhost:3000/'
// import { store } from '../store'

// eslint-disable-next-line no-unused-vars

export const request = {
  getBanner,
  getPersonalized,
  getAlbum,
  getDjprogram,
  login,
  getUserInfo
}

async function getBanner () {
  // 获取订单记录模拟数据
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