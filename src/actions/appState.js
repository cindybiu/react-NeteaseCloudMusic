import axios from '../config/axiosConfig'
import { Cookies } from 'react-cookie'
import customerConfig from '../config/customer'

const { apiPrefix } = customerConfig

export const appStateActions = {
  showToastIndication,
  hideToastIndication,
  showLoading,
  hideLoading,
  updateUserInfo,
  clearUserInfo,
  login,
  register,
  getUserinfo,
  userInfo,
  getbackPassword,
  verifyCode,
  getCheckCode,
  getCheckMailCode, //邮箱验证码
  updatePassword,
  registerOk,
  cancelUpgradeVersion,
  showPasswordDialog,
  hidePasswordDialog,
  updatePayPassword,
  updateLoginPassword,
  resetLoginPassword,
  verifyPayPassword,
  forgetPayPassword,
  createUserWallet,
  getUserWalletInfo,
  setUserWalletInfo,
  updateCanpay, //已设置交易密码
  isLoading,
  getLatestVersion, //获取最新版本信息
  setVersionMsg,
  getUserInfo,
  switchLanguage,
  setLocale,
}

function showLoading (message) {
  return dispatch => {
    dispatch({
      type: 'SHOW_LOADING',
      value: message
    })
    window.$isLoading = true
    clearTimeout(this.loadingTimeout)
    this.loadingTimeout = setTimeout(() => {
      if (window.$isLoading) {
        window.$isLoading = false
        dispatch(appStateActions.hideLoading())
        dispatch(appStateActions.showToastIndication('network_error', 'center'))
      }
    }, 20000)
  }
}

function hideLoading () {
  window.$isLoading = false
  return {
    type: 'HIDE_LOADING'
  }
}

function updateCanpay () {
  return dispatch => {
    dispatch({
      type: 'SET_CANPAY_TRUE'
    })
  }
}

function updateUserInfo (data) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_USERINFO',
      value: data
    })
  }
}

function clearUserInfo () {
  return dispatch => {
    dispatch({
      type: 'CLEAR_USERINFO'
    })
    dispatch({
      type: 'CLEAR_USER_WALLET_INFO'
    })
    dispatch({
      type: 'SET_STORE_USERINFO',
      data: {}
    })
    dispatch({
      type: 'SET_IDA_USERINFO',
      data: {}
    })
    dispatch({
      type: 'SET_IDA_USER_WALLET_INFO',
      data: {}
    })
  }
}

function showPasswordDialog () {
  return dispatch => {
    dispatch({
      type: 'SHOW_PWD_DIALOG'
    })
  }
}

function hidePasswordDialog () {
  return dispatch => {
    dispatch({
      type: 'HIDE_PWD_DIALOG'
    })
  }
}

// toast add by zjs
function showToastIndication (toastMsg, time = 2000, position, style) {
  // 传1,3参数
  if (
    typeof time === 'string' &&
    typeof position === 'undefined' &&
    typeof style === 'undefined'
  ) {
    position = time
    time = 2000
    style = undefined
  }
  // 传1,4参数
  if (
    typeof time === 'object' &&
    typeof position === 'undefined' &&
    typeof style === 'undefined'
  ) {
    style = time
    time = 2000
    position = 'center'
  }
  // 传1,2,4参数
  if (typeof position === 'object' && typeof style === 'undefined') {
    style = position
    position = 'bottom'
  }
  let self = this
  clearTimeout(self.toastTimeout)
  return dispatch => {
    dispatch({
      type: 'SHOW_TOAST',
      payload: {toastMsg, position, style}
    })

    self.toastTimeout = setTimeout(() => {
      dispatch(appStateActions.hideToastIndication())
    }, time)
  }
}

function hideToastIndication () {
  return {
    type: 'HIDE_TOAST'
  }
}

function login (config) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios(config)
        .then(async res => {
          if (res.data.success) {
            const storeLoginRes = await dispatch(appStateActions.storeLogin(config.data.email, config.data.password))
            if (!storeLoginRes) return reject({data: {message: '登录失败'}})

            const cookie = new Cookies()
            const cookieMaxAge = customerConfig.cookieMaxAge //比后端短10s
            dispatch(appStateActions.getUserWalletInfo(res.data.data)) //登录成功后获取用户钱包信息
            dispatch(appStateActions.userInfo(res.data.data))
            cookie.set('token', res.data.data.token, { path: '/', maxAge: cookieMaxAge})
            return resolve(res)
          } else {
            console.log(res)
            return reject(res)
          }
        })
        .catch(err => {
          console.error(err)
          return reject(err)
        })
    })
  }
}

function register (url, data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios({
        url,
        data,
        method: 'POST',
        token: false
      })
        .then(async res => {
          const registerRes = (res && res.data) ? res : {data: {}}
          if (!registerRes.data.success) dispatch(appStateActions.showToastIndication('account_exist'))
          return resolve(registerRes)
        })
        .catch(err => {
          console.log(err)
          console.log(err.response)
          dispatch(appStateActions.showToastIndication('register_fail'))
          return reject(err)
        })
    })
  }
}

function getUserinfo (url, params) {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios({
          url,
          params,
          token: false
        })
        return resolve(res)
      } catch (err) {
        dispatch(appStateActions.showToastIndication('network_error', 'center'))
        return reject(false)
      }
    })
  }
}

function userInfo (userInfo) {
  return {
    type: 'LOGIN',
    data: userInfo
  }
}

function getbackPassword (url, data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios.get(url, data)
        .then(res => {
          console.log(res)
          return resolve(res)
        })
        .catch(err => {
          dispatch(appStateActions.showToastIndication('account_no_exist'))
          return reject(err)
        })
    })
  }
}

function verifyCode (url, data, errorText) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios({
        url,
        data,
        method: 'POST',
        token: false
      })
        .then(res => {
          return resolve(res)
        })
        .catch(err => {
          return reject(err)
        })
    })
  }
}

function getCheckCode (url, params) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        token: false,
        params
      })
        .then(res => {
          if (res.data.success) {
            dispatch(appStateActions.showToastIndication('verification_code_send'))
          } else {
            const message = res.data.message
            dispatch(appStateActions.showToastIndication(errorCode(message)))
          }
          resolve(res)
        })
        .catch(err => {
          dispatch(appStateActions.showToastIndication('network_error', 'center'))
          reject(err)
        })
    })
  }
}

function errorCode (type) {
  switch (type) {
    case '请勿重复发送验证码':
      return 'donot_repeat_send_code'
    case '短信验证码不正确，请重新输入':
      return 'verification_code_not_correct'
    case '验证码不正确，请重新输入':
      return 'verification_code_incorrect'
    case '你今日的验证次数已达上限':
      return 'maximum_validation'
    default:
      return 'network_error'
  }
}

function getCheckMailCode (url, params) {
  console.log('mail url:', url)
  console.log('mail params:', params)
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        token: false,
        params
      })
        .then(res => {
          resolve(res)
          dispatch(appStateActions.showToastIndication('verification_code_send'))
        })
        .catch(err => {
          dispatch(appStateActions.showToastIndication('network_error', 'center'))
          reject(err)
        })
    })
  }
}

function updatePassword (config) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios(config)
        .then(res => {
          if (!res.data.success) dispatch(appStateActions.showToastIndication('reset_login_pwd_failed'))
          return resolve(res)
        })
        .catch(err => {
          return reject(err)
        })
    })
  }
}

function registerOk (config) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios(config)
        .then(res => {
          dispatch(appStateActions.showToastIndication('register_success'))
          return resolve(res)
        })
        .catch(err => {
          dispatch(appStateActions.showToastIndication('register_fail'))
          return reject(err)
        })
    })
  }
}

function cancelUpgradeVersion (data) {
  return {
    type: 'CANCEL_UPGRADE',
    data
  }
}

function updatePayPassword (url, data, token) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios({
        url,
        data,
        method: 'PUT',
        token: false,
        headers: {
          Authorization: token
        }
      })
        .then(async res => {
          return resolve(res)
        })
        .catch(err => {
          console.log(err)
          return reject(err)
        })
    })
  }
}

function updateLoginPassword (url, data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios({
        url,
        data,
        method: 'PUT',
      })
        .then(async res => {
          if (!res.data.success) dispatch(appStateActions.showToastIndication('update_login_pwd_failed'))
          return resolve(res)
        })
        .catch(err => {
          console.log(err)
          dispatch(appStateActions.showToastIndication('network_error'))
          return reject(err)
        })
    })
  }
}

function resetLoginPassword (url, data) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios({
        url,
        data,
        method: 'PUT',
      })
        .then(async res => {
          return resolve(res)
        })
        .catch(err => {
          console.log(err)
          return reject(err)
        })
    })
  }
}

function verifyPayPassword (config) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios(config)
        .then(async res => {
          return resolve(res)
        })
        .catch(err => {
          console.log(err)
          return reject(err)
        })
    })
  }
}

function forgetPayPassword (url, data, token) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios({
        url,
        data,
        method: 'POST',
        token: false,
        headers: {
          Authorization: token
        }
      })
        .then(async res => {
          return resolve(res)
        })
        .catch(err => {
          console.log(err)
          return reject(err)
        })
    })
  }
}

function createUserWallet (token) {
  return async (dispatch) => {
    try {
      let res = await axios({
        url: apiPrefix + 'walletandtoken/api/v1/eth/wallet',
        method: 'POST',
        token: false,
        headers: {
          Authorization: token
        }
      })
      if (!res.data.success) return
      dispatch(appStateActions.setUserWalletInfo(res.data.data))
    } catch (err) {
      console.error(err)
    }
  }
}

function setUserWalletInfo (data) {
  return {
    type: 'SET_USER_WALLET_INFO',
    data,
  }
}

function getUserWalletInfo (userData) {
  const { id, token } = userData
  return async (dispatch) => {
    try {
      let res = await axios({
        url: apiPrefix + 'walletandtoken/api/v1/wallets/query',
        method: 'GET',
        params: {user_id: id}
      })
      if (!res.data.success || !res.data.data.count) { //如果用户是第一次注册登录，则给他创建钱包
        return dispatch(appStateActions.createUserWallet(token))
      }
      dispatch(appStateActions.setUserWalletInfo(res.data.data.rows[0]))
    } catch (err) {
      console.error(err)
    }
  }
}

function isLoading (data) {
  return dispatch => {
    dispatch({
      type: 'IS_LOADING',
      data,
    })
  }
}

function getLatestVersion () {
  return async (dispatch) => {
    try {
      let res = await axios({
        url: apiPrefix + 'wallet_system/api/v1/version',
        method: 'GET',
        params: {order: '-created_at'},
        token: false
      })
      console.log('version:' + window.now_version)
      let lastestVersion = (res.data.data && res.data.data.results[0]) || {}
      if (
        lastestVersion.version &&
        lastestVersion.version !== window.now_version //有新版本
      ) {
        dispatch(appStateActions.setVersionMsg(lastestVersion)) //把最新的版本信息存储在redux里
        setTimeout(() => {
          dispatch(appStateActions.switchVersionModalStatus(true)) //展示版本更新提示modal
        }, 500)
        return true
      }
      return false
    } catch (err) {
      console.error(err)
      return false
    }
  }
}

function setVersionMsg (data) {
  return {
    type: 'SET_VERSION_MSG',
    data
  }
}

function getUserInfo (params) {
  return async dispatch => {
    try {
      let res = await axios({
        url: apiPrefix + 'account/api/v1/find/account',
        method: 'GET',
        params,
        token: false,
      })
      if (res.data.success) {
        dispatch(appStateActions.updateVerification(res.data.data.verification)) //更新用户认证等级
      }
    } catch (err) {
      console.error(err)
    }
  }
}

function switchLanguage (data) {
  return {
    type: 'SWITCH_LANGUAGE',
    data
  }
}

function setLocale (data) {
  return (dispatch) => {
    dispatch(appStateActions.switchLanguage(data))
    dispatch({
      type: 'SET_LOCALE',
      data
    })
  }
}
