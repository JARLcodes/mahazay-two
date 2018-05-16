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
}

export const generateWeek = () => {
  let week = [];
  let nextDay;
  let formattedNextDay;
  let j = 2;
  for (let i = 0; i < 9; i++){
    if (i < 3){
      nextDay = moment().subtract(j, 'days')
      if (j > 0) j--;
    }
    else if (3 <= i <= 9) nextDay = moment().add(i, 'days');
    formattedNextDay = `${nextDay.month() + 1}/${nextDay.date()}`;
    week.push(formattedNextDay);
  }
  return week;
}

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
            const formattedDate = dateArray.length ? `${months.indexOf(dateArray[1]) + 1}/${dateArray[2]}` : '';
            if (formattedDate === day && completed) isChecked = true;
          }
          if (isChecked) return <TableCell key={day}><b style={styles.check}>Y</b></TableCell>
          else return <TableCell key={day}><b style={styles.x}>X</b></TableCell>
          
          }) 
        }
    </TableRow>
  )
};
