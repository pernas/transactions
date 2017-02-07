import React from 'react'
import Header from './Header'
import TransactionListContainer from '../containers/TransactionListContainer'

class Main extends React.Component {
  render () {
    return (
      <div id="page-wrap">
        {/* <Header /> */}
        <TransactionListContainer />
      </div>
    )
  }
}

export default Main
