import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import { ProductUrl } from '../../Api/endPoints'
import classes from "./Product.module.css"
import axios from "axios"
import Loader from '../Loader/Loader'
function Product() {
  const [results,seResults] = useState([])
  const [isLoading,setIsLoading] = useState(false)
  // console.log("before",results)
  useEffect(()=>{
    setIsLoading(true)
    axios.get(`https://fakestoreapi.com/products`)
    .then((res)=>{
      // console.log("the fetched data in product components",res)
      seResults(res.data)
      setIsLoading(false)
      // console.log("after", results)
    }).catch((err)=> {
      console.log("err")
      setIsLoading(false)
  })
  }
  ,[])
  return(
    <>   
    {
      isLoading?(<Loader />):( <section className={classes.products_container}>
        {results?.map((product)=>(
          <ProductCard 
          key={product.id}
          product = {product}
          flex = {false} 
          />
        ))}
      </section>)
    }
   
  </>
  )
}

export default Product
