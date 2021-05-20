import { TextField } from '@material-ui/core';
import React from 'react'

export default function Inputgm(props) {
    
    const {name,label,value,disabled,onChange} = props;
    return (
        <TextField
        variant="outlined"  
        label={label}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        />
    )
}
