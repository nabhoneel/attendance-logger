import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Attendance.scss';

class Attendance extends Component {
  render() {
    switch(this.props.attendance) {
      case null:
      case false:
        return '';
      default:
        let going = this.props.attendance.going.map((user, index) => {
          return <div className="going-element list-element" key={index + user._id}><div>{user.name}</div><i className="em em-raised_hand_with_fingers_splayed"></i></div>
          // return user;
        });
        let notGoing = this.props.attendance.notGoing.map((user, index) => {
          return <div className="notGoing-element list-element" key={index + user._id}><div>{user.name}</div><i className="em em-middle_finger"></i></div>
          // return user;
        });
        let undecided = this.props.attendance.undecided.map((user, index) => {
          return <div className="undecided-element list-element" key={index + user._id}><div>{user.name}</div><i className="em em-thinking_face"></i></div>
          // return user;
        });
        return (
          <div className="Attendance">
            { going }
            { notGoing }
            { undecided }
          </div>
        );
    }    
  }
}

function mapStateToProps(state) {
  return { attendance: state.attendance };
}

export default connect(mapStateToProps)(Attendance);