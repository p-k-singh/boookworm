import { Switch, Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Navigation from './components/Navigation/Navigation'
import Library from './components/Library/Library'
import Forum from './components/Forum/Forum'
import Swipe from './components/Swipe/Swipe'
import Profile from './components/Profile/Profile'
import Chat from './components/Chat/chatIndex'
import PersonalChat from './components/Chat/PersonalChat'
import * as actions from './actions/index'
import { connect } from 'react-redux'
import axios from 'axios'

import Loader from './components/Utils/Loading'

import Auth from './components/Auth/WecomeAuth'
import fire from "./fire";
import Spinner from './components/Utils/Spinner'
import firebase from "firebase/app";
import { w3cwebsocket as W3CWebSocket } from "websocket";

//import BasicInfoIndex from './components/KYC/BasicInfoKyc/BasicInfoIndex'
import { useEffect, useState } from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 0),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(4),
  },
}));

function App(props) {
  const classes = useStyles();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [firstTime, setFirstTime] = useState("/swipe");
  // const [userId,setUserId] = useState(null);
  //const [cclient,setClient] = useState();
  useEffect(async () => {
    //async function checkUse
    if (!user)
      return;
    let userId = user.uid;
    const client = new W3CWebSocket(
      `wss://sdmwwtbgn1.execute-api.ap-south-1.amazonaws.com/dev01?userid=${userId}`
    );
    console.log(userId);
    client.onopen = () => {
      console.log("WebSocket Client Connected");

      props.setClient(client);
      //sendNumber()
    };
    client.onclose = function () {
      console.log('echo-protocol Client Closed');
    };
    client.onmessage = (message) => {
      console.log(message)
      var msg = JSON.parse(message.data);
      console.log('77', msg)
      if (msg.message !== "Internal server error")
        props.insertMessages({
          author: 'them',
          type: 'text',
          data: {
            text: msg.message
          }
        })
    };
    return () => {
      alert('zxc')
      client.close()
    }
    //console.log(user)
  }, [user]);

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
        setLoading(false);
      }

    });
  };
  useEffect(() => {
    if (user) {
      let userId = firebase.auth().currentUser.uid;

      axios
        .get(
          "https://6h6nlvoxy8.execute-api.ap-south-1.amazonaws.com/Staging01" +
          `/user?userId=${userId}`
        )
        .then((res) => {
          console.log(res)
          if (!res.data) {
            setFirstTime("/myProfile")
          }
          setLoading(false);
        }).catch(err => {
          console.log(err)
          setLoading(false);
        })

    }

  }, [user]);

  useEffect(() => {
    authListener();
  }, []);


  if (loading) {
    return (
      <Loader mt='18%' />
    );
  }



  if (!user) {
    return (
      <Auth setUser={setUser} />
    );

  }


  return (
    <div className={classes.root}>

      <Navigation />


      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          {/* Home page (DashBoard Content) */}
          <Route exact path="/myLibrary" component={Library} />
          <Route exact path="/forum" component={Forum} />
          <Route exact path="/swipe" component={Swipe} />
          <Route exact path="/myProfile" component={Profile} />
          <Route exact path="/chat" component={Chat} />
          {/* <Route exact path="/myProfile" component={MyProfile} /> */}
          <Route
            path="/chat/:id"
            render={(props) => {
              return <PersonalChat {...props} />;
            }}
          />

          {/* <Route
              path="/orderSuccess/:id"
              render={(props) => {
                return <Success {...props} />;
              }}
            /> */}
          <Redirect to={firstTime} />
        </Switch>
        {/* <Chat client={cclient} /> */}
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    client: state.client
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    insertMessages: (msg) => dispatch(actions.insertMessages(msg)),
    setClient: (client) => dispatch(actions.setClient(client))
  }
}



// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);