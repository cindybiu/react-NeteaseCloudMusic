import React from 'react'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import Iconfont from '../../iconfont'
import CSSModules from "react-css-modules"
import styles from './index.scss'

class HeaderLeft extends React.PureComponent {
  goBack = () => {
    const { history } = this.props
    return history.go(-1)
  }

  render () {
    const { leftIcon='iconfanhui', leftClick=this.goBack } = this.props
    return (
      <span onClick={leftClick}>
        <Iconfont cls={leftIcon} className={styles['back']} />
      </span>
    )
  }
}

const HeaderLeftWrapper = CSSModules(HeaderLeft, styles)
export default compose(
  withRouter
)(HeaderLeftWrapper)