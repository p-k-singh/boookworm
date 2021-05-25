import React from 'react'
import styled from 'styled-components';
import Gmain from './Gmain';
import Mainsxn  from "./Mainsxn";
import { Gmcard } from "./Gmcard";
import "./Swipe.css"
import sample from "../../Assets/rsign.mp4";

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
    <div id="containeer">
<div id="navix"> <video
          className="videoTag"
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "1520%",
            zIndex: "-1",
          }}
        >
          <source src={sample} type="video/mp4"></source>
        </video></div>
<div id="infoix">
<Mainsxn />
</div>
</div>
  // <Mainsxn/> 
    
    );
}
export default Swipe;