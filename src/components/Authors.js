import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { fetchData } from './Admin/helpers';
import Navbar from './Navbar';
import { UserContext } from '../App';
import { Grid } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const Authors = () => {
  // authors array
  const [authors, setAuthors] = React.useState([]);
  //user state
  const { user, setUser } = React.useContext(UserContext);

  const classes = useStyles();

  React.useEffect(() => {
      fetchData('authors').then(res => setAuthors(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authors]);

    return ( 
      <>
        <div className="row">       
        <Navbar user={user} setUser={setUser}/>
        <Grid container justify="center" spacing={2} style={{ padding: 50 }}>
            {
              authors.map((author,index) => 
              <Grid key={index} item xs={3}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={author.image}
                      title={author.firstName}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                      {author.firstName} {author.lastName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      Birth Date: {new Date(author.birthDate).toISOString().split('T')[0]}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <NavLink to={`/author/${author._id}`}>
                      <Button style={{backgroundColor:'#303030', color:'white'}}>
                        More Details
                      </Button>
                    </NavLink>
                  </CardActions>
                </Card>
                </Grid>
                )
            }
          </Grid>
        </div>
      </>
     );
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
});

 
export default Authors;