import React, { Component } from 'react';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';
import IconButton from 'material-ui/IconButton';
import SubdirectoryArrowLeft from '@material-ui/icons/SubdirectoryArrowLeft';
import { Link } from 'react-router-dom';

import { getRootRef } from '../utils/componentUtils';
import  NewJournalForm  from './NewJournalForm.jsx';

export default class AllJournals extends Component {
  constructor () {
    super();
    this.state = {
      rootRef: getRootRef('journals'), 
      journals: [], 
      allJournalIds: []
    }

  }

  componentDidMount(){
    const { rootRef } = this.state;
    rootRef.get()
      .then(querySnapshot => {
        querySnapshot.forEach(journal => {
          this.setState({ journals: [...this.state.journals, journal.data()], allJournalIds: [...this.state.allJournalIds, journal.id] })
        })
      })
  }

  render() {

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