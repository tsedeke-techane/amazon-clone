import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import classes from "./Product.module.css"
import Rating from "@mui/material/Rating"
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat"
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';

function ProductCard({product,flex,renderAdd,desc}) {
    const navigate = useNavigate();
    const {image,title,id,rating,price,description} = product;
    // console.log("product card page",product)

    const [state,dispatch] = useContext(DataContext)

    // console.log(state)
    // const handleRoute = ()=>{
    //     navigate(`/products/${id}`)
    // }
    let addToCart = ()=>{
        dispatch({
            type:Type.ADD_TO_BASKET,
            item:{
                image,title,id,rating,price,description
            }
        })
    }
  return (
   

   
    <div className={`${classes.card__container} ${flex?classes.product__flexed : ""}` }>
         
        <Link to = {`/products/${id}`}>
            <img src={image} alt='' className={classes.img_container} />
        </Link>
        <div>
            <h3>{title}</h3>
            {desc && <div style={{maxWidth:"750px"}}>{description}</div>}
            <div className={classes.rating}>
                <Rating value = {rating?.rate} precision = {0.1} />
                <small>{rating?.count}</small>
            </div> 
            <div>
                <CurrencyFormat amount={price}/>
            </div>
            {
                !(renderAdd) && <button className={classes.button} onClick={addToCart}>add to Cart</button>
            }
            
        </div>
    </div>
    
  )
}

export default ProductCard
