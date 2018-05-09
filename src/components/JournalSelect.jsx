import React, { Component } from 'react';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';

export default class JournalSelect extends Component {
  constructor() {
    super();
    this.state = {
      journal: {}
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    e.preventDefault();
    console.log('???')
    this.setState({ journal: e.target.value })
  }

  render(){
    return (
      <div>
        <InputLabel htmlFor="journal-helper" style={styles.placeholder}>Journal</InputLabel>
        <Select
          value={this.state.journal}
          displayEmpty
          input={<Input name="journal" id="journal-helper"/>}
          style={styles.select}
          onChange={this.handleChange}
        >
          <MenuItem value=""></MenuItem>
          <Map from={getRootRef('journals')}
              Loading={() => 'Loading...'}
              Render={journal => {
                if (journal.title){
                  return <MenuItem key={journal.title} value={journal}>{journal.title}</MenuItem>
                }
                else return null;
              }
              }
              Empty={() => 'No journals'}
              />
        </Select>
      </div>
    )
  }
  
}