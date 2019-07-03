import React, { Fragment } from 'react'
import CSSModules from 'react-css-modules'
import Header from 'components/header'
import styles from './index.scss'
class Vidoe extends React.Component {
  render () {
    return (
      <Fragment>
        <Header tabId={3}/>
        <div style={{paddingTop: '55px', background: '#eee'}}>
          <div style={{height: '1000px'}}> Vidoe</div>
        </div>
      </Fragment>
    )
  }
  clickHandler () {
    console.log('11111111')
  }

  async componentDidMount () {
    window.addEventListener('scroll', this.clickHandler)
  }
}


const Wrapper = CSSModules(Vidoe, styles, {allowMultiple: true})
export default Wrapper
