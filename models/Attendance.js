const mongoose = require('mongoose');
const { Schema } = mongoose;

const Date = require('../config/date');
const User = require('./User');
const ReasonSchema = require('./Reason');
const LogUserSchema = require('./LogUser');

const attendanceSchema = new Schema({
  date: { type: String, default: Date.date },
  reason: [ ReasonSchema ],
  going: [ LogUserSchema ],
  notGoing: [ LogUserSchema ],
  undecided: [ LogUserSchema ]
});

const Attendance = mongoose.model('attendance', attendanceSchema);
module.exports = Attendance;

module.exports.getLog = async (res) => {
  // get today's attendance log
  const result = await Attendance.findOne({ date: Date.date });
  
  if(!result) {
    // get googleID and names of all users:
    const res = User.find({}, 'googleID name'); 
    
    // insert each googleID as a String into the allUsers array:
    allUsers = userRes.map((user) => {
			User.markUndecided(user.googleID); // initially increment 'undecided' count of all users
			return ({googleID: user.googleID, name: user.name});        
    });
    console.log(allUsers);
    
    const [ going, notGoing, undecided ] = [ [], [], allUsers ];

    await new Attendance({
			date: Date.date,
			reason: [{text: 'still to be set...', setBy: '', name: 'le admin'}],
			going: [],
			notGoing: [],
			undecided: allUsers
    }).save();
    
    res.send({
      totalGoing: going.length,
      totalNotGoing: notGoing.length,
      totalUndecided: undecided.length,
      going: going,
      notGoing: notGoing,
      undecided: undecided
    });
  } else {
    const [ going, notGoing, undecided ] = [ result.going, result.notGoing, result.undecided ];
  
    res.send({
      totalGoing: going.length,
      totalNotGoing: notGoing.length,
      totalUndecided: undecided.length,
      going: going,
      notGoing: notGoing,
      undecided: undecided
    });
  }
}

module.exports.updateDailyLog = async (googleID, finalRes) => {
  // find the attendance log for current date:
	const result = await Attendance.findOne( { date: Date.date });
  
  if(result && googleID == null) finalRes.send({status: 'success'});

  if(!result) {
		// if today's attendance log does not exist
    // get googleID of all users:
		const userRes = await User.find({}, 'googleID name');
		console.log('creating attendance');
    // insert each googleID as a String into the allUsers array:
    let allUsers = userRes.map((user) => {
			User.markUndecided(user.googleID); // initially increment 'undecided' count of all users
			return ({googleID: user.googleID, name: user.name});        
    });
    console.log(allUsers);
		
		// now, create today's attendance log:
		await new Attendance({
			date: Date.date,
			reason: [{text: 'still to be set...', setBy: '', name: 'le admin'}],
			going: [],
			notGoing: [],
			undecided: allUsers
		}).save();
		
		finalRes.send({status: 'success'});
  } else if(googleID != null){ 
		// if a new user is being added today, to an existing attendance log:
    console.log('Adding user to attendance log');
    let userName = '';
		const name = await User.findOne({ googleID: googleID }, 'name');		
		userName = name.name;

		const { err, _ } = await Attendance.findOneAndUpdate(
			{ date: Date.date }, 
			{ $push: { undecided: {googleID: googleID, name: userName }}},
		);
		
		if(err) console.log('Error: \n' + err);
		else finalRes.send({status: 'success'});
  }
}

module.exports.setReason = async (googleID, text, res) => { 
  const reasonDoc = await Attendance.findOne(
    { date: Date.date },
    'reason'
  );
  let reasons = reasonDoc.reason.map(reason => ({text: reason.text, setBy: reason.setBy, name: reason.name}));
  
  console.log('passed text: ' + text);
  if(text.length < 1) {
    // console.log('empty text...');
    console.log(reasons);
    res.send({
      reason: reasons[reasons.length - 1].text,
      setBy: reasons[reasons.length - 1].name.split(' ')[0],
    	status: 'cannot update with blank text'
    });
  } else {
		const name = await User.findOne({ googleID: googleID }, 'name');
		let username = name.name;

    await Attendance.findOneAndUpdate(
      { date: Date.date },
			{ $push: { reason: { text: text, setBy: googleID, name: username }}}
		);

		res.send({
			reason: text,
			setBy: username.split(' ')[0],
			status: 'success'
		});  
	}
}

module.exports.getReason = async (res) => {
  const reasonDoc = await Attendance.findOne(
    { date: Date.date },
    'reason'
  );

  let reasons = reasonDoc.reason.map(reason => ({text: reason.text, setBy: reason.setBy, name: reason.name}));
  if(!reasons) reason = [];
  else reason = reasons[reasons.length - 1];

  console.log(reason);
  if(reason.setBy.length < 1) res.send({reason: reason.text, setBy: reason.name});
  else {
    console.log(reason);
    res.send({
      reason: reason.text,
      setBy: reason.name.split(' ')[0],
      status: 'retrieved'
    });
  }
}

const sendAttendanceResponse = res => {
  // send response back containing updated Attendance list:
  
  Attendance.findOne({ date: Date.date }, (_, result) => {
    const [ going, notGoing, undecided ] = [ result.going, result.notGoing, result.undecided ];

    console.log('current state to be sent off: ');
    console.log(going);
    console.log(notGoing);
    console.log(undecided);

    res.send({
      totalGoing: going.length,
      totalNotGoing: notGoing.length,
      totalUndecided: undecided.length,
      going: going,
      notGoing: notGoing,
      undecided: undecided
    });
  });
}
  
module.exports.markGoing = (googleID, res) => {
  // to mark the current user as 'going'
  Attendance.findOne( { date: Date.date }, 'undecided notGoing going', async (err, result) => {  
    const [ goingCheck, undecidedCheck, notGoingCheck ] = [ 
      result.going.map(user => user.googleID).indexOf(googleID), 
      result.undecided.map(user => user.googleID).indexOf(googleID), 
      result.notGoing.map(user => user.googleID).indexOf(googleID)
    ];    

    if(goingCheck != -1) {
      sendAttendanceResponse(res);
      return;
    }

    // step 2: figure out which list the current user belongs to and remove him from that list:
    if(notGoingCheck != -1) {
      // step 1: add user to 'going' list under today's attendance:
      await Attendance.findOneAndUpdate(
        { date: Date.date }, 
        { $push: { going: {googleID: googleID, name: result.notGoing[notGoingCheck].name }}}
      );
      // increment user's 'going' count by 1
      User.markGoing(googleID);
      
      // 'notGoing' list
      await Attendance.findOneAndUpdate(
        { date: Date.date },
        { $pull: { notGoing: { googleID: googleID }}}
      );

      User.unmarkNotGoing(googleID);            
      sendAttendanceResponse(res);
    } else if(undecidedCheck != -1) {        
      await Attendance.findOneAndUpdate(
        { date: Date.date }, 
        { $push: { going: {googleID: googleID, name: result.undecided[undecidedCheck].name }}}
      );
      // increment user's 'going' count by 1
      User.markGoing(googleID);
      
      // 'undecided' list
      await Attendance.findOneAndUpdate(
        { date: Date.date },
        { $pull: { undecided: { googleID: googleID }}}
      );

      User.unmarkUndecided(googleID);
      sendAttendanceResponse(res);
    }
  });
}

module.exports.markNotGoing = (googleID, res) => {
  // to mark the user as 'not going':
  Attendance.findOne( { date: Date.date }, 'undecided going notGoing', async (err, result) => {
    const [ goingCheck, undecidedCheck, notGoingCheck ] = [ 
      result.going.map(user => user.googleID).indexOf(googleID), 
      result.undecided.map(user => user.googleID).indexOf(googleID), 
      result.notGoing.map(user => user.googleID).indexOf(googleID)
    ];

    if(notGoingCheck != -1) {
      sendAttendanceResponse(res);
      return;
    }

    // step 2: figure out which list the current user belongs to and remove him from that list:
    if(goingCheck != -1) {
      // step 1: add user to 'going' list under today's attendance:
      await Attendance.findOneAndUpdate(
        { date: Date.date }, 
        { $push: { notGoing: { googleID: googleID, name: result.going[goingCheck].name } }}
      );
      User.markNotGoing(googleID); // increment User's 'not going' count by 1

      // 'going' list:
      await Attendance.findOneAndUpdate(
        { date: Date.date },
        { $pull: { going: { googleID: googleID }}}
      );

      User.unmarkGoing(googleID);      
      sendAttendanceResponse(res);
      
    } else if(undecidedCheck != -1) {
      await Attendance.findOneAndUpdate(
        { date: Date.date }, 
        { $push: { notGoing: { googleID: googleID, name: result.undecided[undecidedCheck].name } }}
      );
      User.markNotGoing(googleID); // increment User's 'not going' count by 1
      
      // 'undecided' list:
      await Attendance.findOneAndUpdate(
        { date: Date.date },
        { $pull: { undecided: { googleID: googleID }}}
      );

      User.unmarkUndecided(googleID);      
      sendAttendanceResponse(res);
    }
  });
}