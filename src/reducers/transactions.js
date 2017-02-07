import { RECEIVE_TRANSACTIONS, FETCHING_TRANSACTIONS, ADD_MORE_TRANSACTIONS } from '../actions'

const transactions = (state = { info: {address: 'not loaded', final_balance: 0, n_tx: 0, total_received: 0, total_sent: 0}, data: [], isFetching: false }, action) => {
  switch (action.type) {
    case RECEIVE_TRANSACTIONS: {
      console.log(action.transactions)
      return {
        data: [...action.transactions.txs],
        isFetching: false,
        info: action.transactions.addresses[0]
      }
    }
    case ADD_MORE_TRANSACTIONS: {
      return {
        ...state,
        data: [...state.data, ...action.transactions.txs],
        info: action.transactions.addresses[0]
      }
    }
    case FETCHING_TRANSACTIONS:
      return {
        ...state,
        isFetching: action.isFetching
      }
    default:
      return state
  }
}

export default transactions
