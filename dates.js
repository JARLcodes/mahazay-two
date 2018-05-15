// const moment = require('moment');

// let n = moment();
// let week = [n];
// let formatted = `${n.month() + 1}/${n.date()}`;


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


// console.log(generateWeek());
// const dateCreated = new Date(new Date().setHours(0,0,0,0))
// // console.log(dateCreated);
// const dateArray = dateCreated.toString().split(' ');
// const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// const formattedDate = `${months.indexOf(dateArray[1]) + 1}/${dateArray[2]}`
// // console.log(formattedDate);
// // console.log(moment().subtract(1, 'days'))
let entryContent = 'unicorn walks'
let habitWordArray = ['walk', 'the', 'unicorn'];

console.log(includedWords);
