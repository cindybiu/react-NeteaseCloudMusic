import { BigNumber } from 'bignumber.js';
import moment from 'moment';

const abi = require('human-standard-token-abi');
const ethUtil = require('ethereumjs-util');
const hexToBn = require('../../app/scripts/lib/hex-to-bn');
const vreme = new (require('vreme'))();

const MIN_GAS_PRICE_GWEI_BN = new ethUtil.BN(1);
const GWEI_FACTOR = new ethUtil.BN(1e9);
const MIN_GAS_PRICE_BN = MIN_GAS_PRICE_GWEI_BN.mul(GWEI_FACTOR);
const precision = 1e8

// formatData :: ( date: <Unix Timestamp> ) -> String
function formatDate(date) {
  return vreme.format(new Date(date), 'March 16 2014 14:30');
}

var valueTable = {
  wei: '1000000000000000000',
  kwei: '1000000000000000',
  mwei: '1000000000000',
  gwei: '1000000000',
  szabo: '1000000',
  finney: '1000',
  ether: '1',
  kether: '0.001',
  mether: '0.000001',
  gether: '0.000000001',
  tether: '0.000000000001'
};
var bnTable = {};
for (var currency in valueTable) {
  bnTable[currency] = new ethUtil.BN(valueTable[currency], 10);
}

module.exports = {
  addressFilter: addressFilter,
  valuesFor: valuesFor,
  addressSummary: addressSummary,
  miniAddressSummary: miniAddressSummary,
  isAllOneCase: isAllOneCase,
  isValidAddress: isValidAddress,
  numericBalance: numericBalance,
  parseBalance: parseBalance,
  formatBalance: formatBalance,
  formatTokenValue: formatTokenValue, // gzb add for JPush
  generateBalanceObject: generateBalanceObject,
  dataSize: dataSize,
  readableDate: readableDate,
  normalizeToWei: normalizeToWei,
  normalizeEthStringToWei: normalizeEthStringToWei,
  normalizeNumberToWei: normalizeNumberToWei,
  valueTable: valueTable,
  bnTable: bnTable,
  isHex: isHex,
  formatDate,
  bnMultiplyByFraction,
  getTxFeeBn,
  shortenBalance,
  getContractAtAddress,
  exportAsFile: exportAsFile,
  isInvalidChecksumAddress,
  allNull,
  getTokenAddressFromTokenObject,
  checksumAddress,
  getLocalDate,
  getIntervalTime,
  bignum,
  bigNumAdd,
  bigNumMinus,
  minusDecimal,
  plusDecimal,
  filterConstants,
  momentFormat,
  formatPhone,
  bignumToFixed,
  exceed,
  isEmail,
  divPrecision,
  div,
  multiply,
  multiplyPrecision
};

function addressFilter(address) {
  const content = address;
  address = address.toLowerCase();
  if (address.startsWith('ethereum:')) {
    address = address.substring('ethereum:'.length);
  } else if (address.startsWith('0x')) {
    // nothing todo
  } else if (address.startsWith('{')) {
    const data = JSON.parse(content); // {"accountAddress":"0xefe5173d8b1058747aec846863180f3475d73ccc"}
    address = data.accountAddress;
  } else {
    address = '0x' + address;
  }

  return address;
}

function valuesFor(obj) {
  if (!obj) return [];
  return Object.keys(obj).map(function(key) {
    return obj[key];
  });
}

function addressSummary(address, firstSegLength = 10, lastSegLength = 4, includeHex = true) {
  if (!address) return '';
  let checked = checksumAddress(address);
  if (!includeHex) {
    checked = ethUtil.stripHexPrefix(checked);
  }
  return checked
    ? checked.slice(0, firstSegLength) + '...' + checked.slice(checked.length - lastSegLength)
    : '...';
}

function miniAddressSummary(address) {
  if (!address) return '';
  var checked = checksumAddress(address);
  return checked ? checked.slice(0, 4) + '...' + checked.slice(-4) : '...';
}

function isValidAddress(address) {
  var prefixed = ethUtil.addHexPrefix(address);
  if (address === '0x0000000000000000000000000000000000000000') return false;
  return (
    (isAllOneCase(prefixed) && ethUtil.isValidAddress(prefixed)) ||
    ethUtil.isValidChecksumAddress(prefixed)
  );
}

function isInvalidChecksumAddress(address) {
  var prefixed = ethUtil.addHexPrefix(address);
  if (address === '0x0000000000000000000000000000000000000000') return false;
  return (
    !isAllOneCase(prefixed) &&
    !ethUtil.isValidChecksumAddress(prefixed) &&
    ethUtil.isValidAddress(prefixed)
  );
}

function isAllOneCase(address) {
  if (!address) return true;
  var lower = address.toLowerCase();
  var upper = address.toUpperCase();
  return address === lower || address === upper;
}

// Takes wei Hex, returns wei BN, even if input is null
function numericBalance(balance) {
  if (!balance) return new ethUtil.BN(0, 16);
  var stripped = ethUtil.stripHexPrefix(balance);
  return new ethUtil.BN(stripped, 16);
}

// Takes  hex, returns [beforeDecimal, afterDecimal]
function parseBalance(balance) {
  var beforeDecimal, afterDecimal;
  const wei = numericBalance(balance);
  var weiString = wei.toString();
  const trailingZeros = /0+$/;

  beforeDecimal = weiString.length > 18 ? weiString.slice(0, weiString.length - 18) : '0';
  afterDecimal = ('000000000000000000' + wei).slice(-18).replace(trailingZeros, '');
  if (afterDecimal === '') {
    afterDecimal = '0';
  }
  return [beforeDecimal, afterDecimal];
}

// 把以太坊余额十六进制格式转化成以ETH为单位的货币格式  edit by SYI
/**
 * [formatBalance description]
 * @param  {[type]}  balance        [description]
 * @param  {[type]}  decimalsToKeep [description]
 * @param  {Boolean} needsParse     [description]
 * @return {[type]}                 [description]
 */
function formatBalance(balance, decimalsToKeep, needsParse = true) {
  var parsed = needsParse ? parseBalance(balance) : balance.split('.');
  var beforeDecimal = parsed[0];
  var afterDecimal = parsed[1];
  var formatted = 'None';
  if (decimalsToKeep === undefined) {
    if (beforeDecimal === '0') {
      if (afterDecimal !== '0') {
        var sigFigs = afterDecimal.match(/^0*(.{2})/); // default: grabs 2 most significant digits
        if (sigFigs) {
          afterDecimal = sigFigs[0];
        }
        formatted = '0.' + afterDecimal + ' ETH';
      }
    } else {
      formatted = beforeDecimal + '.' + afterDecimal.slice(0, 3) + ' ETH';
    }
  } else {
    afterDecimal += Array(decimalsToKeep).join('0');
    formatted = beforeDecimal + '.' + afterDecimal.slice(0, decimalsToKeep) + ' ETH';
  }

  return formatted;
}

// gzb add for JPush
function formatTokenValue(balance, symbol, decimalsToKeep, needsParse = true) {
  var parsed = needsParse ? parseBalance(balance) : balance.split('.');
  var beforeDecimal = parsed[0];
  var afterDecimal = parsed[1];

  if (afterDecimal === undefined) {
    return beforeDecimal + ' ' + symbol;
  }

  var formatted = 'None';
  if (decimalsToKeep === undefined) {
    if (beforeDecimal === '0') {
      if (afterDecimal !== '0') {
        var sigFigs = afterDecimal.match(/^0*(.{2})/); // default: grabs 2 most significant digits
        if (sigFigs) {
          afterDecimal = sigFigs[0];
        }
        formatted = '0.' + afterDecimal + ' ' + symbol;
      }
    } else {
      formatted = beforeDecimal + '.' + afterDecimal.slice(0, 3) + ' ' + symbol;
    }
  } else {
    afterDecimal += Array(decimalsToKeep).join('0');
    formatted = beforeDecimal + '.' + afterDecimal.slice(0, decimalsToKeep) + ' ' + symbol;
  }
  return formatted;
}

// Takes wei hex, returns an object with three properties.
// Its "formatted" property is what we generally use to render values.
// 不实用的方法函数
/**
 * [generateBalanceObject description]
 * @param  {[type]} formattedBalance [description]
 * @param  {Number} decimalsToKeep   [description]
 * @return {[type]}                  [description]
 */
function generateBalanceObject(formattedBalance, decimalsToKeep = 1) {
  var balance = formattedBalance.split(' ')[0];
  var label = formattedBalance.split(' ')[1];
  var beforeDecimal = balance.split('.')[0];
  var afterDecimal = balance.split('.')[1];
  var shortBalance = shortenBalance(balance, decimalsToKeep);

  if (beforeDecimal === '0' && afterDecimal.substr(0, 5) === '00000') {
    // eslint-disable-next-line eqeqeq
    if (afterDecimal == 0) {
      balance = '0';
    } else {
      balance = '<1.0e-5';
    }
  } else if (beforeDecimal !== '0') {
    balance = `${beforeDecimal}.${afterDecimal.slice(0, decimalsToKeep)}`;
  }

  return { balance, label, shortBalance };
}

function shortenBalance(balance, decimalsToKeep = 1) {
  var truncatedValue;
  var convertedBalance = parseFloat(balance);
  if (convertedBalance > 1000000) {
    truncatedValue = (balance / 1000000).toFixed(decimalsToKeep);
    return `${truncatedValue}m`;
  } else if (convertedBalance > 1000) {
    truncatedValue = (balance / 1000).toFixed(decimalsToKeep);
    return `${truncatedValue}k`;
  } else if (convertedBalance === 0) {
    return '0';
  } else if (convertedBalance < 0.001) {
    return '<0.001';
  } else if (convertedBalance < 1) {
    var stringBalance = convertedBalance.toString();
    if (stringBalance.split('.')[1].length > 3) {
      return convertedBalance.toFixed(3);
    } else {
      return stringBalance;
    }
  } else {
    return convertedBalance.toFixed(decimalsToKeep);
  }
}

function dataSize(data) {
  var size = data ? ethUtil.stripHexPrefix(data).length : 0;
  return size + ' bytes';
}

// Takes a BN and an ethereum currency name,
// returns a BN in wei
function normalizeToWei(amount, currency) {
  try {
    return amount.mul(bnTable.wei).div(bnTable[currency]);
  } catch (e) {}
  return amount;
}

function normalizeEthStringToWei(str) {
  const parts = str.split('.');
  let eth = new ethUtil.BN(parts[0], 10).mul(bnTable.wei);
  if (parts[1]) {
    var decimal = parts[1];
    while (decimal.length < 18) {
      decimal += '0';
    }
    if (decimal.length > 18) {
      decimal = decimal.slice(0, 18);
    }
    const decimalBN = new ethUtil.BN(decimal, 10);
    eth = eth.add(decimalBN);
  }
  return eth;
}

var multiple = new ethUtil.BN('10000', 10);
function normalizeNumberToWei(n, currency) {
  var enlarged = n * 10000;
  var amount = new ethUtil.BN(String(enlarged), 10);
  return normalizeToWei(amount, currency).div(multiple);
}

function readableDate(ms) {
  var date = new Date(ms);
  var month = date.getMonth();
  var day = date.getDate();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = '0' + date.getMinutes();
  var seconds = '0' + date.getSeconds();

  var dateStr = `${month}/${day}/${year}`;
  var time = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
  return `${dateStr} ${time}`;
}

function isHex(str) {
  return Boolean(str.match(/^(0x)?[0-9a-fA-F]+$/));
}

function bnMultiplyByFraction(targetBN, numerator, denominator) {
  const numBN = new ethUtil.BN(numerator);
  const denomBN = new ethUtil.BN(denominator);
  return targetBN.mul(numBN).div(denomBN);
}

function getTxFeeBn(gas, gasPrice = MIN_GAS_PRICE_BN.toString(16), blockGasLimit) {
  const gasBn = hexToBn(gas);
  const gasPriceBn = hexToBn(gasPrice);
  const txFeeBn = gasBn.mul(gasPriceBn);

  return txFeeBn.toString(16);
}

function getContractAtAddress(tokenAddress) {
  return global.eth.contract(abi).at(tokenAddress);
}

function exportAsFile(filename, data) {
  // source: https://stackoverflow.com/a/33542499 by Ludovic Feltz
  const blob = new Blob([data], { type: 'text/csv' });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const elem = window.document.createElement('a');
    elem.target = '_blank';
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}

function allNull(obj) {
  return Object.entries(obj).every(([key, value]) => value === null);
}

function getTokenAddressFromTokenObject(token) {
  return Object.values(token)[0].address.toLowerCase();
}

// zyq add for switch locale date
function getLocalDate(timePara, local) {
  if (!timePara) return;
  const timeInfo = formatDate(String(new Date(timePara)));
  if (local === 'zh_CN') {
    const monthObj = {
      january: '01',
      february: '02',
      march: '03',
      april: '04',
      may: '05',
      june: '06',
      july: '07',
      august: '08',
      september: '09',
      october: '10',
      november: '11',
      december: '12'
    };
    const dateArray = timeInfo.split(' ');
    const month = monthObj[dateArray[0].toLowerCase()];
    const chinaDate = `${dateArray[2]}-${month}-${dateArray[1]} ${dateArray.pop()}`;
    return chinaDate;
  } else {
    return timeInfo;
  }
}

// zyq add for discover-module calculate diffTime
function getIntervalTime(intervalTime, createTime, currentYears) {
  var $interval;
  var days, years, months, hours, minutes, leave1, leave2;

  days = Math.floor(intervalTime / (24 * 3600 * 1000)); /* 相差天数*/
  leave1 = intervalTime % (24 * 3600 * 1000); /* 计算天数后剩余的毫秒数*/
  hours = Math.floor(leave1 / (3600 * 1000)); /* 相差小时数*/
  leave2 = leave1 % (3600 * 1000); /* 计算小时数后剩余的毫秒数*/
  minutes = Math.floor(leave2 / (60 * 1000)); /* 相差分钟数*/

  if (days === 0) {
    if (hours === 0) {
      $interval = minutes === 0 ? '刚刚' : minutes + '分钟前';
    } else {
      $interval = hours + '小时前';
    }
  } else {
    if (days > 3) {
      years = createTime.getFullYear();
      months = createTime.getMonth() + 1; /* 月份从0月开始 */
      days = createTime.getDate();
      if (years === currentYears) {
        $interval = months + '月' + days + '日';
      } else {
        $interval = years + '年' + months + '月' + days + '日';
      }
    } else {
      $interval = days + '天前';
    }
  }
  return $interval;
}

/**
 * Safely checksumms a potentially-null address
 *
 * @param {String} [address] - address to checksum
 * @returns {String} - checksummed address
 */
function checksumAddress(address) {
  return address ? ethUtil.toChecksumAddress(address) : '';
}

function exceed(valued, len = 7) {
  const value = valued.toString();
  if (value.indexOf('.') !== -1 && value.split('.')[1].length > len) return false;
  return true;
}

function bignum(value) {
  return new BigNumber(value);
}

function bigNumAdd(val1, val2) {
  // return bignum(val1).plus(bignum(val2)).toNumber(10) // editby zjs 位数超过一定数量时会报错
  return bignum(val1)
    .plus(bignum(val2))
    .toString(10);
}

function bigNumMinus(val1, val2) {
  return bignum(val1)
    .minus(bignum(val2))
    .toString(10);
}

/**
 * add by zjs: bigNumber.toFixed()
 * @param {*} value
 * @param {boolean} flag 最后一位是否进1
 * @param {*} decimal 保留的精度位数
 */
function bignumToFixed(value, flag = false, decimal = 7) {
  const valueStr = bignum(value);
  const flaged = !flag ? 1 : 0;
  const valued = value.toString();
  if (valued.indexOf('.') !== -1 && valued.split('.')[1].length > decimal) {
    return valueStr.toFixed(decimal, flaged);
  }
  return value;
}

// add by zjs 去掉精度
function minusDecimal(value, decimalNum = 18) {
  console.log('aaaaaaaaaaaaaaaaaa')
  if (value === '' || value === void (0)) return ''
  const decimal = bignum('10').pow(bignum(`${decimalNum}`));
  // 保留小数点10位
  // return string.substr(0, string.indexOf('.') + 11);
  return bignum(value)
    .div(decimal)
    .toString(10);
}

// add by zjs 加上精度
function plusDecimal(value, decimalNum = 18) {
  const decimal = bignum('10').pow(bignum(`${decimalNum}`));
  return bignum(value)
    .mul(decimal)
    .toString(10);
}

/**
 * add by zjs 过滤constants
 * @param {object} data 一般为redux的constants
 * @param {string} type 要过滤的类型
 * @param {number} code 要过滤的值
 * @return {object} {desc: 'string'}
 */
function filterConstants(data, type, code) {
  const filterType = data.filter(item => item.type === type);
  const constant = {};
  filterType.map(item => {
    constant[item.code] = {
      desc: item.description
    };
    if (type === 'userAction') {
      // 金额符号
      if (code === 2 || code === 3 || code === 6) {
        constant[item.code].sign = '-';
      } else {
        constant[item.code].sign = '+';
      }
    }
  });
  return constant[code];
}

// add by zjs
function momentFormat(value) {
  return moment(value).format('YYYY-MM-DD HH:mm:ss');
}

// add by zjs
function formatPhone(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

function isEmail(path) {
  const reg3 = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg3.test(path);
}

function cutDecimal (val, num) {
  const arr = String(val).split('.')
  const floatNum = (arr[1] && arr[1].slice(0, num)) || ''

  if (floatNum) {
    return arr[0] + '.' + floatNum
  }
  return val
}

function div (a, b, toString = true) {
  const prevNum = new BigNumber(a)
  const currentNum = new BigNumber(b)
  const value = prevNum.div(currentNum)
  if (!toString) return value
  return value.toString(10)
}

function divPrecision (val, cut = true) {
  if (val === void (0)) return ''
  let _val = new BigNumber(val).div(precision).toString(10)
  if (!cut) return _val
  return cutDecimal(_val, 4)
}

function multiply (a, b) {
  const prevNum = new BigNumber(a)
  const currentNum = new BigNumber(b)
  return prevNum.mul(currentNum).toNumber(10)
}

function multiplyPrecision (val) {
  return new BigNumber(val).mul(precision).toString(10)
}
