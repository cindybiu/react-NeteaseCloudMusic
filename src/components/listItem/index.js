// list 左右布局
import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.scss'
class ListItem extends React.Component {
  render () {
    const { leftContent, rightContent } = this.props
    return (
      <div styleName='list_tile'>
        <div styleName='left'>{leftContent}</div>
        <div>{rightContent}</div>
      </div>
    )
  }

}

const Wrapper = CSSModules(ListItem, styles, {allowMultiple: true})
export default Wrapper
