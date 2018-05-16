import moment from 'moment';
import React from 'react';
import {
  TableCell,
  TableRow
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Check from '@material-ui/icons/Check';
import Done from '@material-ui/icons/Done';

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
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const Habit = props => {
  const { name, completed, dateCompleted } = props;
  return (
    <TableRow key={props}>
      <TableCell>
      {name}
      </TableCell>
        { week.map(day => {
          let isChecked = false;
          if (props){
            const dateArray = new Date(dateCompleted).toString().split(' ');
            console.log('date array', dateArray, day);
            const formattedDateCompleted = dateArray.length ? `${dateArray[0]} ${months.indexOf(dateArray[1]) + 1}/${dateArray[2]}` : '';
            console.log('formatted date', formattedDateCompleted, day);
            if (formattedDateCompleted == day && completed) isChecked = true;
          }
          if (isChecked) return <TableCell key={day}><b style={styles.check}>Y</b></TableCell>;
          else return <TableCell key={day}><b style={styles.x}>X</b></TableCell>;
          
          }) 
        }
    </TableRow>
  );
};
