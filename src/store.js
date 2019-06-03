import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'

import { createStore, applyMiddleware, compose } from 'redux'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import reducer from './reducers/'
import envConfig from 'apiConfig'

const { env } = envConfig
// 配置 redux-devtool调试工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// 配置中间件
const middleware = [thunk]
if (env === 'test') middleware.push(logger)
// const store = createStore(reducer, composeEnhancers(
//   applyMiddleware(...middleware)
// ))

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['global'], // 白名单
  blacklist: ['appState'], // 黑名单
  version: 1, // 版本
  debug: false,
  stateReconciler: autoMergeLevel2, //解决初始化数据不能同步的问题
}

let persistedReducer = persistReducer(persistConfig, reducer)

let store = createStore(persistedReducer, /* preloadedState, */
  composeEnhancers(applyMiddleware(...middleware))
)

let persistor = persistStore(store)

export { store, persistor }
