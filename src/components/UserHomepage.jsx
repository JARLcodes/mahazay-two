import React, { Component }from 'react';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
		maxWidth: 345,
		background: '#EDE7F6',
		borderRadius: 3, 
		color: 'white',
		height: 48,
		padding: '3vh 2vh',
		margin: '3vh'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
	}, 
}

export default class Home extends Component {
	render() {
		return (
			<div>
				<h1>Home</h1>
        <Grid container justify='center'>
        <Link to='/login'>
        <Card style={styles.card}>	
          <CardContent>
					<Typography variant="subheading" gutterBottom color="textSecondary">Login</Typography>
					</CardContent>
          </Card>
        </Link>
        
        <Link to='/register'>
          <Card style={styles.card}>
          <CardContent>
					<Typography variant="subheading" gutterBottom color="textSecondary">Register</Typography>
					</CardContent>
          </Card>
        </Link>
        </Grid>
			</div>
		);
	}
}