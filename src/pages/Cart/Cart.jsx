import React, { useContext } from 'react'
import ProductCard from '../../Components/Product/ProductCard'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'
import classes from "./cart.module.css"
import { Type } from '../../Utility/action.type'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import LayOut from '../../Layout/LayOut'

function Cart() {
  const [{basket,user},dispatch] = useContext(DataContext)
  const total = basket.reduce((amount,item)=>{
     return item.price * item.amount + amount
  },0)
  console.log("my basket",basket)
const increment = (item)=>{
  dispatch({
    type:Type.ADD_TO_BASKET,
    item
  })
}
const decrement = (id)=>{
  dispatch({
    type:Type.REMOVE_FROM_BASKET,
    id
  })
}

  return (
    <LayOut>
    <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
            <h3>Your shopping basket</h3>
            <hr />

            {
              basket?.length==0 ? (<p>Opps ! No item in your cart</p>):(
                basket?.map((item,i)=>{
                  return <section className={classes.cart_product}>

                    <ProductCard key={i} product={item} flex={true} renderAdd={true} desc={true}/>
                    <div className={classes.btn_container}>
                      <button className={classes.btn}  onClick={()=>increment(item)}><IoIosArrowUp size={20}/></button>
                      <span>{item.amount}</span>
                      <button className={classes.btn} onClick={()=>decrement(item.id)}><IoIosArrowDown size={20}/></button>
                    </div>
                  </section>
                })
              )
            }
        </div>
        
        {
          basket?.length !==0 && (
            <div className={classes.subtotal}>
              <div>
                <p> Subtotal ({basket?.length} items)</p>
                <CurrencyFormat amount ={total} />
              </div>
              <span>
                <input type='checkbox'/>
                <small>This Order Contains a gift</small>
              </span>
              <Link to="/payments">continue to checkout</Link>
              </div>
          )
        }
        <div>

        </div>
    </section>
    </LayOut>
  )
}

export default Cart
