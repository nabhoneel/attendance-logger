import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Navbar.scss';

class Navbar extends Component {
  renderContent() {
    switch(this.props.auth) {
      case null:
        return '';
      case false:
        return (
          <a className="btn btn-primary" href={'/auth/google'}>Sign In</a>
        );
      default:
        return (
          <a className="btn btn-primary" href={'/api/logout'}>Sign Out</a>
        );
    }
  }

  render() {
    return (
      <div className="Navbar">
        <div className="main-navbar">
          <div className="logo">
            Arrival&nbsp;
            <i className="em em-eyes" style={{height: '1em', width: '1em'}} ></i>
          </div>
          <div className="sign-in">
            { this.renderContent() }
          </div>
        </div>      
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Navbar);