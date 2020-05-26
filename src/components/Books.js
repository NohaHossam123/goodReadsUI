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
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
const Books = () => {
  // books array
  const [books, setBooks] = React.useState([]);
  //user state
  const { user, setUser } = React.useContext(UserContext);

  const classes = useStyles();

  React.useEffect(() => {
      fetchData('books').then(res => setBooks(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books]);

    return ( 
      <>
        <div className="row">       
        <Navbar user={user} setUser={setUser}/>
        <Grid container justify="center" spacing={2} style={{ padding: 50 }}>
            {
              books.map((book,index) => 
              <Grid key={index} item xs={3}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={book.image}
                      title={book.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                      {book.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p" style={{margin:'5px'}}>
                      <BorderColorTwoToneIcon fontSize='small' style={{ display: "inline-block", marginBottom:"0px", marginRight:'5px'}}/> <strong>Author:</strong> {book.author.firstName} {book.author.lastName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p" style={{margin:'5px'}}>
                      <LocalOfferTwoToneIcon fontSize='small' style={{ display: "inline-block", marginBottom:"0px", marginRight:'5px'}}/> <strong>Category:</strong> {book.category.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <NavLink to={`/book/${book._id}`}>
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

 
export default Books;