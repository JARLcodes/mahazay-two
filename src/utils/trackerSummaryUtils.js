import moment from 'moment';
import React from 'react';
import {
  TableCell,
  TableRow
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

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
};

export const week = generateWeek();
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const Habit = props => {
  const { name, dates } = props;
  return (
    <TableRow key={props}>
      <TableCell>
      {name}
      </TableCell>
        { week.map(day => {
          let isChecked = false, 
              alreadyChecked = false;
          if (dates) { 
            const dateArray = new Date(Object.values(dates)[1]).toString().split(' ');
            const formattedDate = `${months.indexOf(dateArray[1]) + 1}/${dateArray[2]}`;
            if(formattedDate === day) isChecked = true;
            if (dates[0]) alreadyChecked = Object.values(dates)[0];
          }
          return <TableCell key={day}><Checkbox day={day} checked={isChecked || alreadyChecked}/></TableCell>
          }) 
        }
    </TableRow>
  )
};