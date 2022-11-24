// src/component/Gallery.js
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { sliderItems } from "../../data";
import { Carousel } from 'react-responsive-carousel';
import styled from "styled-components";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

import("./slidert.css")


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;

`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;






const Slidert = (props) => {

  return (
    <Carousel interval="5000" transitionTime="5000" showThumbs={false} >
      {props.products?.map((item) => (
        <div className="container-slider" key={item._id}>
          <div className="container-img">
            <Link to={`/product/${item?._id}`}><Image src={item?.img} className="container-image" /></Link>
          </div>
          <div className="container-info">
            <h1 className="container-title">{item?.categories}</h1>
            <p className="container-desc">{item?.desc}</p>
            <Link to={`/products/${item?.categories}`}><button className="container-btn">SHOW MORE</button></Link>
          </div>
        </div>
      ))}
    </Carousel >

  )

}

export default Slidert


