import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './ReasonEditor.scss';

class ReasonEditor extends Component {
  renderEditor() { 
    switch(this.props.auth) {
      case null:
      case false:
        return '';
      default:
        return (
          <div className="reason-editor">
            <textarea style={{width: '100%', height: '100%', padding: 0, resize: 'none', textAlign: 'center'}} className="input-effect" type="text" 
              placeholder="enter a reason here and tap anywhere outside this text-field"
              onBlur={(text) => {
                this.props.setReason(text.target.value);
              }} 
            />
            <span className="focus-border"></span>
          </div>
        );
    }    
  }

  render() {   
    return (
      <div className="ReasonEditor">
        {this.renderEditor()}
      </div>
    ); 
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(ReasonEditor);