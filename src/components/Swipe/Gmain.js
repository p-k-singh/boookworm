import React from "react";
import ReactDOM from "react-dom";
import { useMotionValue, useTransform, useAnimation } from "framer-motion";
  
// Some styling for the card
const style = {
  backgroundImage: "URL(https://img.icons8.com/color/452/GeeksforGeeks.png)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundColor: "#55ccff",
  boxShadow: "5px 10px 18px #888888",
  borderRadius: 10,
  height: 300,
};

const Gmain = () => {
    const motionValue = useMotionValue(0);
  
  // To rotate the card as the card moves on drag
  const rotateValue = useTransform(motionValue, [-200, 200], [-50, 50]);
  
  // To decrease opacity of the card when swipped
  // on dragging card to left(-200) or right(200)
  // opacity gradually changes to 0
  // and when the card is in center opacity = 1
  const opacityValue = useTransform(
    motionValue,
    [-200, -150, 0, 150, 200],
    [0, 1, 1, 1, 0]
  );
  
  // Framer animation hook
  const animControls = useAnimation();
  
  return (
    <div className="App">
      
    </div>);
};

export default Gmain
