import React from 'react'
import CSSModules from "react-css-modules"
import { withRouter } from 'react-router-dom'
import styles from './index.scss'
import HeaderLeft from '../headerLeft'

class Header extends React.Component {

  renderHeaderContent = (Content) => {
    const { leftIcon, leftClick } = this.props

    if (typeof Content === 'function') {
      return <Content leftIcon={leftIcon} leftClick={leftClick} />
    }
    return Content
  }

  render () {
    const {
      headerStyles,
      leftContent = HeaderLeft,
      titleContent,
      rightContent
    } = this.props

    return (
      <div style={headerStyles} styleName="header">
        <div styleName="header-left">
          { this.renderHeaderContent(leftContent) }
          <div styleName="title">
            { this.renderHeaderContent(titleContent) }
          </div>
        </div>
        
        <div styleName="header-right">
          { this.renderHeaderContent(rightContent) }
        </div>
      </div>
    )
  }
}

const DemoWrapper = CSSModules(Header, styles)
export default withRouter(DemoWrapper)
