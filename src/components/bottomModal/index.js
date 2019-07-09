import React from 'react'
import CSSModules from 'react-css-modules'
import Modal from 'components/modal'
import styles from './index.scss'

function noop () {}
class BottomModal extends React.Component {
  static defaultProps = {
    onCancel: noop
  }
  state = {
    show: true
  }

  handleClose = () => {
    const { onCancel } = this.props
    onCancel && onCancel()
  }

  stopPropagation = e => {
    e.stopPropagation()
  }

  render () {
    const { show } = this.state
    if (!show) return null
    return (
      <Modal hide={this.handleClose}>
        <div styleName="bottom-modal-wrapper" onClick={this.stopPropagation}>
          {this.props.children}
        </div>
      </Modal>
    )
  }
}

export default CSSModules(BottomModal, styles, { allowMultiple: true })
