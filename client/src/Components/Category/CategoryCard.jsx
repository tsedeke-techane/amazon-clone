import React from 'react'
import classes from "./category.module.css"
import { Link } from 'react-router-dom'
function CategoryCard({data}) {
    console.log("category card is here ",data)
  return (
    <div className={classes.category}>
      <Link to={`/category/${data.category}`}>
        <span>
            <h2>{data.title}</h2>
        </span>
        <img src={data.image} alt={data.category} />
        <p>shop now</p>
      </Link>
    </div>
  )
}

export default CategoryCard
