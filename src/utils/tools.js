import BigNumber from 'bignumber.js'
import { PRECISION } from 'constants'
import moment from 'moment'

const process = (...first) => {
  class Process { //处理多个有顺序的操作，流程清晰
    constructor (first) {
      this.funcLists = []
      this.next(...first)
    }

    next (fn, params, cb) {
      const obj = {fn, params, cb}
      this.funcLists.push(obj)
      return this
    }

    async firing (index = 0, allPass = true) {
      if (!this.funcLists.length) return
      const loop = async (index, lastRes) => {
        const {fn, params, cb} = this.funcLists[index]
        const res = await fn(params, lastRes)
        cb && cb(res) //执行每个fn的回调
        if (index === this.funcLists.length - 1) return this.end(res)
        if (allPass && (!res || res === false || (res && res.success === false))) return this.end(res)
        return await loop(++index, res)
      }
      return await loop(index)
    }

    end (arg) {
      if (typeof arg === 'function') {
        this.end = arg
        return this
      }
      return arg
    }
  }
  return new Process(first)
}

function pricingTransfer (origin, pricingRate) {
  let money = BigNumber(origin).multipliedBy(pricingRate).toString(10)
  return cutDecimal(+money, 2)
}

function divPrecision (val, config) {
  const defaultConfig = {cut: true, cutNum: 4, symbol: ''}
  const {cut, cutNum, symbol} = {...defaultConfig, ...config}
  if (val === void (0)) return ''
  const _precision = symbol ? PRECISION[symbol] : 1e8
  let _val = BigNumber(val).div(_precision).toString(10)
  if (!cut) return _val
  return cutDecimal(_val, cutNum)
}

function multiplyPrecision (val, symbol) {
  const _precision = symbol ? PRECISION[symbol] : 1e8
  return BigNumber(val).multipliedBy(_precision).toString(10)
}

function setIntervalHandle (fn, delay, context) {
  console.log(delay)

  context.timeId = setTimeout(async function () {
    console.timeEnd('轮询请求的间隔时间：')

    console.time('请求数据耗时时间：')
    await fn()
    // clearTimeout(self.timeId)
    console.timeEnd('请求数据耗时时间：')

    console.time('轮询请求的间隔时间：')
    context.timeId = setTimeout(function () {
      setIntervalHandle(fn, delay, context)
    }, delay)
  }, delay)

}

function cutDecimal (val, num) {
  const arr = String(val).split('.')
  const floatNum = (arr[1] && arr[1].slice(0, num)) || ''

  if (floatNum) {
    return arr[0] + '.' + floatNum
  }
  return val
}

// bignumberjs处理js浮点数计算精度问题方法
function plus (...args) {
  const origin = args[args.length - 1]
  const restArgs = origin === true ? args.slice(0, args.length - 1) : args
  const total = restArgs.reduce((prev, current) => {
    const prevNum = new BigNumber(prev)
    const currentNum = new BigNumber(current)
    return prevNum.plus(currentNum)
  }, 0)
  if (origin === true) return total
  return total.toNumber(10)
}

function times (a, b) {
  const prevNum = new BigNumber(a)
  const currentNum = new BigNumber(b)

  return prevNum.times(currentNum).toNumber(10)
}

function multiply (a, b) {
  const prevNum = new BigNumber(a)
  const currentNum = new BigNumber(b)
  return prevNum.multipliedBy(currentNum).toNumber(10)
}

function div (a, b, toString = true) {
  const prevNum = new BigNumber(a)
  const currentNum = new BigNumber(b)
  const value = prevNum.div(currentNum)
  if (!toString) return value
  return value.toString(10)
}

function getTimeDescript (time, language) {
  let hoursAndMinutes = moment(time).format('HH:mm')
  let hours = hoursAndMinutes.split(':')
  if (+hours[0] <= 12) return `${'上午'} ${hoursAndMinutes}`
  return `${'下午'} ${(+hours[0] - 12)}:${hours[1]}`
}

function getIntervalTime (intervalTime, createTime, currentYears) {
  let $interval
  let days, years, months, hours, minutes, leave1, leave2

  days = Math.floor(intervalTime / (24 * 3600 * 1000)) /*相差天数*/
  leave1 = intervalTime % (24 * 3600 * 1000)    /*计算天数后剩余的毫秒数*/
  hours = Math.floor(leave1 / (3600 * 1000))  /*相差小时数*/
  leave2 = leave1 % (3600*1000)            /*计算小时数后剩余的毫秒数*/
  minutes = Math.floor(leave2 / (60 * 1000)) /*相差分钟数*/

  if (days === 0) {
    if (hours === 0) {
      $interval = ( minutes === 0 ? '刚刚' : minutes + '分钟前' )
    } else {
      $interval = hours + '小时前'
    }
  } else {
	    if (days > 3) {
	        years = createTime.getFullYear()
	        months = createTime.getMonth() + 1  /*月份从0月开始 */
	        days = createTime.getDate()
	        if (years === currentYears) {
	            $interval = months + '月' + days +'日'
	        } else {
	            $interval = years +'年' + months + '月' + days +'日'
	        }
	    } else {
	        $interval = days + '天前'
	    }
  }
  return $interval
}

function isPc () {
  return !(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent))
}

const isPhoneNum = (phone) => {
  const phoneRegExp = /^1[34578]\d{9}$/
  return phoneRegExp.test(phone)
}

const isEmail = (email) => {
  const emailRegExp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  return emailRegExp.test(email)
}

const isIdCard = (idCard) => {
  const idCardRegExp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return idCardRegExp.test(idCard)
}

const required = (val) => { //不能为undefined或者空字符串
  if (val === void (0)) return false
  if (typeof val === 'string') {
    if (val.replace(/^\s+|\s+$/g, '') === '') {
      return false
    }
  }
  return true
}

const queryString = (query) => { // 解析url中的search
  const searchObj = {}
  try {
    const searchArr = query.split('?')[1].split('&')
    for (const search of searchArr) {
      const keyValue = search.split('=')
      searchObj[keyValue[0]] = decodeURI(keyValue[1]) // 解决中文乱码
    }
    return searchObj
  } catch (err) {
    return searchObj
  }
}

// add by zjs 去掉精度
function minusDecimal (value, decimalNum = 18) {
  if (value === '' || value === void (0)) return ''
  const decimal = bignum('10').pow(bignum(`${decimalNum}`))
  // 保留小数点10位
  // return string.substr(0, string.indexOf('.') + 11);
  return bignum(value)
    .div(decimal)
    .toString(10)
}

function bignum (value) {
  return new BigNumber(value)
}

// add by zjs
function momentFormat (value) {
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
}

function getUserMobileLanguage () {
  const language = window.navigator.language // 获取用户设备语言
  switch (language) {
    case 'ko-KR':
      return 'korean'
    case 'ja-JP':
      return 'japanese'
    case 'en-US':
      return 'en'
    case 'zh-TW':
      return 'zh_TW'
    case 'zh-CN':
      return 'zh_CN'
    default:
      return 'zh_CN'
  }
}

export const utils = {
  process,
  setIntervalHandle,
  cutDecimal,
  multiplyPrecision,
  divPrecision,
  plus,
  times,
  div,
  getTimeDescript,
  multiply,
  getIntervalTime,
  isPc,
  isPhoneNum,
  isEmail,
  isIdCard,
  required,
  minusDecimal,
  bignum,
  queryString,
  momentFormat,
  getUserMobileLanguage,
  pricingTransfer
}
