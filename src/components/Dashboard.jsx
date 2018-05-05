import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
		maxWidth: 345,
		background: 'lightgray',
		borderRadius: 5, 
		color: 'white',
		height: 48,
		padding: '6vh 7vh',
		margin: '4vh'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
	}, 
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  }
};

const Dashboard = props => {
	console.log('styles', styles.card)
	return (
		<div>
			<Grid container spacing={24} justify="center">
			<div>
			<Grid item padding={16}>
				<Link to='/profile'>
				<Card style={styles.card}>
					<CardContent>
					<Typography variant="subheading" color="textSecondary">View Profile</Typography>
					</CardContent>
				</Card>
				</Link>
			</Grid>
			</div>

			<div>
			<Grid item padding={16}>
				<Link to='/logout'>
				<Card style={styles.card}>
					<CardContent>
					<Typography variant="subheading" color="textSecondary">Logout</Typography>
					</CardContent>
				</Card>
			</Link>
			</Grid>
			</div>

			<div>
			<Grid item padding={16}>
				<Link to='/journals'>
				<Card style={styles.card}>
					<CardContent>
					<Typography variant="subheading" color="textSecondary">Your Journals</Typography>
					</CardContent>
				</Card>
				</Link>
			</Grid>
			</div>

			<div>
			<Grid item padding={16}>
				<Link to='/entries'>
				<Card style={styles.card}>
					<CardContent>
					<Typography variant="subheading" color="textSecondary">Your Entries</Typography>
					</CardContent>
				</Card>
				</Link>
			</Grid>
			</div>

			</Grid>

		</div>
	);
};

export default Dashboard;