/* ===================================================
               代码分割@动态导入(只有容器页面需要)
  ================================================== */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loadable from 'react-loadable'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from 'components/loading'
import Toaster from 'components/toaster'
import Login from './pages/login'
import LoginOut from './pages/login/loginOut'

import Player from './pages/play'

const loadableDefalutConfig = {loading: Loading, delay: 4000, timeout: 10000}
const Find = Loadable({loader: () => import('./containers/find'), ...loadableDefalutConfig})
const My = Loadable({loader: () => import('./containers/my'), ...loadableDefalutConfig})
const Friends = Loadable({loader: () => import('./containers/friends'), ...loadableDefalutConfig})
const Video = Loadable({loader: () => import('./containers/video'), ...loadableDefalutConfig})
const PlaylistDetail = Loadable({loader: () => import('./pages/playlist/detail'), ...loadableDefalutConfig})
class App extends Component {

  componentWillMount () {
  }

  render () {
    const { toast: { toasting, toastMsg, position, style }, isLoading, loadingText, showAnnouncement } = this.props
    const showToast = !showAnnouncement && toasting

    return (
      <div className="App">
        {
          isLoading && <Loading loadingText={loadingText} />
        }
        {showToast && (
          <Toaster content={ toastMsg} position={position} style={style} />
        )}
        <Router>
          <Switch>
            <Route exact path="/" component={Find} />
            <Route exact path="/my" component={My} />
            <Route exact path="/friends" component={Friends} />
            <Route exact path="/video" component={Video} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/loginOut" component={LoginOut} />
            <Route exact path="/playlist/detail/:id" component={PlaylistDetail} />
            {/* <Route exact path="/play" component={Player} /> */}
          </Switch>
        </Router>
        <Player/>
      </div>
    )
  }
}


function mapStateToProps (state) {
  return {
    toast: state.appState.toast,
    showAnnouncement: state.appState.showAnnouncement,
    loadingText: state.appState.loadingText,
    isLoading: state.appState.isLoading,
  }
}



export default connect(mapStateToProps)(App)

