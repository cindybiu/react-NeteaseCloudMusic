import React, { Fragment } from 'react'
import CSSModules from 'react-css-modules'
// import BaseNavBar from '../baseNavBar'
import Header from './header'
import styles from './index.scss'

class PaygeLayout extends React.PureComponent {
  render () {
    const defaultHeader = {
      titleContent: this.props.title
    }
    const {
      children,
      leftContent,
      rightContent,
      headerProps = defaultHeader,
      // showNavBar = false,
      showHeader = true,
      showLeft,
      leftIcon, //左侧图标
      leftClick, //左侧点击事件
      customStyles = {},
      headerStyles = {}
    } = this.props
    const { titleContent } = headerProps
    const stys = !showHeader ? {...customStyles, paddingTop: 0} : customStyles
    return (
      <Fragment>
        {showHeader && (
          <Header
            headerStyles={headerStyles}
            leftClick={leftClick}
            leftIcon={leftIcon}
            showLeft={showLeft}
            leftContent={leftContent}
            titleContent={titleContent}
            rightContent={rightContent}
          />
        )}
        <div styleName="pageBodyCon" style={stys} ref={ ref => this.$pageBody = ref }>{children}</div>
        {/* {showNavBar === true ? <BaseNavBar /> : (!showNavBar ? null : showNavBar) } */}
      </Fragment>
    )
  }
}

const BasicLayoutWrapper = CSSModules(PaygeLayout, styles)
export default BasicLayoutWrapper
