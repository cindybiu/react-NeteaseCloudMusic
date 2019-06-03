import axios from '../config/axiosConfig'

export const appStateActions = {
  showToastIndication,
  hideToastIndication,
  showLoading,
  hideLoading,
  setUserInfo,
  clearUserInfo,

  updateUserInfo,
  register,
  getbackPassword,
  verifyCode,
  getCheckCode,
  getCheckMailCode, //邮箱验证码
  updatePassword,
  registerOk,
  cancelUpgradeVersion,
  updatePayPassword,
  updateLoginPassword,
  resetLoginPassword,
  verifyPayPassword,
  forgetPayPassword,
  isLoading,
  setVersionMsg,
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

function setUserInfo (userInfo) {
  return {
    type: 'LOGIN',
    data: userInfo
  }
}

function clearUserInfo () {
  return dispatch => {
    dispatch({
      type: 'CLEAR_USERINFO'
    })
    dispatch({
      type: 'SET_STORE_USERINFO',
      data: {}
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


function isLoading (data) {
  return dispatch => {
    dispatch({
      type: 'IS_LOADING',
      data,
    })
  }
}

function setVersionMsg (data) {
  return {
    type: 'SET_VERSION_MSG',
    data
  }
}
