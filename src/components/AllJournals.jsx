import React, { Component } from 'react';
import { getRootRef } from '../utils/componentUtils';
import { withAuth } from 'fireview';
import Grid from 'material-ui/Grid';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { withTheme } from 'material-ui/styles';
import Add from '@material-ui/icons/Add';
import image from '../images/whiteBook.jpg';
import Typography from 'material-ui/Typography';
import { NewJournalForm } from './index';

export class AllJournals extends Component {
  constructor () {
    super();
    this.state = {
      rootRef: getRootRef('journals'),
      journals: [],
      allJournalIds: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props._user !== nextProps._user) {
      const { rootRef } = this.state;
      rootRef.where("userId", "==", nextProps._user.uid).get()
        .then(querySnapshot => {
          querySnapshot.forEach(journal => {
            this.setState({ journals: [...this.state.journals, journal.data()], allJournalIds: [...this.state.allJournalIds, journal.id] });
          });
        });
      }
  }

  newJournal(){
    this.props.history.push(`${this.props._user.uid}/new-journal`);
  }

  render() {
    const journals = this.state.journals;
    const journalIds = this.state.allJournalIds;

    return (
      <div style={{display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-around', overflow: 'hidden'}}>
        <GridList cellHeight="auto" style={{ spacing: "1em" }} cols={3}>
        <GridListTile key="Subheader" cols={3}>
          
            {this.props && this.props._user && journals.length > 0
              ? <div>
                  <Subheader component="div" variant="display1" style={{ fontSize: "2.5em", fontVariant: 'small-caps', color: 'grey' }}>Journals</Subheader> 
                  <Button onClick={this.newJournal.bind(this)}><Add style={{ color: "grey", width: 30, height: "auto" }}/></Button>
                </div> 
              : <div>
                  <Subheader component="div" style={{ fontSize: "2.5em", fontVariant: 'small-caps', color: 'grey' }}>No Journals Made</Subheader>
                  <Button onClick={this.newJournal.bind(this)}><Add style={{ color: "grey", width: 30, height: "auto" }}/></Button>
                </div>
            }
          </GridListTile>
          {
            journals.map((journal, ind) => (
            <GridListTile key={journalIds[ind]}>
              <Link to={`/journals/${journalIds[ind]}`}>
              <GridListTileBar
                  title={<Typography style={{textTransform: "capitalize", color: "#BDBDBD"}} variant="title">{journal.title}</Typography>}
                  subtitle={<Typography variant="subheading" style={{color: "#9E9E9E"}}>{journal.description}</Typography>}
                  titlePosition="top"
                />
                <img src={image} style={{ width: "60vh", height: "auto" }} alt=""/>
                </Link>
                </GridListTile>
            ))
          }
         </GridList>
        </div>
    );
  }
}

export default withTheme()(withAuth(AllJournals));
