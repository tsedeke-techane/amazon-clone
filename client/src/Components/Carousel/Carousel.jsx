import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import classes from "./Carousel.module.css"
import {img} from "./img/data"


function CarouselEffect() {
  return (
    <div>
      <Carousel 
      autoPlay = {true}
      infiniteLoop = {true}
      showIndicators = {false}
      showThumbs = {false}      >
        {
            img.map((imglink)=>{
                return <img src = {imglink} />
            })
        }
       
      </Carousel>
      <div className={classes.hero__img}></div>
    </div>
  )
}

export default CarouselEffect
