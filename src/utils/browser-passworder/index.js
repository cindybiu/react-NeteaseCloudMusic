var Unibabel = require('browserify-unibabel')
const md5 = require('md5')
const log = require('loglevel')

module.exports = {

  // Simple encryption methods:
  encrypt,
  decrypt,

  // More advanced encryption methods:
  keyFromPassword,
  encryptWithKey,
  decryptWithKey,

  // Buffer <-> Hex string methods
  serializeBufferForStorage,
  serializeBufferFromStorage,

  generateSalt,
}


function _toBase16 (text) {
  let baseStr = ''
  for (const i in text) {
    baseStr += text[i].charCodeAt().toString(16)
  }
  return baseStr
}

function _fromBase16 (text) {
  let str = ''
  for (let i = 0; i < text.length / 2; ++i) {
    str += String.fromCharCode(parseInt(text.substr(i * 2, 2), 16))
  }
  return str
}

function _xorChar (char1, char2) {
  const code = parseInt(char1, 16) ^ parseInt(char2, 16)
  return code.toString(16)
}

function _xorString (base16Str, salt) {
  let xorString = ''
  for (let i = 0; i < base16Str.length; ++i) {
    const indexSalt = i % salt.length
    const strE = _xorChar(base16Str[i], salt[indexSalt])
    xorString += strE
  }
  log.debug(xorString)
  return xorString
}

// Takes a Pojo, returns cypher text.
function encrypt (password, dataObj) {
  var salt = generateSalt()
  return keyFromPassword(password, salt)
  .then(function (passwordDerivedKey) {
    return encryptWithKey(passwordDerivedKey, dataObj)
  })
  .then(function (payload) {
    payload.salt = salt
    return JSON.stringify(payload)
  }).catch(err => {
    console.log(err)
    const info = {}
    info.salt = md5(password)
    const base16Str = _xorString(_toBase16(JSON.stringify(dataObj)), info.salt)
    info.data = base16Str
    return JSON.stringify(info)
  })
}


// Takes encrypted text, returns the restored Pojo.
function decrypt (password, text) {
  const payload = JSON.parse(text)
  const salt = payload.salt
  return keyFromPassword(password, salt)
  .then(function (key) {
    return decryptWithKey(key, payload)
  }).catch(err => {
    console.log(err)
    const info = JSON.parse(text)
    if (info.salt !== md5(password)) {
      throw new Error('Incorrect password')
    }

    const dataInfo = JSON.parse(_fromBase16(_xorString(info.data, info.salt)))
    return dataInfo
  })
}

function encryptWithKey (key, dataObj) {
  var data = JSON.stringify(dataObj)
  var dataBuffer = Unibabel.utf8ToBuffer(data)
  var vector = global.crypto.getRandomValues(new Uint8Array(16))
  return global.crypto.subtle.encrypt({
    name: 'AES-GCM',
    iv: vector,
  }, key, dataBuffer).then(function (buf) {
    var buffer = new Uint8Array(buf)
    var vectorStr = Unibabel.bufferToBase64(vector)
    var vaultStr = Unibabel.bufferToBase64(buffer)
    return {
      data: vaultStr,
      iv: vectorStr,
    }
  })
}


function decryptWithKey (key, payload) {
  const encryptedData = Unibabel.base64ToBuffer(payload.data)
  const vector = Unibabel.base64ToBuffer(payload.iv)
  return crypto.subtle.decrypt({name: 'AES-GCM', iv: vector}, key, encryptedData)
  .then(function (result) {
    const decryptedData = new Uint8Array(result)
    const decryptedStr = Unibabel.bufferToUtf8(decryptedData)
    const decryptedObj = JSON.parse(decryptedStr)
    return decryptedObj
  })
  .catch(function (reason) {
    throw new Error('Incorrect password')
  })
}

function keyFromPassword (password, salt) {
  var passBuffer = Unibabel.utf8ToBuffer(password)
  var saltBuffer = Unibabel.base64ToBuffer(salt)
  return global.crypto.subtle.importKey(
    'raw',
    passBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  ).then(function (key) {
    return global.crypto.subtle.deriveKey(
      { name: 'PBKDF2',
        salt: saltBuffer,
        iterations: 10000,
        hash: 'SHA-256',
      },
      key,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    )
  })
}

function serializeBufferFromStorage (str) {
  var stripStr = (str.slice(0, 2) === '0x') ? str.slice(2) : str
  var buf = new Uint8Array(stripStr.length / 2)
  for (var i = 0; i < stripStr.length; i += 2) {
    var seg = stripStr.substr(i, 2)
    buf[i / 2] = parseInt(seg, 16)
  }
  return buf
}

// Should return a string, ready for storage, in hex format.
function serializeBufferForStorage (buffer) {
  var result = '0x'
  var len = buffer.length || buffer.byteLength
  for (var i = 0; i < len; i++) {
    result += unprefixedHex(buffer[i])
  }
  return result
}

function unprefixedHex (num) {
  var hex = num.toString(16)
  while (hex.length < 2) {
    hex = '0' + hex
  }
  return hex
}

function generateSalt (byteCount = 32) {
  var view = new Uint8Array(byteCount)
  global.crypto.getRandomValues(view)
  var b64encoded = btoa(String.fromCharCode.apply(null, view))
  return b64encoded
}
