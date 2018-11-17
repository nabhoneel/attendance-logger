import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './Stats.scss';

class Stats extends Component {
  componentDidMount() {
    this.props.fetchLog();
  }

  render() {
    switch(this.props.attendance) {
      case null:
        return '';
      default:
        return (
          <div className="Stats">
            <div className="table-cell table-cell-heading">Going</div>
            <div className="table-cell table-cell-heading">Not Going</div>
            <div className="table-cell table-cell-heading">Undecided</div>

            <div className="table-cell">{this.props.attendance.totalGoing}</div>
            <div className="table-cell">{this.props.attendance.totalNotGoing}</div>
            <div className="table-cell">{this.props.attendance.totalUndecided}</div>
          </div>
        );
    }
  }
}

function mapStateToProps(state) {
  return { attendance: state.attendance };
}

export default connect(mapStateToProps, actions)(Stats);