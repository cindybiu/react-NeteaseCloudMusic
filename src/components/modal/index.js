import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.scss'
import Portal from 'components/portal'
function noop () {}
class Modal extends React.Component {
  static defaultProps = {
    hide: noop
  }

  render () {
    const { hide } = this.props
    return (
      <Portal>
        <div styleName="modal-wrapper" onClick={hide}>
          {this.props.children}
        </div>
      </Portal>
    )
  }
}

const ModalWrapper = CSSModules(Modal, styles)
export default ModalWrapper
