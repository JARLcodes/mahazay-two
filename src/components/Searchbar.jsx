import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import Search from '@material-ui/icons/Search';
import Autosuggest from 'react-autosuggest';
import { withAuth } from 'fireview';
import { convertFromRaw } from 'draft-js';

import { getRootRef } from '../utils/componentUtils';

const styles = {
  textField: {
    color: '#FAFAFA'
  }
}
class Searchbar extends Component {
  constructor(props){
    super(props);
    this.state = {
      userEntries: [],  
      userJournals: [], 
      userInsights: [], 

    };
  }


  componentWillReceiveProps(nextProps){
    getRootRef('entries').where('userId', '==', nextProps._user.uid).get()
      .then(userEntries => this.setState({ userEntries }));
    getRootRef('journals').where('userId', '==', nextProps._user.uid).get()
      .then(userJournals => this.setState({ userJournals }));
    getRootRef('insights').where('userId', '==', nextProps._user.uid).get()
      .then(userInsights => this.setState({ userInsights }));
    
  }

  searchUserItems(e){
    let matchingEntries = [];
    this.state.userEntries.forEach(entry => {
      matchingEntries = convertFromRaw(entry.data().content).getPlainText().includes(e.target.value) ? [...matchingEntries, entry] : matchingEntries;
    });
    console.log('matching entries', matchingEntries);
    if (this.state.userEntries.length) this.state.userEntries.filter(entry => {
      // const content = convertFromRaw(entry.data().content);
      console.log('is this content', convertFromRaw(entry.data().content))
      // console.log(convertFromRaw('content should be...', entry.data().content));

    })
    const matchingJournals = [];
    const matchingInsights = [];
    // this.setState({ userEntries: this.state.userEntries.filter()})
  }

  render(){
    
    return (
      <Autosuggest
        id="search"
        type="search"
        style={styles.textField}
        placeholder="Search"
        InputProps={{
          endAdornment: (
              <InputAdornment position="start">
                  <Search />
              </InputAdornment>
          ),
        }}
        onChange={this.searchUserItems.bind(this)}
      />
    )
  }
}

export default withAuth(Searchbar);