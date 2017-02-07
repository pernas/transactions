import React, {Component} from 'react';
import { map, addIndex } from 'ramda';
import RaisedButton from 'material-ui/RaisedButton';
// import {List, ListItem} from 'material-ui/List';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
// import ActionGrade from 'material-ui/svg-icons/action/grade'
// import Avatar from 'material-ui/Avatar'
// import {pinkA200} from 'material-ui/styles/colors'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
// import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import InfiniteScroll from 'react-infinite-scroller';


const TransactionList = (props) => {

  const mapI = addIndex(map)
  const header =
    <TableHeader displaySelectAll={false}>
      <TableRow>
        <TableHeaderColumn>Date</TableHeaderColumn>
        <TableHeaderColumn>Transaction Hash</TableHeaderColumn>
        <TableHeaderColumn>From</TableHeaderColumn>
        <TableHeaderColumn>To</TableHeaderColumn>
        <TableHeaderColumn>Value</TableHeaderColumn>
      </TableRow>
    </TableHeader>

  const input = (i, id) => (
    <li key={id}> { `${i.prev_out.addr}` } </li>
  )

  const output = (o, id) => (
    <li key={id}> { `${o.addr}` } </li>
  )

  const txRow = (tx, id) => (
    <TableRow key={id}>
      <TableRowColumn> { new Date(tx.time * 1000).toGMTString() } </TableRowColumn>
      <TableRowColumn> {tx.hash} </TableRowColumn>
      <TableRowColumn> <ul> {mapI(input, tx.inputs)} </ul> </TableRowColumn>
      <TableRowColumn> <ul> {mapI(output, tx.out)} </ul> </TableRowColumn>
      <TableRowColumn> <RaisedButton primary={tx.result >= 0} secondary={tx.result < 0} label={tx.result} /> </TableRowColumn>
    </TableRow>
  )

  const body = <TableBody displayRowCheckbox={false}> { mapI(txRow, props.transactions.data) } </TableBody>
  const tableView = <Table allRowsSelected={false}> {header} {body} </Table>
  // ///////////////////////////////////////////////////////////////////////////
  const toolBar =
    <Toolbar>
      <ToolbarGroup firstChild={true}>
        <ToolbarTitle text="Transactions" />
        <FontIcon className="muidocs-icon-custom-sort" />
        <ToolbarSeparator />
        <RaisedButton label={props.transactions.info.address} primary={true} />
        <IconMenu
          iconButtonElement={
            <IconButton touch={true}>
              <NavigationExpandMoreIcon />
            </IconButton>
          }
        >
          <MenuItem primaryText={"balance: " + props.transactions.info.final_balance} />
          <MenuItem primaryText={"transactions: " + props.transactions.data.length + ' / ' + props.transactions.info.n_tx} />
          <MenuItem primaryText={"sent: " + props.transactions.info.total_sent} />
          <MenuItem primaryText={"received: " + props.transactions.info.total_received} />
        </IconMenu>
      </ToolbarGroup>
    </Toolbar>

  // ///////////////////////////////////////////////////////////////////////////
    return (
    <div className="view-container">
      <InfiniteScroll
        pageStart={0}
        loadMore={props.loadMoreTransactions.bind(this, props.transactions.data.length)}
        hasMore={true || false}
        loader={<div className="loader">Loading ...</div>}
      >
      {toolBar}
      {tableView}
    </InfiniteScroll>
    </div>
  )
}

// TransactionList.propTypes = {
  // transactions: React.PropTypes.array.isRequired
  // username: React.PropTypes.string,
  // width: React.PropTypes.number.isRequired
// }


export default TransactionList


// onScroll={props.loadMoreTransactions.bind(this, props.transactions.data.length)}
