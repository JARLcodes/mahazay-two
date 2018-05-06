import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Card, { CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Person from '@material-ui/icons/Person';
import ImportContacts from '@material-ui/icons/ImportContacts';
import LibraryBooks from '@material-ui/icons/LibraryBooks';

const styles = {
	profileCard: {
		maxWidth: 200,
		background: "#E8EAF6",
		padding: "3vh 5vh",
		marginBottom: "8vh"
	},
  card: {
		maxWidth: 200,
		background: "#FFFDE7",
		padding: "4vh 4vh",
		margin: "2vh 2vh"
	},
  gridList: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
	},
	profileIcon: {
		color: "#616161",
		width: 80,
		height: 80
	},
	mediumIcon: {
		color: "#616161",
		width: 40,
		height: 40
	}
};

const Dashboard = () => {
	return (
	<div>
		<Grid container spacing={24} justify="center" style={styles.gridList}>
			<Grid>
				<Link to="/profile" style={{textDecoration:"none"}}>
				<Card style={styles.profileCard}>
					<Person style={styles.profileIcon}/>
				</Card>
				</Link>
			</Grid>
		</Grid>

		<Grid justify="center" style={styles.gridList}>
				<Grid>
					<Link to='/journals' style={{textDecoration: 'none'}}>
					<Card style={styles.card}>
						<ImportContacts style={styles.mediumIcon}/>
						<CardContent>Maybe some preview to journals here</CardContent>
					</Card>
					</Link>
				</Grid>

				<Grid>
					<Link to="/entries" style={{textDecoration:"none"}}>
					<Card style={styles.card}>
						<LibraryBooks style={styles.mediumIcon}/>
						<CardContent>A preview to the entries here</CardContent>
					</Card>
					</Link>
				</Grid>
			</Grid>
		</div>
	);
};

export default Dashboard;