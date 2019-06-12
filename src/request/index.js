import axios from 'axios'
import { store } from '../store'
import { actions } from '../actions/'
const api = 'http://localhost:3000/'

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
  test
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
  // 手机登录
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



//获取商城首页数据
async function test (params) {
  const formData = {
    addr: '1EXoDusjGwvnjZUyKkxZ4UHEf77z6A5S4P',
    page: 2
  }
  try {
    const res = await axios({
      url: 'https://api.omniexplorer.info/v1/transaction/address',
      method: 'POST',
      params,
      data: formData,
      store: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res.data.view.data
  } catch (err) {
    return null
  }
}