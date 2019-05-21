import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import 'lib-flexible'
import FastClick from 'fastclick'
import windowOnListener from './windowOnListener'
import envConfig from 'apiConfig'

const { env } = envConfig

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

console.log(`当前开发环境： ${process.env.NODE_ENV}`)
if (process.env.NODE_ENV === 'production') {
  const fundebug = require('fundebug-javascript')
  fundebug.apikey =
    '8cbffc3c15fb56567aa0b85694c1b30d080f4c931d24cf628b195e381efaea9a'
}

if (env === 'test') {
  const VConsole = require('../node_modules/vconsole/dist/vconsole.min.js')
  new VConsole() //开发模式下开启调试工具
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
windowOnListener()
