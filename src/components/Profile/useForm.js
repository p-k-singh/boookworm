import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core"

export function useForm(initialFValues) {

    const [values, setValues] = useState(initialFValues);
   
    const handleInputChange = e => {
        const {name, value} = e.target
        setValues({
          ...values,
          [name]: value
        })
        console.log(name);
        console.log(value);
      }
    return {
        values,
        setValues ,
        handleInputChange,
    }
}

const useStyles = makeStyles(theme => ({
    root: {
      "& .MuiFormControl-root": {
        width: "250%",
        margin: theme.spacing(1),
      },
    },
  }));

export function Form(props) {
    const classes = useStyles();
    return (
        <form className={classes.root} autoComplete="off">
  {props.children}          
        </form>
    )
}
