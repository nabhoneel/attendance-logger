import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ChoiceBar.scss';
import * as actions from '../actions';

class ChoiceBar extends Component {  
  render() {
    switch(this.props.auth) {
      case null:
      case false:
        return '';
      default:
        return (
          <div className="ChoiceBar">
            Planning to go?<br />
            <button 
              className="choice-button btn btn-primary" 
              onClick={() => {
                this.props.setAttendance('true')
              }}>Yes</button>
            <button 
              className="choice-button btn btn-primary"
              onClick={() => {
                this.props.setAttendance('false')
              }}>No</button>
          </div>
        );
    }    
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(ChoiceBar);