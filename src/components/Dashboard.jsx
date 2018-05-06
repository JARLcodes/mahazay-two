import React from 'react';
import { Link } from 'react-router-dom';

import Grid from 'material-ui/Grid';
import Card, { CardContent } from 'material-ui/Card';
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

		<Grid container spacing={24} justify="center" style={styles.gridList}>
				<Grid>
					<Link to='/journals' style={{textDecoration:"none"}}>
					<Card style={styles.card}>
						<ImportContacts style={styles.mediumIcon}/>
						<CardContent>
						<Typography>Maybe some preview to journals here</Typography>
						</CardContent>
					</Card>
					</Link>
				</Grid>

				<Grid>
					<Link to="/entries" style={{textDecoration:"none"}}>
					<Card style={styles.card}>
						<LibraryBooks style={styles.mediumIcon}/>
						<CardContent>
						<Typography>Maybe some preview to entries here</Typography>
						</CardContent>
					</Card>
					</Link>
				</Grid>
			</Grid>
		</div>
	);
};

export default Dashboard;