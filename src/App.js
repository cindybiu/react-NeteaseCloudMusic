/* ===================================================
               代码分割@动态导入(只有容器页面需要)
  ================================================== */

import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Loading from 'components/loading'

import Find from './containers/find'
import My from './containers/my'
import Friends from './containers/friends'
import Video from './containers/video'

class App extends Component {

  componentWillMount () {
  }

  render () {
    const {  isLoading, loadingText, language } = this.props
  

    return (
      <div className="App">
        {
          isLoading && <Loading loadingText={language[loadingText]} />
        }
        <Router>
          <Switch>
            <Route exact path="/" component={Find} />
            <Route exact path="/my" component={My} />
            <Route exact path="/friends" component={Friends} />
            <Route exact path="/video" component={Video} />
          </Switch>
        </Router>
      </div>
    )
  }
}


export default App

