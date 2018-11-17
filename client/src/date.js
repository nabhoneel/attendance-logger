function getDate() {
  const dateObj = new Date();
  let month = dateObj.getMonth() + 1; //months from 1-12
  let day = dateObj.getDate();
  let year = dateObj.getFullYear();
  const date = day + "-" + month + "-" + year;
  return date;
}

module.exports = {
  date: getDate(),
  fullDate: Date(Date.now())
}