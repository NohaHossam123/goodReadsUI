import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LocalOfferTwoToneIcon from '@material-ui/icons/LocalOfferTwoTone';
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone';
import { fetchData } from './Admin/helpers';
import Navbar from './Navbar';
import { UserContext } from '../App';
import { Grid } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import Pagination from './Pagination';

const Books = () => {
  // books array
  const [booksData, setBooksData] = React.useState({books:[], loading:false});
  //user state
  const { user, setUser } = React.useContext(UserContext);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPages] = React.useState(4);
  const indexOfLastItems = currentPage * itemsPerPage ;
  const indexOfFirstItems = indexOfLastItems - itemsPerPage ;

  const classes = useStyles();

  React.useEffect(() => {
    //setting loading to true
    setBooksData({...booksData, loading: true})
    fetchData('books').then(res => setBooksData({...booksData, books: res}));
    //setting loading to false
    setBooksData({...booksData, loading: false})
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [booksData.loading]);

  const currentItems = booksData.books.slice(indexOfFirstItems, indexOfLastItems) ;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return ( 
      <>
        <div className="row">       
        <Navbar user={user} setUser={setUser}/>
        <Grid container justify="center" spacing={2} style={{ padding: 50 }}>
            {
              currentItems.map((book,index) => 
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
        <div className="container" style={{marginTop:"-45px"}}>
          <Pagination itemsPerPage={itemsPerPage} totalItems={booksData.books.length} paginate={paginate} className='text-center'/>
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