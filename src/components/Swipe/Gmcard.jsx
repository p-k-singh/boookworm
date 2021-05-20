import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";
import styled from "styled-components";
import BookImg from "../Swipe/image.png"
import { Bookdetails } from "./Bookdetails";
const CardWrapper = styled.div`
  width: 100%;
  perspective: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled(motion.div)`
  width: 300px;
  height: 490px;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  box-shadow: 0 2px 7px 1px rgba(31, 31, 31, 0.2);
  background-color: #1d1f21;
  color: #fff;
  position: relative;
  cursor: grab;
`;

const CircleWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  overflow: hidden;
  border-top-right-radius: 25px;
`;

const Circle = styled.div`
  position: absolute;
  width: 350px;
  height: 350px;
  top: -4.2em;
  right: -10em;
  z-index: 5;
  background-color: #fa87ce;
  border-radius: 50%;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1.2;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  padding: 1em 15px;
`;

const BottomContainer = styled.div`
  display: flex;
  flex: 0.8;
  padding: 0 1em;
`;

const Genre = styled(motion.h1)`
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 2.5em;
  z-index: 10;
  font-size: 80px;
  font-weight: 900;
`;

const BookWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Book = styled(motion.div)`
  width: auto;
  height: 310px;
  z-index: 99;
  user-select: none;
  margin-right: 0em;
  margin-top: 7em;
  img {
    width: auto;
    height: 100%;
    user-select: none;
  }
`;

export function Gmcard(props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-1000, 1000], [300, -300]);
  const rotateY = useTransform(x, [-1000, 1000], [-300, 300]);

  return (
    <CardWrapper>
      <CardContainer
        style={{ x, y, rotateX, rotateY, z: 100 }}
        drag
        dragElastic={0.16}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        whileTap={{ cursor: "grabbing" }}
        
      >
        <TopContainer>
          <CircleWrapper>
            <Circle />
          </CircleWrapper>
          <BookWrapper>
            <Book
              style={{ x, y, rotateX, rotateY, rotate: "0deg", z: 100000 }}
              drag
              dragElastic={0.12}
              whileTap={{ cursor: "grabbing" }}
            >
                <img src={BookImg} />
            </Book>
          </BookWrapper>
          <Genre
           style={{rotate: "-18deg"}}
          >Horror</Genre>
        </TopContainer>
        <BottomContainer>
         <Bookdetails/>
        </BottomContainer>
      </CardContainer>
    </CardWrapper>
  );
  };