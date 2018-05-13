import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {db} from '../utils/firebase.config'
import Button from "material-ui/Button";
import Icon from 'material-ui/Icon';
import Tooltip from 'material-ui/Tooltip';
import Grid from 'material-ui/Grid';
import { withAuth } from 'fireview';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

import { getRootRef } from '../utils/componentUtils';

BigCalendar.momentLocalizer(moment);

const styles = {
  delete: {
    alignSelf: 'center',
    width: '5%',
    marginLeft: '2%',
    backgroundColor: "#EF9A9A",
    color: "#fff"
  }
}
export class SingleJournal extends Component {
  constructor(props){
    super(props);
    this.state = {
      entries: [],
      events:[], 
      journal: getRootRef('journal', this.props.match.params.journalId)
    }
    this.addEntry = this.addEntry.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.checkColor = this.checkColor.bind(this);

  }

  addEntry(){
    const todaysEntry = this.state.entries.filter(entry => (new Date(entry.dateCreated) - new Date(new Date().setHours(0,0,0,0)) === 0 ))[0]
    todaysEntry ? this.props.history.push(`/journals/${this.props.match.params.journalId}/entries/${todaysEntry.entryId}`)
    :
    getRootRef('entries').add({ dateCreated: (new Date()).setHours(0,0,0,0),
                                journalId: this.props.match.params.journalId,
                                userId: this.props._user.uid
                              })
      .then(docRef =>
        this.props.history.push(`/journals/${this.props.match.params.journalId}/entries/${docRef.id}`));
  }

  componentWillReceiveProps(nextProps){
    if(this.props._user !== nextProps._user){
      let entries = []
      db.collection('entries')
      .where('journalId', '==', this.props.match.params.journalId).get()
      .then(querySnapshot => {
        querySnapshot.forEach(entry => {
          this.setState({entries: [...this.state.entries, {entryId: entry.id, dateCreated: entry.data().dateCreated, content: entry.data().content, journalId: entry.data().journalId }], events: [...this.state.events, {title: "View Journal Entry", entryId: entry.id, start: new Date(entry.data().dateCreated), end: new Date(entry.data().dateCreated) + 1}]})
        })
      })
    }
  }

  handleSelect(calendarEvent, event){
    this.props.history.push(`/journals/${this.props.match.params.journalId}/entries/${calendarEvent.entryId}`)
  }

  checkColor(event, start, end, isSelected){
    let background;
    Math.floor((Math.random() * 10)) % 2 === 0 ? background = '#F48FB1' : background ="#81C784"

    return {style : {background}}
  }

  deleteJournal(journal){
    confirmAlert({
      title: 'Confirm to submit', 
      message: 'Are you sure you want to delete this journal?', 
      buttons: [
        {
          label: 'Yes, delete journal', 
          onClick: () => {
            console.log('figure out a way to delete both journal and associated entries');
            // journal.delete().then(() => {
            //   this.state.entries.forEach(entry => 
            //this doesn't work because this.state.entries contains snapshots rather than references to the actual entries
            //     entry.delete()
            //       .then(() => this.props.history.push('/journals'))
            //   );
              
            // })
          }
        }, 
        {
          label: 'No, keep journal', 
          onClick: () => this.props.history.push(`/journals/${this.props.match.params.journalId}`)
        }
      ]
    })
    
  }

  render() {
    const entries = this.state.entries
    const events = this.state.events
    return (
      <div>
        <div style={{"paddingLeft": 24 + "px", "paddingRight": 24 + "px", "marginBottom": 24 +"px" }}>
          <BigCalendar eventPropGetter={this.checkColor} defaultDate={new Date()} events={events} views={['month']} style={{height: 350 + "px"}} onSelectEvent={this.handleSelect} />

        </div>

        <Grid container style={{justifyContent: "flex-end", "paddingLeft": 24 + "px", "paddingRight": 24 + "px", "marginBottom": 10 +"px"}}>
          <Tooltip title = "Add Today's Entry" placement="top">
            <Button variant ="fab" color="primary" onClick={this.addEntry}><Icon>edit_icon</Icon></Button>
          </Tooltip>
          <Button variant="raised" style={styles.delete} onClick={this.deleteJournal.bind(this, this.state.journal)}>Delete Journal</Button>
        </Grid>
      </div>
    )
  }
}

export default withAuth(SingleJournal);
