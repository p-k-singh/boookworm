import { TextField } from '@material-ui/core';
import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import "../unique.css"
const styles = {
    floatingLabelFocusStyle: {
        color: "#FA2A74"
    }
}

const useStyles = makeStyles({
    root: {
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#FA2A74"
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#FA2A74"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#FA2A74"
      }
    }
  });
export default function Inputgm(props) {
    const classes = useStyles();
    const {name,label,value,disabled,onChange} = props;
    return (
        <TextField
        variant="outlined"  
        label={label}
        name={name}
        value={value}
        className={classes.root}
        InputLabelProps={{className:"gauravtf_"}}
        floatingLabelFocusStyle={{className:"gauravtf_"}}
        disabled={disabled}
        onChange={onChange}
        />
    )
}
