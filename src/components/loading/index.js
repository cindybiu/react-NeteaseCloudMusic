import React, { Component } from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './index.scss'

class LoadingIndicator extends Component {
  render () {
    const { loadingText = this.props.language['requesting'] } = this.props
    
    return (
      <div styleName='loader-bg'>
        <div styleName="loader-box">
          <div styleName="loader-content"></div>
          <span styleName='loading-text'>{loadingText}</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.appState.language
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const LoadingIndicatorWrapper = CSSModules(LoadingIndicator, styles, {allowMultiple: true})
export default compose(connect(mapStateToProps, mapDispatchToProps))(LoadingIndicatorWrapper)
