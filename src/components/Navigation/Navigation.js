import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import fire from '../../fire'
// import './navigation.css'

import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';



import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import ForumIcon from '@material-ui/icons/Forum';
import RateReviewIcon from '@material-ui/icons/RateReview';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button component={Link} to="/myProfile" key='myProfile'>
          <ListItemIcon> <PersonIcon /></ListItemIcon>
          <ListItemText primary='My Profile' />
        </ListItem>
        <ListItem button component={Link} to="/swipe" key='swipe'>
          <ListItemIcon> <TouchAppIcon /></ListItemIcon>
          <ListItemText primary='Swipe' />
        </ListItem>
        <ListItem button component={Link} to="/myLibrary" key='myLibrary'>
          <ListItemIcon> <LocalLibraryIcon /></ListItemIcon>
          <ListItemText primary='My Library' />
        </ListItem>
        <ListItem button component={Link} to="/chat" key='chat'>
          <ListItemIcon> <ChatBubbleIcon /> </ListItemIcon>
          <ListItemText primary='Chat' />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="/forum" key='forum'>
          <ListItemIcon> <ForumIcon /></ListItemIcon>
          <ListItemText primary='Forum' />
        </ListItem>
        <ListItem button component={Link} to="/google.com" key='reviewSection'>
          <ListItemIcon> <RateReviewIcon /></ListItemIcon>
          <ListItemText primary='Review Section' />
        </ListItem>

      </List>
      <div style={{ marginTop: 70 }} key='image'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzMNsMVM2Fy9kEBzGzUDq1WVh7sypH3qrkzA&usqp=CAU" />

      </div>
    </div>
  );
  return (
    <div className="gmnav" >

      <Drawer anchor='left' open={state['left']} onClose={toggleDrawer('left', false)}>
        {list('left')}
      </Drawer>
      <AppBar >
        <Toolbar>
          <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            BookWorm
          </Typography>
          <Button onClick={() => fire.auth().signOut()} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
