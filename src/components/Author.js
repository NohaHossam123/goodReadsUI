import React, {useState, useEffect} from 'react';
import AuthorBooks from './AuthorBooks';
import Navbar from './Navbar';
import { UserContext } from '../App';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      maxWidth: 900,
    },
    media: {
      height: 285,
    },
    heading: {
        background: "#141414",
        color: "white",
        height: 55,
    }
    
  });
const Author = ({match: { params: { id } } })=> {
    const [author, setAuthor] = useState({ author: {}, error: null, isloaded: false })
    const { user, setUser } = React.useContext(UserContext);
    const classes = useStyles();


    useEffect(()=>{
        fetch(`http://localhost:5000/authors/${id}`)
            .then(res => res.json())
            .then(
              (result) => {
                if (result.message != "author page") {
                    setAuthor({author:{}, error:result, isloaded: true})
                }else{
                    setAuthor({author:result.data, error: null, isloaded: true})
                }
              },
              (error) => {
                    setAuthor({author:{}, error: error, isloaded: true})
              }
              
            )  
    }, [])
    console.log(author)


    if (author.error) {
        return <div style={{
                            position: 'absolute', left: '50%', top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}> 404|Error </div>
    }else if(!author.isloaded) {
        return <div style={{
                            position: 'absolute', left: '50%', top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}>Loading... </div>
    }else {
        return (
        <>
            <Navbar user={user} setUser={setUser}/>
            <div className="container-xl">
                {/* Author section */}
                <div className="row mt-4">
                    <div className="col-3">
                    <Card>
                    <CardMedia
                      className={classes.media}
                      image={author.author.image}
                      title={author.author.firstName+" "+author.author.lastName}
                    />
                    </Card>
                    </div>
                    <div className="col-9">
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="h4">
                             <strong>{author.author.firstName}&nbsp;{author.author.lastName}</strong>
                            </Typography>
                            <hr/>
                            <Typography variant="overline" color="textPrimary" component="p">
                                <strong>Born : </strong> &nbsp;{author.author.birthDate.split('',10)}
                            </Typography>
                            <Typography variant="body1" color="textPrimary" component="p">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                </div>
                <br/>
                {/* books section */}
                <div className="mt-5 mb-5">
                    <Card>
                        <CardHeader title="Author's Books" titleTypographyProps={{ variant:'body1' }} className={classes.heading}> </CardHeader>
                        <CardContent>
                            <Typography component="div" style={{marginTop:"10px"}}>
                            <AuthorBooks id= {author.author._id}/>
                            </Typography>
                        </CardContent>
                    </Card>     
                </div>
                <br/>
            </div>
        </>
        );
    }
           
}

 
export default Author;