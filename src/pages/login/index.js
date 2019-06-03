import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import styles from './index.scss'
import PaygeLayout from 'components/paygeLayout'
import { actions } from '../../actions'
import { compose } from 'recompose'
import { request } from 'apiRequest' 
import { withRouter } from 'react-router'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: '',
      passwd: ''
    }
  }

  handelChangeUser = (e) => {
    const value = e.target.value
    this.setState({
      user: value
    })
  }

  handelChangePasswd = (e) => {
    const value = e.target.value
    this.setState({
      passwd: value
    })
  }

  onLogin = async () => {
    const { user, passwd } = this.state
    const { showToastIndication, setUserInfo } = this.props 
    const params = {
      phone: user,
      password: passwd
    }
    const res = await request.login(params)
    if (!res) { 
      showToastIndication('账号或者密码错误') 
    } else {
      const userInfo = await request.getUserInfo(res.account.id)
      const userStore = { // 获取用户信息
        id: userInfo.userPoint.userId,
        nickname: userInfo.profile.nickname,
        level: userInfo.level,
        avatarUrl: userInfo.profile.avatarUrl,
      } 
      setUserInfo(userStore)
      return this.props.history.push('/')
    }
  }
  
  render () {
    const { user, passwd } = this.state
    return (
      <PaygeLayout title='手机号登录'>
        <div styleName='login_wraper'>
          <div styleName='item'>
            <input type="text" value={user} onChange={this.handelChangeUser} styleName={`${user ? 'fill' : ''}`}/>
            <label>用户名</label>
          </div>
          <div styleName='item'>
            <input type="password" value={passwd} onChange={this.handelChangePasswd} styleName={`${passwd ? 'fill' : ''}`}/>
            <label>密码</label>
          </div>
        </div>
        <div styleName='forget'>忘记密码?</div>
        <div styleName='button_wraper'>
          <button onClick={this.onLogin}>登录</button>
        </div>
      </PaygeLayout>
    )
  }

  componentWillMount () {
    const { clearUserInfo } = this.props
    clearUserInfo()
  }
}
let mapStateToProps = () => {
  return {
   
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    showToastIndication: (msg) => dispatch(actions.showToastIndication(msg)),
    setUserInfo: (data) => dispatch(actions.setUserInfo(data)),
    clearUserInfo: () => dispatch(actions.clearUserInfo()),
  }
}

const Wrapper = CSSModules(Login, styles, {allowMultiple: true})
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Wrapper)
