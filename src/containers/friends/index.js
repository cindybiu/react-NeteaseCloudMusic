import React, { Fragment } from 'react'
import CSSModules from 'react-css-modules'
import Header from 'components/header'
import styles from './index.scss'
class Friends extends React.Component {
  render () {
    return (
      <Fragment>
        <Header tabId={2}/>
        <div style={{paddingTop: '55px'}}>Friends</div>
      </Fragment>
    )
  }
}


const Wrapper = CSSModules(Friends, styles, {allowMultiple: true})
export default Wrapper
