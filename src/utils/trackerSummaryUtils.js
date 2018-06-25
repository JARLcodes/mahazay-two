import moment from 'moment';

const styles = {
  check: {
    color: 'green', 
    alignSelf: 'center', 
  }, 
  x: {
    color: 'red', 
    alignSelf: 'center'
  }
};


//weeksAgo will be an integer that represents the number of weeks prior to the current week
//generateFirstDay returns the date of the first day of the week (first day = sunday) you would like to see
const generateFirstDay = (weeksAgo) => {
  const currentDay = moment().day(); //moment weekdays --> {0: Mon, 1: Tue, 2: Wed, 3: Thur, 4: Fri, 5: Sat, 6: Sun}
  return moment().subtract(weeksAgo*7 + currentDay, 'days');
};

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

export const generateWeek = weeksAgo => {
  let firstDay;
  let week = [];
  let nextDay;
  let formattedNextDay;
  for (let i = 0; i < 7; i++){
    firstDay = generateFirstDay(weeksAgo);
    nextDay = firstDay.add(i, 'days');
    formattedNextDay = `${days[nextDay.day()]} ${nextDay.month() + 1}/${nextDay.date()}`;
    week.push(formattedNextDay);
  }
  return week;
};

export const week = generateWeek();
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];