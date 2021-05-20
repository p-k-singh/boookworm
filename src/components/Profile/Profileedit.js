import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profile.css";
import constants from "../../constants";
import Select from "react-select";
import Loader from '../Utils/Loading'
import Location from './Location'
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Icon,
  InputLabel,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Slider,
  TextField,
} from "@material-ui/core";
import { useForm, Form } from "./useForm";
import Inputgm from "./Inputgm";
import Radiogrp from "./Radiogrp";
import firebase from "firebase/app";
import Button from "@material-ui/core/Button";

const allTags = constants.allTags;
const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const Profileedit = (props) => {
  // const { values, setValues, handleInputChange } = useForm(initialFValues);
  const [fullname, setFullname] = useState(props.details.fullname);
  const [email, setEmail] = useState(props.details.email);
  const [nickname, setNickname] = useState(props.details.nickname);
  const [mobile, setMobile] = useState(props.details.mobile);
  const [location, setLocation] = useState(props.details.location);
  const [gender, setGender] = useState(props.details.gender);
  const [lat, setLat] = useState(props.details.lat);
  const [long, setLong] = useState(props.details.long);
  const [imgprev, setImgprev] = useState(props.details.imgLink);
  const [tmpimgprev, setTmpimgprev] = useState(null);
  const [imgerror, setImgerror] = useState(false);
  const [chosenTags, setChosenTags] = useState([]);
  const [coordinates,setCoordinates] = useState({
    lat: props.details.lat,
    lng : props.details.long
  });
  const [slidix, setSlidix] = useState(props.details.distance);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    var tmparray = [];
    for(var i=0;i<props.details.tags.length;i++){
      tmparray.push(getKeyValuePair(props.details.tags[i]))
    }
    setChosenTags(tmparray);
  }, []);
  const getKeyValuePair = (name) => {
    for(var i=0;i<allTags.length;i++){
      if(allTags[i].value===name){
        return allTags[i];
      }
    }
  }
  function showPosition(position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  }

  const getUserGeoLocationDetails = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Please enable locationa access");
    }
    // fetch(
    //   "https://geolocation-db.com/json/ef6c41a0-9d3c-11eb-8f3b-e1f5536499e7"
    // )
    //   .then((response) => response.json())
    //   .then((data) => setLocdetails(data));
  };
  const selectStyles = {
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };
  const handleSubmitUtil = (imgLink) => {
    let tagsArray = chosenTags.map(tag => tag.value);
    let user = firebase.auth().currentUser;
    let userId = user.uid;
    // console.log(id, fullname, email, nickname, mobile, city,gender, birthday,dsitance);
    console.log(
      fullname,
      email,
      nickname,
      mobile,
      gender,
      slidix,
      lat,
      long,
      imgLink,
      tagsArray,
    );
    const body = {
      user: {
        userId: userId,
        fullname: fullname,
        email: email,
        nickname: nickname,
        mobile: mobile,
        gender: gender,
        distance: slidix,
        tags: tagsArray,
        // img: imgprev,
        //coordinates: coordinates,
        lat:  coordinates.lat ,
        long: coordinates.lng ,
        imgLink,
       
      },
    };

    axios
      .post(
        "https://6h6nlvoxy8.execute-api.ap-south-1.amazonaws.com/Staging01" +
          `/user`,
        body
      )
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  };

  
  const handleSubmit = () => {
    if(lat==null || long==null){
      alert("Please Enable Location Access");
      return;
    }
    if (!tmpimgprev) {
      handleSubmitUtil(imgprev);
      return;
    }

    setLoading(true);
    var ext = tmpimgprev.name.split(".").pop();
    const metaData = {
      contentType: tmpimgprev.type,
    };
    const payload = {
      contentType: tmpimgprev.type,
      metaData: metaData,
    };

    

    axios
      .post(
        "https://6h6nlvoxy8.execute-api.ap-south-1.amazonaws.com/Staging01/test-lambda",
        payload
      )
      .then((initiateResult) => {
        var imgLink = `https://bookworm01.s3.ap-south-1.amazonaws.com/${initiateResult.data.Key}`;
        axios
          .put(initiateResult.data.uploadURL, tmpimgprev, {
            headers: {
              "Content-Type": "image/png",
            },
          })
          .then((res) => {
            handleSubmitUtil(imgLink);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
      //setLoading(false)
  };

  const changeSlidix = (event, value) => {
    setSlidix(value);
  };
  const customMarks = [
    {
      value: 5,
      label: "5 km",
    },
    {
      value: 12,
      label: "12 km",
    },
    {
      value: 20,
      label: "20 km",
    },
    {
      value: 30,
      label: "30 km",
    },
    {
      value: 50,
      label: "50 km",
    },
    {
      value: 75,
      label: "75 km",
    },
    {
      value: 100,
      label: "100 km",
    },
  ];
  const getText = (value) => `${value}`;

  const onTagsChange = (event) => {
    setChosenTags(event);
  };

  const handleImageChange = (e) => {
    setTmpimgprev(e.target.files[0]);

    const selected = e.target.files[0];
    const Allowed_Types = ["image/png", "image/jpeg", "image/jpg"];
    if (selected && Allowed_Types.includes(selected.type)) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgprev(reader.result);
        setImgerror(false);
      };
      reader.readAsDataURL(selected);
    } else {
      setImgerror(true);
    }
  };
  if(loading){
    return  <Loader mt='18%' />
  }

  return (
    <Form>
      <Grid container>
        <Grid items xs={4}>
          <div className="Picmerror">
            {imgerror && <p className="imgerrormsg">File Format Unsupported</p>}
          </div>
          <div className="userxpic">
            <div
              className="imgPreview"
              style={{
                background: imgprev
                  ? `url("${imgprev}") no-repeat center/cover`
                  : "#131313",
              }}
            >
              {!imgprev && (
                <>
                  <p style={{ color: "white" }}>Update Profile Picture</p>
                  <label htmlFor="fileUpload" className="customFileUpload">
                    {" "}
                    Choose Upload
                  </label>
                  <span style={{ color: "grey" }}>( jpg, jpeg, png )</span>
                </>
              )}
              <input
                style={{ display: "none" }}
                type="file"
                id="fileUpload"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <div className="Picchange">
            {imgprev && (
              <Button
                onClick={() => setImgprev(null)}
                variant="contained"
                style={{ float: "right" }}
                color="primary"
              >
                Change Profile Picture
              </Button>
            )}
          </div>
        </Grid>

        <Grid items xs={3}>
          <Inputgm
            label="Full Name"
            id="fullname"
            name="fullname"
            value={fullname}
            onChange={(event) => setFullname(event.target.value)}
          />
          <Inputgm
            label="Email"
            name="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Inputgm
            label="Nick Name"
            name="nickname"
            id="nickname"
            value={nickname}
            onChange={(event) => setNickname(event.target.value)}
          />
          <Inputgm
            label="Mobile"
            name="mobile"
            id="mobile"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
          />
          <Location setCoordinates = {setCoordinates} />

<Grid style={{paddingTop : 20, paddingBottom : 20}} item xs={12}>
            <Select
              isMulti
              styles={selectStyles}
              name="Features"
              value={chosenTags}
              options={allTags}
              placeholder="Preference (Select Multiple)"
              className="basic-multi-select"
              onChange={(event) => onTagsChange(event)}
              classNamePrefix="select"
            />
          </Grid>


          <Radiogrp
            row
            name="gender"
            value={gender}
            label="Gender"
            onChange={(event) => setGender(event.target.value)}
            items={genderItems}
          ></Radiogrp>

              

          {/* <Button
            requiredq
            variant="contained"
            color="primary"
            style={{ margin: ".5rem", width: "10rem" }}
            className={"kuch bhi"}
            endIcon={<Icon></Icon>}
            onClick={getUserGeoLocationDetails}
          >
            Location
          </Button> */}
          <div className="DDis" style={{ paddingTop: 20, marginLeft: 10 }}>
            <span>Distance Discovery</span>
          </div>
          {/* <p style={{margin : 20, marginRight: 9, fontWeight: 15, fontSize: 15}}>Distance Discovery</p> */}
          <Slider
            style={{ width: 800, marginTop: 10, marginLeft: 15 }}
            min={0}
            max={100}
            default
            value={20}
            value={slidix}
            // step = {null}
            track={false}
            marks={customMarks}
            onChange={changeSlidix}
            getAriaValueText={getText}
            valueLabelDisplay="auto"
          />

        
          <Button
            onClick={() => handleSubmit()}
            variant="contained"
            style={{ float: "right" }}
            color="primary"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default Profileedit;
