import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import Modal from '@material-ui/core/Modal';
import { Divider, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button'
import Select from "react-select";
import Webcam from "react-webcam";
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import DeleteIcon from '@material-ui/icons/Delete';
import constants from '../../constants';
import firebase from "firebase/app";
import Loader from '../Utils/Loading'


const allTags = constants.allTags

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

    left: '10%',
    right: '10%',
    width: '80%',

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
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
export default function BottomAppBar() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [chosenTags, setChosenTags] = useState([]);
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);
  const [uploadImg, setUploadImg] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [bookAuthor, setBookAuthor] = useState();
  const [description, setDescription] = useState();
  const [bookName, setBookName] = useState();
  const [videoConstraints, setVideoContraints] = useState("user");
  const [allAddedBooks, setAllAddedBooks] = useState([])
  const [loading,setLoading] = useState(true)
  const [bookUploading,setBookUploading] = useState(false)

  useEffect(() => {
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    axios.get('https://6h6nlvoxy8.execute-api.ap-south-1.amazonaws.com/Staging01' + `/user/all-books?userId=${userId}`).then(res => {
      console.log(res)
      setAllAddedBooks(res.data)
      setLoading(false)
    }).catch(err => {alert(JSON.stringify(err))
    setLoading(false)
    })

  }, [])


  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const selectStyles = {
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };

  const onTagsChange = (event) => {
    setChosenTags(event)
  }

  const changeCamera = () => {
    if (videoConstraints.facingMode === 'user') {
      setVideoContraints({ facingMode: { exact: "environment" } });
    }
    else {
      setVideoContraints({ facingMode: 'user' })
    }
  }
  const cameraComponents = () => {
    return (
      <>
        <Grid item xs={12}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width="100%"
            height="100%"
            videoConstraints={videoConstraints}
          />

        </Grid>

        <IconButton onClick={() => changeCamera()}>
          <FlipCameraAndroidIcon />
        </IconButton>
        <button onClick={capture}>Capture photo</button>
        {imgSrc && (
          <img
            src={imgSrc}
          />
        )}
      </>
    );
  }

  const handleSubmit = async () => {
    setBookUploading(true)
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    //console.log(bookName, bookAuthor, description, imgSrc)

    let tagsArray = chosenTags.map(tag => tag.value)


    var imageToBeUploaded = imgSrc ? imgSrc : uploadImg;
    var ext = imageToBeUploaded.name.split(".").pop();
    if (!imageToBeUploaded) {
      alert('Please upload a picture of book or click one :)');
      return;
    }
    const metaData = {
     // 'contentType': imageToBeUploaded.type,
      contentType: imageToBeUploaded.type,
    }
    const payload = {
      // body: {
        contentType: imageToBeUploaded.type,
        metaData: metaData
      // }
    }
    axios.post(
     
      'https://6h6nlvoxy8.execute-api.ap-south-1.amazonaws.com/Staging01/test-lambda',
       payload).then(initiateResult => {
      var bookPicLink = `https://bookworm01.s3.ap-south-1.amazonaws.com/${initiateResult.data.Key}`;
     console.log('264',initiateResult)
     console.log('265',initiateResult.data.uploadURL)
     console.log(bookPicLink)
     
     axios.put(initiateResult.data.uploadURL, imageToBeUploaded, {
        headers: {
          'Content-Type': 'image/png'
        }
      })
    .then(res => {

        const body = {
          book: {
            name: bookName,
            tags: tagsArray,
            description: description,
            author: bookAuthor,
            bookPicLink
          }
        }
        axios.post('https://6h6nlvoxy8.execute-api.ap-south-1.amazonaws.com/Staging01' + `/user/${userId}`, body)
        .then(res => {console.log(res);
          window.location.reload()
        })
        .catch(err => {
          alert(err)
          window.location.reload()
        })
      })

    })
    // .then((initiateResult)=>{
    
  }

  const body = (
    <div style={modalStyle} className={classes.modalPaper}>
      <h1 id="simple-modal-title">Add book to library</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField onChange={(event) => setBookName(event.target.value)} value={bookName} id="bookName" label="Book Name" variant="outlined" size="small" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField onChange={(event) => setBookAuthor(event.target.value)} value={bookAuthor} id="bookAuthor" label="Author" variant="outlined" size="small" />
        </Grid>
        <Grid item xs={12}>
          <Select
            isMulti
            styles={selectStyles}
            name="Features"
            value={chosenTags}
            options={allTags}
            placeholder="Features(Select multiple)"
            className="basic-multi-select"
            onChange={(event) => onTagsChange(event)}
            classNamePrefix="select"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextareaAutosize onChange={(event) => setDescription(event.target.value)} value={description} aria-label="minimum height" style={{ width: 300 }} rowsMin={6} placeholder="Description" />
        </Grid>

        <Grid item xs={12}>

          {!showCamera && <IconButton onClick={() => setShowCamera(!showCamera)} color="primary" component="span">
            < CameraAltIcon />
          </IconButton>}
          {showCamera &&
            <IconButton onClick={() => setShowCamera(!showCamera)} color="primary" component="span">
              < VideocamOffIcon />
            </IconButton>}


            OR &nbsp; &nbsp;
            <input
            type="file"
            // onClick={()=> event.target.value=null}
            onChange={(event) => {setUploadImg(event.target.files[0]); }}
            id="contained-button-file"
            
            style={{ display: 'none' }}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
        </Button>
          </label>
          {uploadImg &&
            <>
              ( {uploadImg.name}<IconButton onClick={() => setUploadImg(null)} ><DeleteIcon /></IconButton>)
        </>
          }
        </Grid>

        {showCamera && cameraComponents()}
      </Grid>
      <Button onClick={() => handleSubmit()} variant='contained' style={{ float: 'right' }} color='primary'>
        Submit
      </Button>

    </div>
  );
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
       {bookUploading ? <Loader mt='40%' /> : body } 
      </Modal>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Welcome !
        </Typography>
        <Divider />
        {loading===true && <Loader mt='10%' /> }
        <List className={classes.list}>
          {allAddedBooks.map((book, id) => {
            return (
              <React.Fragment key={id}>
                {id === 0 && <ListSubheader className={classes.subheader}>All books</ListSubheader>}
                <ListItem button component={Link} to="/myLibrary" >
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={book.bookPicLink} />
                  </ListItemAvatar>
                  <ListItemText primary={book.name} secondary={book.description} />
                </ListItem>
              </React.Fragment>
            )

          })}
        </List>
      </Paper>
      <AppBar position="fixed" color="#fff" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" gutterBottom>
            My Library
        </Typography>
          <Fab color="secondary" onClick={handleOpen} aria-label="add" className={classes.fabButton}>
            <AddIcon />
          </Fab>
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}