import React from 'react'
import CSSModules from 'react-css-modules'
import { connect } from 'react-redux'
import styles from './index.scss'
import { compose } from 'recompose'
import { request } from 'apiRequest' 
import { withRouter } from 'react-router'
import logo from 'images/logo.png'
import title from 'images/aip.png'

class LoginOut extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
     
    }
  }

  render () {
    return (
      <div styleName='page_wraper'>
        <div styleName='logo_wraper'>
          <img src={logo} alt=""/>
        </div>
        <div styleName='title_wraper'>
          <img src={title} alt=""/>
        </div>
        <div styleName='button_wraper'>
          <button styleName='login' onClick={() => this.props.history.push('login')}>手机号登录</button>
          <button styleName='free' onClick={() => this.props.history.push('')}>立即体验</button>
        </div>
      </div>
    )
  }

  async componentWillMount () {
    const res = await request.logout()
    console.log(res)
  }
}
let mapStateToProps = () => {
  return {
   
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
  }
}

const Wrapper = CSSModules(LoginOut, styles, {allowMultiple: true})
export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Wrapper)
