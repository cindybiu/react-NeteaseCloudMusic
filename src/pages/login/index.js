import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.scss'
import PaygeLayout from 'components/paygeLayout'

class Login extends React.Component {
  state = {
  }

  
  render () {
    return (
      <PaygeLayout></PaygeLayout>
    )
  }
}

const Wrapper = CSSModules(Login, styles, {allowMultiple: true})
export default Wrapper
