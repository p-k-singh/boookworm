import React,{ useState,useEffect } from "react"
import {Button} from '@material-ui/core'
import { Link } from "react-router-dom";
import firebase from 'firebase/app'
import axios from 'axios'

import {
  Grid
} from '@material-ui/core';

import PersonalChat from './PersonalChat'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    modalPaper: {
      top: '10%',
      left: '10%',
      overflow: 'scroll',
      height: '100%',
      display: 'block',
      position: 'absolute',
      //  // width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      //   overflow:'scroll',
    },
    paper: {
  
      top: '20%',
  
      left: '20%',
      right: '10%',
      width: '60%',
      minHeight:500,
  
      display: 'block',
      position: 'absolute',
      //  // width: 400,
      backgroundColor: theme.palette.background.paper,
  
      padding: theme.spacing(2, 4, 3),
  
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
    appBar: {
      top: 'auto',
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }));

const ChatIndex = (props) => {
    const classes = useStyles();
    const [chats,setChats] = useState([]);

    useEffect(()=>{
      let user = firebase.auth().currentUser;
      let userId = user.uid;
      axios
        .get(
          "https://6h6nlvoxy8.execute-api.ap-south-1.amazonaws.com/Staging01" +
            `/user?userId=${userId}`
        )
        .then(res=>{
          console.log(res.data.matchedUsers)
          var allUsers = res.data.matchedUsers;
          var temp = [];
          for(var i=0;i<allUsers.length;i++){
            temp.push({
              userId: allUsers[i].userId,
              userName: allUsers[i].userName,
              userAvatar: allUsers[i].profileImage,
              matchedUserBooks: allUsers[i].matchedUserBooks,
              yourBooks: allUsers[i].yourBooks
            })
            break;
          }
          console.log('temp',temp)
          setChats(temp)
        })
        .catch(res => console.log(res))
    },[])
    
    const pressed = () => {
        props.client.close();
    }
    
    return(
<div>
  <div className="row">
  <Grid item xs={12} >
            <Paper square className={classes.paper}>
            <List className={classes.list}>
          {chats.map((chat, id) => {
            return (
              <React.Fragment key={id}>
                {id === 0 && <ListSubheader className={classes.subheader}>All chats</ListSubheader>}
                <ListItem button component={Link} to={`/chat/${chat.userId}`} >
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={chat.userAvatar} />
                  </ListItemAvatar>
                  <ListItemText primary={chat.userName} secondary={chat.description} />
                </ListItem>
              </React.Fragment>
            )

          })}
        </List>
        </Paper>
        </Grid>
  </div>
  <div className="row">
  {/* <Grid style={{marginRight:400}} item xs={12} sm={4}>
        <PersonalChat />
        </Grid> */}
  </div>
</div>
    
        
    )
}
export default ChatIndex