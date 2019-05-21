import { BigNumber } from 'bignumber.js'

// toString
export function bnToString(value) {
  return BigNumber(value).toString(10)
}

// toNumber
export function bnToNumber(value) {
  return BigNumber(value).toNumber(10)
}

// add累加
export function bnPlus() {
  const arr = Array.from(arguments)
  let total = BigNumber('0')
  arr.map(item => (total = BigNumber(item).plus(total)))
  return total.toNumber(10)
}

// 两个数相乘
export function bnToMul(value1, value2 = 1) {
  return BigNumber(value1)
    .multipliedBy(BigNumber(value2))
    .toNumber(10)
}

// 两个数相除
export function bignumDiv(value1, value2) {
  return BigNumber(value1)
    .dividedBy(BigNumber(value2))
    .toNumber(10)
}

// toFixed
export function bignumToFixed(value, flag = false, decimal = 4) {
  const flaged = !flag ? 1 : 0 // 1 表示不四舍五入
  return BigNumber(value).toFixed(decimal, flaged)
}
