import React, { Component } from 'react';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import SubdirectoryArrowLeft from '@material-ui/icons/SubdirectoryArrowLeft';
import { Link } from 'react-router-dom';
import { withAuth } from 'fireview';
import { getRootRef } from '../utils/componentUtils';
import  NewJournalForm  from './NewJournalForm.jsx';

export class AllJournals extends Component {
  constructor () {
    super();
    this.state = {
      rootRef: getRootRef('journals'),
      journals: [],
      allJournalIds: []
    }

  }

  componentWillReceiveProps(nextProps){
    if(this.props._user !== nextProps._user){
      const { rootRef } = this.state;
      rootRef.where("userId", "==", nextProps._user.uid).get()
        .then(querySnapshot => {
          querySnapshot.forEach(journal => {
            this.setState({ journals: [...this.state.journals, journal.data()], allJournalIds: [...this.state.allJournalIds, journal.id] })
          })
        })
        console.log("I rerendered, here's the new user", this.props._user)
      }
  }

  render() {
    // const ref = this.state.rootRef
    // ref.get().then(snapshot => snapshot.forEach(journal => console.log(journal.data())))
    const journals = this.state.journals;
    const journalIds = this.state.allJournalIds;
    return (
      <div style={styles.root}>
        <GridList cellHeight={180} style={styles.gridList}>
          <GridListTile key='Subheader' cols={2} style={{height: 'auto'}}>
            <Subheader component="div" style={styles.subheader}>My Journals</Subheader>
          </GridListTile>
          {
            journals.map((journal, ind) => (
              <GridListTile key={journalIds[ind]} style={styles.tile}>
                <Link to={`/journals/${journalIds[ind]}`}>
                  <img src='https://cdn3.iconfinder.com/data/icons/design-flat-icons-vol-2/256/62-512.png' alt={journal.title} style={{height: 150, width: 150}}/>
                  <GridListTileBar
                    title={journal.title}
                    subtitle={<span>{journal.description}</span>}
                    actionIcon={
                      <IconButton style={styles.icon}>
                        <SubdirectoryArrowLeft />
                      </IconButton>
                    }
                  />
                </Link>
              </GridListTile>
            ))
          }
          {this.props && this.props._user ? <Link to ={`${this.props._user.uid}/new-journal`}>Add Journal</Link> : null}
        </GridList>
      </div>
    )
  }
}

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    borderStyle: 'inset',
    borderWidth: 'thick',
    borderColor: '#A1887F'
  },
  subheader: {
    fontFamily: 'Georgia',
    fontSize: 40,
    fontWeight: 'bold',
    fontVariant: 'small-caps',
    color: '#795548'
  },
  tile: {
    backgroundColor: '#BCAAA4',
    borderStyle: 'inset',
    borderWidth: 'thick',
    borderColor: '#A1887F'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
};

export default withAuth(AllJournals)
