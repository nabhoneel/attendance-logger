import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './Reason.scss';

class Reason extends Component {
  componentDidMount() {
    this.props.getReason();
  }

  renderReason() {
    switch(this.props.reason) {
      case null:
      case false:
        return (<span style={{color: 'darkgray'}}>loading...</span>);
      default:
        return (this.props.reason.reason);
    }
  }

  renderCreator() {
    switch(this.props.reason) {
      case null:
      case false:
        return (<span style={{color: 'darkgray'}}>loading...</span>);
      default:
        return ('set by ' + this.props.reason.setBy);
    }
  }

  render() {    
    return (
      <div className="Reason">
        <div className="reason-holder">
          {this.renderReason()}          
          {/* <i className="em em-arrows_clockwise"></i> */}
        </div>
        <div className="set-by-holder">
          ({this.renderCreator()})
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reason: state.reason
  }
}

export default connect(mapStateToProps, actions)(Reason);