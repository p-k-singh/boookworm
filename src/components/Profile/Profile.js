import { Paper, Grid, makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Profileform from "./Profileform";
import firebase from "firebase/app";
import axios from "axios";
import Spinner from '../Utils/Spinner'
import Profileshow from './Profileshow'
import Profileedit from "./Profileedit";
import Loader from '../Utils/Loading'
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));


const Profile = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState();
  const [data,setData] = useState(null);

  useEffect(() => {
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    axios
      .get(
        "https://6h6nlvoxy8.execute-api.ap-south-1.amazonaws.com/Staging01" +
          `/user?userId=${userId}`
      )
      .then((res) => {
          console.log(res)
        if (res.data) {
          
          setData(res.data);
          setPage("SHOW");
        } else {
          setPage("FILL");
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
     
        <Loader mt='18%' />
     
    );
  }
  if(page==='FILL')
  return (
    <div>
      <Paper className={classes.pageContent}>
        <Profileform />
      </Paper>
    </div>
  );
  if(page==='EDIT'){
     return( <Profileedit details={data}  />)
  }

  return(
      <Profileshow details={data} changeFunc = {setPage}  />
  )
  
};

export default Profile;
