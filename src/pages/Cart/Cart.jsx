import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import ProductCard from '../../Components/Product/ProductCard';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import { Type } from '../../Utility/action.type';
import LayOut from '../../Layout/LayOut';

import classes from './cart.module.css';

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const calculateTotal = () =>
    basket.reduce((total, item) => total + item.price * item.amount, 0);

  const total = calculateTotal();


  const handleIncrement = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const handleDecrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello{user && `, ${user.name}`}</h2>
          <h3>Your Shopping Basket</h3>
          <hr />

          {basket?.length === 0 ? (
            <p>Oops! No items in your cart.</p>
          ) : (
            basket.map((item) => (
              <section key={item.id} className={classes.cart_product}>
                <ProductCard
                  product={item}
                  flex={true}
                  renderAdd={true}
                  renderDesc={true}
                />
                <div className={classes.btn_container}>
                  <button
                    className={classes.btn}
                    onClick={() => handleIncrement(item)}
                  >
                    <IoIosArrowUp size={20} />
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={classes.btn}
                    onClick={() => handleDecrement(item.id)}
                  >
                    <IoIosArrowDown size={20} />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>

        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" id="gift" />
              <label htmlFor="gift">
                <small>This order contains a gift</small>
              </label>
            </span>
            <Link to="/payments" className={classes.checkout_link}>
              Continue to Checkout
            </Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;

