import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from "./Product.module.css";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { DataContext } from '../DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';

function ProductCard({ product, flex, renderAdd, renderDesc }) {
  // Prevent broken product rendering
  if (!product || !product.id) {
    console.warn("❌ Invalid product passed to ProductCard:", product);
    return null;
  }

  const { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  return (
    <div className={`${classes.card__container} ${flex ? classes.product__flexed : ""}`}>
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={classes.img_container} />
      </Link>

      <div>
        <h3>{title}</h3>

        {renderDesc && (
          <div style={{ maxWidth: "750px" }}>
            {description}
          </div>
        )}

        <div className={classes.rating}>
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          <small>{rating?.count || 0}</small>
        </div>

        <div>
          <CurrencyFormat amount={price} />
        </div>

        {
          !renderAdd && (
            <button className={classes.button} onClick={addToCart}>
              Add to Cart
            </button>
          )
        }
      </div>
    </div>
  );
}

export default ProductCard;
