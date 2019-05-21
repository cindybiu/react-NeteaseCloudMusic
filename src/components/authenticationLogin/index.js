import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { Route } from 'react-router-dom'

class AuthenticationLogin extends React.Component {
  /* componentWillMount () {
    const { userInfo, history } = this.props

    if (!this.props.isFirstIn) { // 用户第一次进来路由跳转到引导页，后面就不需要
      history.push('/startupPage')
      return
    }
    if (!userInfo.id) history.push('/login')
  } */

  render () {
    /* const { userInfo } = this.props
    if (!userInfo.id) return null */
    return <Route {...this.props} />
  }
}

let mapStateToProps = (state) => {
  return {
    isFirstIn: state.mockingbird.isFirstIn,
    userInfo: state.mockingbird.userInfo
  }
}

export default compose(withRouter, connect(mapStateToProps))(AuthenticationLogin)
