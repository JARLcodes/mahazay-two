// const moment = require('moment');

// let n = moment();
// let week = [n];
// let formatted = `${n.month() + 1}/${n.date()}`;

//weeksAgo will be an integer that represents the number of weeks prior to the current week
//generateFirstDay returns the date of the first day of the week (first day = sunday) you would like to see
const generateFirstDay = (weeksAgo) => {
  const currentDay = moment().day(); //moment weekdays --> {0: Mon, 1: Tue, 2: Wed, 3: Thur, 4: Fri, 5: Sat, 6: Sun}
  return moment().subtract(weeksAgo*7 + currentDay, 'days');
}


<<<<<<< HEAD
const generateWeek = weeksAgo => {
  let firstDay;
  let week = [];
  let nextDay;
  let formattedNextDay;
  for (let i = 0; i < 7; i++){
    firstDay = generateFirstDay(weeksAgo)
    nextDay = firstDay.add(i, 'days');
    formattedNextDay = `${nextDay.month() + 1}/${nextDay.date()}`;
    // console.log(i, formattedNextDay);
    // console.log('formatted next day', formattedNextDay);
    week.push(formattedNextDay);
  }
  return week;
}
=======
// const generateWeek = () => {
//   let week = [];
//   let nextDay;
//   let formattedNextDay;
//   let j = 2;
//   for (let i = 0; i < 9; i++){
//     if (i < 3){
//       nextDay = moment().subtract(j, 'days')
//       if (j > 0) j--;
//     }
//     else if (3 <= i <= 9) nextDay = moment().add(i, 'days');
//     formattedNextDay = `${nextDay.month() + 1}/${nextDay.date()}`;
//     week.push(formattedNextDay);
//   }
//   return week;
// }
>>>>>>> master

console.log(generateWeek(3));
// console.log(generateWeek());
<<<<<<< HEAD
const dateCreated = new Date(new Date().setHours(0,0,0,0))
// console.log(dateCreated);
const dateArray = dateCreated.toString().split(' ');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const formattedDate = `${months.indexOf(dateArray[1]) + 1}/${dateArray[2]}`




=======
// const dateCreated = new Date(new Date().setHours(0,0,0,0))
// // console.log(dateCreated);
// const dateArray = dateCreated.toString().split(' ');
// const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// const formattedDate = `${months.indexOf(dateArray[1]) + 1}/${dateArray[2]}`
// // console.log(formattedDate);
// // console.log(moment().subtract(1, 'days'))
let entryContent = 'unicorn walks'
let habitWordArray = ['walk', 'the', 'unicorn'];
>>>>>>> master

console.log(includedWords);
