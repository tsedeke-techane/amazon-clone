import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import classes from "./Results.module.css"
import ProductCard from '../../Components/Product/ProductCard'
import { ProductUrl } from '../../Api/endPoints'
import Loader from '../../Components/Loader/Loader'
import LayOut from '../../Layout/LayOut'

function Results() {
  const { categoryName } = useParams(); // ✅ fix here
  const [results, seResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${ProductUrl}/products/category/${categoryName}`)
      .then((res) => {
        seResults(res.data);
        setIsLoading(false);
      }).catch((err) => {
        console.log("err", err);
        setIsLoading(false);
      });
  }, [categoryName]); // ✅ good to include as dependency

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p>Category / {categoryName}</p>
        <hr />
        {
          isLoading
            ? (<Loader />)
            : (
              <div className={classes.products_container}>
                {results?.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>)
        }
      </section>
    </LayOut>
  )
}

export default Results;
