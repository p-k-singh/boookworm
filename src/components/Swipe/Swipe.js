import React from 'react'
import styled from 'styled-components';
import Gmain from './Gmain';
import Mainsxn  from "./Mainsxn";
import { Gmcard } from "./Gmcard";

  const AppContainer = styled.div`
    width: 100%;
    height:100%;
    max-width: 100%;
    overflow-x: hidden;
    display: flex;
    aligh-items: center;
    justify-content: center;
  `;

const Swipe = () => {
  return (  
           <Mainsxn />
            
        //  <Gmcard/>
    );
}
export default Swipe;