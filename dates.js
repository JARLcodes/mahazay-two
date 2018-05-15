const moment = require('moment');

let n = moment();
let week = [n];
let formatted = `${n.month() + 1}/${n.date()}`;


const generateWeek = () => {
  let week = [];
  let nextDay;
  let formattedNextDay;
  for (let i = 0; i < 7; i++){
    nextDay = moment().add(i, 'days');
    formattedNextDay = `${nextDay.month() + 1}/${nextDay.date()}`;
    week.push(formattedNextDay);
  }
  return week;
}


// console.log(generateWeek());
const dateCreated = new Date(new Date().setHours(0,0,0,0))
console.log(dateCreated);
const dateArray = dateCreated.toString().split(' ');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formattedDate = `${months.indexOf(dateArray[1]) + 1}/${dateArray[2]}`
console.log(formattedDate);

