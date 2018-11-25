// const moment = require('moment-timezone');

module.exports.getDate = () => {
  var currentTime = new Date();
  var currentOffset = currentTime.getTimezoneOffset();
  var ISTOffset = 330;   // IST offset UTC +5:30 

  let datetime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

  let hour = datetime.getHours();
  let minutes = datetime.getMinutes();
  let seconds = datetime.getSeconds();
  let date = datetime.getDate();
  let month = datetime.getMonth();
  let year = datetime.getFullYear();

  return (date + " - " + month + " - " + year);
};

module.exports.getFullDate = () => {
  var currentTime = new Date();
  var currentOffset = currentTime.getTimezoneOffset();
  var ISTOffset = 330;   // IST offset UTC +5:30 

  let datetime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
  
  let hour = datetime.getHours();
  let minutes = datetime.getMinutes();
  let seconds = datetime.getSeconds();
  let date = datetime.getDate();
  let month = datetime.getMonth();
  let year = datetime.getFullYear();
  
  return (date + " - " + month + " - " + year + "\nTime: " + hour + ":" + minutes + ":"  + seconds);
};