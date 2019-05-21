import axios from 'axios'
const api = 'http://localhost:3000/'
// import { store } from '../store'

// eslint-disable-next-line no-unused-vars

export const request = {
  getBanner,
  getPersonalized
}

// function showToast (msg = 'network_error') {
//   store.dispatch(actions.showToastIndication(msg))
// }

// function showLoading () {
//   store.dispatch(actions.showLoading())
// }

// function hideLoading () {
//   store.dispatch(actions.hideLoading())
// }

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
  // 调用此接口 , 可获取推荐歌单
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