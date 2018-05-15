import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Subheader from 'material-ui/List/ListSubheader';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { withAuth } from 'fireview';
import Add from '@material-ui/icons/Add';
import Card, {CardContent, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Typography from 'material-ui/Typography';

import { getRootRef } from '../utils/componentUtils';
import  NewJournalForm  from './NewJournalForm.jsx';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    display: "flex",
    flexWrap: "wrap",
    overflowX: "auto",
	},
  subheader: {
    fontSize: 40,
    fontVariant: 'small-caps',
    color: 'grey'
  },
  tile: {
    backgroundColor: '#BCAAA4',
    borderWidth: '.1vh',
    borderColor: '#A1887F'
  },
  addJournal: {
    backgroundColor: "#A1887F",
    border: "1px dotted #454545"
  },
  card: {
    padding: "2vh 2vh",
    margin: "1vh 1vh",
    marginBottom: ".1vh"
  }
};

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
      <Grid>
        <Grid container justify="center" spacing={24} style={styles.gridList}>
          <Subheader style={styles.subheader}>My Journals</Subheader>
            <Grid item xs={12}>{this.props && this.props._user ? <Button  onClick={this.newJournal.bind(this)}><Add styles={styles.addJournal}/></Button> : null}</Grid>
          {
            journals.map((journal, ind) => (
              <Grid key={journalIds[ind]}>
                <Link to={`/journals/${journalIds[ind]}`}>
                <Card style={styles.cards}>
                  <img src='https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/H/KB/HKB12/HKB12?wid=572&hei=572&fmt=jpeg&qlt=95&op_usm=0.5,0.5&.v=1480984401449' alt=""/>
                  <CardContent>
                    <Typography variant="title">{journal.title}</Typography> 
                   <Typography variant="subheading">{journal.description}</Typography>
                  </CardContent>
                </Card>
                </Link>
              </Grid>
            ))
          }
         </Grid>
        </Grid>
    );
  }
}

export default withAuth(AllJournals);
