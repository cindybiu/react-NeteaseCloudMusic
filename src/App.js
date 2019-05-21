/* ===================================================
               代码分割@动态导入(只有容器页面需要)
  ================================================== */

import React, { Component } from 'react'
// import Loadable from 'react-loadable'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Toaster from './components/toaster'
import Loading from 'components/loading'
import { actions } from './actions/'
import Find from './containers/find'

/* 这些不懒加载 */
// import Home from './containers/home'
// import Subscription from './containers/subscription'
// import Otc from './containers/otc'
// import Mine from './containers/mine'
// import Login from './pages/login'

// import SubscriptDetail from './containers/subscription/detail'
// import AuthenticationLogin from 'components/authenticationLogin'
// import Payment from './pages/payment' // 付款
// import SetPayPassword from './pages/setPayPassword'


// import Recharge from './pages/recharge'
// import Withdraw from './pages/withdraw'
// import WithdrawApply from './pages/withdrawApply'
// import PersonCenter from './pages/personCenter'
// import IdVerify from './pages/idVerify'
// import FaceRecognition from './pages/faceRecognition'

// const loadableDefalutConfig = {loading: Loading, delay: 4000, timeout: 10000}

// 动态导入
// const Register = Loadable({loader: () => import('./pages/login/register'), ...loadableDefalutConfig})
// const OrderRecord = Loadable({loader: () => import('./pages/orderRecord'), ...loadableDefalutConfig})
// const OrderDetail = Loadable({loader: () => import('./pages/orderDetail'), ...loadableDefalutConfig})
// const PaymentMethod = Loadable({loader: () => import('./pages/paymentMethod'), ...loadableDefalutConfig})
// const AddPayment = Loadable({loader: () => import('./pages/addPayment'), ...loadableDefalutConfig})
// const AddForm = Loadable({loader: () => import('./pages/addPayment/addPages/addForm'), ...loadableDefalutConfig})
// const Transfer = Loadable({loader: () => import('./pages/transfer'), ...loadableDefalutConfig})
// const SecurityCenter = Loadable({loader: () => import('./pages/securityCenter'), ...loadableDefalutConfig })
// const GetbackPassword = Loadable({loader: () => import('./pages/login/getbackPassword'), ...loadableDefalutConfig})
// const mySubscribe = Loadable({loader: () => import('./pages/mySubscribe'), ...loadableDefalutConfig})
// const LendingRecord = Loadable({loader: () => import('./pages/lendingRecord'), ...loadableDefalutConfig})

class App extends Component {

  componentWillMount () {
  }

  render () {
    const { toast: { toasting, toastMsg, position, style }, isLoading, loadingText, language, showAnnouncement } = this.props
    const showToast = !showAnnouncement && toasting

    return (
      <div className="App">
        {
          isLoading && <Loading loadingText={language[loadingText]} />
        }
        {showToast && (
          <Toaster content={language[toastMsg] || toastMsg} position={position} style={style} />
        )}
        <Router>
          <Switch>
            <Route exact path="/" component={Find} />
            {/*AuthenticationLogin 需要登录才能访问的页面*/}
            {/* {<AuthenticationLogin exact path="/" component={Home}></AuthenticationLogin>}
            <AuthenticationLogin exact path="/subscription" component={Subscription}></AuthenticationLogin>
            <AuthenticationLogin exact path="/otc" component={Otc} />
            <AuthenticationLogin exact path="/mine" component={Mine} />
            <AuthenticationLogin exact path="/payment" component={Payment} />
            <AuthenticationLogin exact path="/orderRecord" component={OrderRecord} />
            <AuthenticationLogin exact path="/orderDetail" component={OrderDetail} />
            <AuthenticationLogin exact path="/paymentMethod" component={PaymentMethod} />
            <AuthenticationLogin exact path="/addPayment" component={AddPayment} />
            <AuthenticationLogin exact path="/addPayment/:type" component={AddForm} />
            <AuthenticationLogin exact path="/transfer" component={Transfer} />
            <AuthenticationLogin exact path="/securityCenter" component={SecurityCenter} />
            <AuthenticationLogin exact path="/mySubscribe" component={mySubscribe} />
            <AuthenticationLogin exact path='/setPayPassword' component={SetPayPassword} />
            <AuthenticationLogin exact path='/lendingRecord' component={LendingRecord} />
            <Route exact path="/subscription/detail" component={SubscriptDetail} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/recharge" component={Recharge} />
            <Route exact path="/withdraw" component={Withdraw} />
            <Route exact path="/withdrawApply" component={WithdrawApply} />
            <Route exact path="/personCenter" component={PersonCenter} />
            <Route exact path="/idVerify" component={IdVerify} />
            <Route exact path="/faceRecognition" component={FaceRecognition} />
            <Route exact path="/getback-password/:type" component={GetbackPassword} /> */}
          </Switch>
        </Router>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    toast: state.appState.toast,
    isLoading: state.appState.isLoading,
    loadingText: state.appState.loadingText,
    locale: state.mockingbird.locale,
    language: state.appState.language,
    showAnnouncement: state.appState.showAnnouncement
  }
}

function mapDispatchToProps (dispatch) {
  return {
    switchLanguage: data => dispatch(actions.switchLanguage(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

