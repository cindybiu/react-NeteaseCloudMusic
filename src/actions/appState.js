import axios from '../config/axiosConfig'

export const appStateActions = {
  showToastIndication,
  hideToastIndication,
  showLoading,
  hideLoading,
  setUserInfo,
  clearUserInfo,

  register,
  isLoading,
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

function isLoading (data) {
  return dispatch => {
    dispatch({
      type: 'IS_LOADING',
      data,
    })
  }
}
