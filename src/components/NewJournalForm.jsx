import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import Button from "material-ui/Button";
import { getRootRef, getIds } from '../utils/componentUtils';


const styles = { 
  addJournalForm: {
    display: "flex", 
    flexDirection: "column"
  }, 
  textField: {
    color: '#FAFAFA',
    width: "20%", 
    marginLeft: "7%"
  }, 
  addJournalButton: {
    color: "#A1887F", 
    width: "20%",
    marginLeft: "7%", 
    marginTop: "1em"
  }
}

export default class NewJournalForm extends Component {
  constructor(){
    super();
    this.state = {
      rootRef: getRootRef('journals'), 
      journals: [], 
      allJournalIds: [], 
      title: '', 
      description: ''
    };
    this.onChange = this.onChange.bind(this);
    this.addJournal = this.addJournal.bind(this);
  }

  componentDidMount(){
    const { rootRef } = this.state;
    rootRef.get()
      .then(querySnapshot => {
        console.log('in new journal form: ', querySnapshot)
        querySnapshot.forEach(journal => {
          console.log('journal', journal);
          this.setState({ journals: [...this.state.journals, {[journal.id] : journal.data() }], allJournalIds: [...this.state.allJournalIds, journal.id] })
        })
      })
  }

  onChange(event){
    this.setState({ [event.target.name] : event.target.value })
    console.log("state in onchange: ", this.state);
  }

  addJournal(){
    const newJournalId = this.state.allJournalIds.length > 0 ? Number(this.state.allJournalIds[this.state.allJournalIds.length - 1]) + 1 : 1;
    const data = { title: this.state.title, description: this.state.description };
    this.state.rootRef.doc(newJournalId.toString()).set(data);
  }
  
  render() {
    return (
      <div >
        <form style={styles.addJournalForm}>
          <TextField
            id="search"
            type="search"
            style={styles.textField}
            label="Title"
            onChange={this.onChange}
            name="title"
          />
            <TextField
            id="multiline-flexible"
            label="Description"
            multiline
            rowsMax="4"
            style={styles.textField}
            onChange={this.onChange}
            name="description"
          />
          <Button style={styles.addJournalButton} onClick={this.addJournal}>New Journal</Button>
        </form>
      </div>
    )
  }
}
