import React, {Component} from 'react'
import TransactionList from '../components/TransactionList'
import * as api from '../api'
import * as actions from '../actions'
import { connect } from 'react-redux'
import {TX_PER_LOAD} from '../config'
// import { withRouter } from 'react-router'


class TransactionListContainer extends Component {
  constructor() {
    super()
    this.walletContext = ['1KuptQBmqEJ4BWVpvPZHXjBPbiURYozhNv','12KyEpvLuzgEXr9rHNFhaKrLra1jmfx5CK','1HsURu3a1N8nMDbjMSHzawiJ9obNbW3pbu','13beLdmPQrvdTDvwNdYHYFMmY4Vq1DHH3Q','1PxQTJeF6PrLTto3QkzZgjEZe4jGHzR9E1','1JQhMst1KyRkji8Gp3AHsVEZAcfzccfbyZ','13GKq3b3jfwjaKgWXLBGs3ynJWSUBuuZ23','16FFsrfKxeKt7JWhtpB4VrGBjQ1kKv5o3p','1PZuicD1ACRfBuKEgp2XaJhVvnwpeETDyn','xpub6DHN1xpggNEUfaV926XgSfRSgRtDx9nE3gEpndGZPwaAjiJzDqQfGGf5vDNZzvQe2ycq5EiUdhcJGzQ3xKL2W6eGCzs8Z2prKqoqxtu1rZC','xpub6DHN1xpggNEV3vp7csZK9kpjW3H1UQijRFA2XUoJG77jnCogqhKPC9e7eM89Ess3ujLVQLmaAicM42AWdWob8ZenHkt6eNUvF7EK5h9hd3c','xpub6DHN1xpggNEV4jSERQX9dZnYQDedLz9S3dkBHHVZwt7VhVuzfQ9VQQ3vVbkXeWZGqoE1X7P2e13UZZ9jGybojgHuuERiUeytxvXFwmaE4Ta','xpub6DHN1xpggNEV8dyMqvRVwQxRGpdCf6D2TFtLMJ76sA3Vmzy1EKKZETwpPCX4cRfRxX2FhMCE7Dcu7LcC4LM8BEz52sL13uwdCMY1cEVF175']
    // this.showUserProfile = this.showUserProfile.bind(this)
    this.addressesOfInterest = ['xpub6DHN1xpggNEUfaV926XgSfRSgRtDx9nE3gEpndGZPwaAjiJzDqQfGGf5vDNZzvQe2ycq5EiUdhcJGzQ3xKL2W6eGCzs8Z2prKqoqxtu1rZC']
    // this.addressesOfInterest = ['1KuptQBmqEJ4BWVpvPZHXjBPbiURYozhNv'];
    this.loadMoreTransactions = this.loadMoreTransactions.bind(this)
  }

  componentDidMount() {
    api
      .getTransactions(this.walletContext, this.addressesOfInterest, 0, TX_PER_LOAD)
      .then((data) => this.props.dispatch(actions.receiveTransactions(data)))
      .catch((err) => { console.log(err)})
  }

  componentWillUnmount(){
    console.log('componentWillUnmount run!')
  }

  loadMoreTransactions(offset) {
    api
      .getTransactions(this.walletContext, this.addressesOfInterest, offset, TX_PER_LOAD)
      .then((data) => this.props.dispatch(actions.addMoreTransactions(data)))
      .catch((err) => { console.log(err)})
  }

  render() {
    return (
      <TransactionList
        {...this.props}
        transactions={this.props.transactions}
        loadMoreTransactions={this.loadMoreTransactions}
      />
    )
  }
}

// TransactionListContainer.propTypes = {
//   params: React.PropTypes.object.isRequired
// }

const mapStateToProps = state => ({
  transactions: state.transactions
})

const mapDispatchToProps = dispatch => ({
  dispatch
})


// export default withRouter(UserListContainer)
export default connect( mapStateToProps
                      , mapDispatchToProps)(TransactionListContainer)
