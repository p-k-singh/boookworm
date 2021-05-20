import { FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import React from "react";

export default function Radiogrp(props) {
  const { name, label, value, onChange, items } = props;
  return (
      <FormControl>
          {label} 
    <RadioGroup
      row
      name={name}
      value={value}
      onChange={onChange}
      >   
      <FormControlLabel
        value="Male"
        control={<Radio />}
        label="Male"
        ></FormControlLabel>
      <FormControlLabel
        value="Female"
        control={<Radio />}
        label="Female"
        ></FormControlLabel>
      <FormControlLabel
        value="Other"
        control={<Radio />}
        label="Other"
        ></FormControlLabel>
    </RadioGroup>
        </FormControl>
  );
}
