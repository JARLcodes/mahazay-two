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
  card: {
		maxWidth: 200,
		background: "#EFEBE9",
		padding: "4vh 4vh",
		margin: "2vh 2vh"
	},
	profileCard: {
		maxWidth: 200,
		background: "#ECEFF1",
		padding: "2vh 4vh",
		marginBottom: "8vh"
	},
  gridList: {
    display: "flex",
    flexWrap: "nowrap",
    overflowX: "auto",
	},
	mediumIcon: {
		color: "#757575",
		width: 30,
		height: 30
	}
};

const Dashboard = () => {
	return (
	<div>
		<Grid container spacing={24} justify="center" style={styles.gridList}>
			<Grid>
				<Link to="/profile" style={{textDecoration:"none"}}>
				<Card style={styles.profileCard}>
					<Person style={styles.mediumIcon}/>
					<CardContent>Your Profile</CardContent>
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