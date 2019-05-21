import React, { Fragment } from 'react'
import CSSModules from 'react-css-modules'
import Header from 'components/header'
import styles from './index.scss'
class My extends React.Component {
  render () {
    return (
      <Fragment>
        <Header tabId={0}/>
        <div style={{paddingTop: '55px'}}>my</div>
      </Fragment>
    )
  }
}


const Wrapper = CSSModules(My, styles, {allowMultiple: true})
export default Wrapper
