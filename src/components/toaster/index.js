import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.scss'

class Toaster extends React.PureComponent {
  render () {
    const { content, position = 'center', style, type = 'default'} = this.props
    return (
      <div styleName={`toaster-wrapper ${type} ${position}`} style={style}>
        {content}
      </div>
    )
  }
}

const ToasterWrapper = CSSModules(Toaster, styles, {allowMultiple: true})
export default ToasterWrapper