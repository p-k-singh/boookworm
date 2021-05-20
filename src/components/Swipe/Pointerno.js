
import React, { useRef, useEffect, useState } from "react"
import { motion, useMotionValue, useAnimation } from "framer-motion"
import styled from "@emotion/styled"

const StyledCard = styled(motion.div)`
  position: absolute;
`

export  const Pointerno = ({ children, style, onVote, id, ...props }) => {
  // motion stuff
  const cardElem = useRef(null)

  const x = useMotionValue(0)
  const controls = useAnimation()

  const [constrained, setConstrained] = useState(true)

  const [direction, setDirection] = useState()

  const [velocity, setVelocity] = useState()

  const getVote = (childNode, parentNode) => {
    const childRect = childNode.getBoundingClientRect()
    const parentRect = parentNode.getBoundingClientRect()
    let result =
      parentRect.left >= childRect.right
        ? false
        : parentRect.right <= childRect.left
        ? true
        : undefined
    return result
  }

  // determine direction of swipe based on velocity
  const getDirection = () => {
    return velocity >= 1 ? "right" : velocity <= -1 ? "left" : undefined
  }

  const getTrajectory = () => {
    setVelocity(x.getVelocity())
    setDirection(getDirection())
  }

  const flyAway = (min) => {
    const flyAwayDistance = (direction) => {
      const parentWidth = cardElem.current.parentNode.getBoundingClientRect()
        .width
      const childWidth = cardElem.current.getBoundingClientRect().width
      return direction === "left"
        ? -parentWidth / 2 - childWidth / 2
        : parentWidth / 2 + childWidth / 2
    }

    if (direction && Math.abs(velocity) > min) {
      setConstrained(false)
      controls.start({
        x: flyAwayDistance(direction)
      })
    }
  }

  useEffect(() => {
    const unsubscribeX = x.onChange(() => {
      const childNode = cardElem.current
      const parentNode = cardElem.current.parentNode
      const result = getVote(childNode, parentNode)
      result !== undefined && onVote(result)
    })

    return () => unsubscribeX()
  })

  return (<>
{/*  
 <h1 style={{fontSize:"100px",position:"absolute", left: "390px", color : velocity >= 1?"green" : "green"}}>YEAH✔ </h1> */}
<h1 style={{cursor:"pointer", fontSize:"100px",position:"relative", right: "380px" ,color : direction == "left"?"red" : "red"}}> NAY❌</h1> 
    </>
  )
}
