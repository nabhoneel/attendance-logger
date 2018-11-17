import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';

import './App.scss';
import Home from './Home.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  async componentDidMount() {
    await this.props.createLog();
    this.setState({loaded: true});
    this.props.fetchUser();
  }

  content() {
    return (
      <Router>
        <Route path='/' component={Home} />
      </Router>
    );
  }

  render() {
    return (
      <div className="main-wrapper">
        {this.state.loaded ? this.content() : null}        
      </div>
    );
  }  
}

export default connect(null, actions)(App);
