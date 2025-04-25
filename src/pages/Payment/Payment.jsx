import React, { useContext, useState } from 'react'
import LayOut from '../../Layout/LayOut'
import classes from './Payment.module.css'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
import { axiosInstance } from '../../Api/axios'
import { ClipLoader } from 'react-spinners'
import { db } from '../../Utility/firebase'
import { useNavigate } from 'react-router-dom'
import { Type } from '../../Utility/action.type'

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount
  }, 0)

  const totalPrice = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount
  }, 0)

  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  const handleChange = (e) => {
    e?.error?.message && setError(e?.error?.message)
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    try {
      setProcessing(true)

      // 1. Backend: Get clientSecret
      const response = await axiosInstance({
        method: 'POST',
        url: `/payment/create?total=${totalPrice * 100}`,
      })
      const clientSecret = response.data?.clientSecret

      console.log('Client Secret:', clientSecret)
      console.log('Stripe Object:', stripe)
      console.log('Card Element:', elements?.getElement(CardElement))

      // 2. Stripe confirmation
      const confirmResult = await stripe.confirmCardPayment(
        clientSecret, 
        {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      console.log('Confirm Result:', confirmResult)
      const paymentIntent = confirmResult?.paymentIntent
      console.log('PaymentIntent:', paymentIntent)

      // 3. Save to Firebase
      await db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        })

      dispatch({
        type: Type.EMPTY_BASKET,
      })

      setProcessing(false)
      navigate('/orders', { state: { msg: 'you have placed new order' } })
    } catch (error) {
      console.log('Error ####', error)
      setProcessing(false)
    }
  }

  return (
    <LayOut>
      <div className={classes.payment__header}>
        checkout ({totalItem}) items
      </div>

      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, index) => (
              <ProductCard
                key={item.id || index}
                product={item}
                flex={true}
                renderAdd={true}
              />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {error && <small style={{ color: 'red' }}>{error}</small>}
                <CardElement onChange={handleChange} />
                <div className={classes.payment__price}>
                  <div>
                    <span
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontWeight: 'bold',
                      }}
                    >
                      <p>Total Order</p> |{' '}
                      <CurrencyFormat amount={totalPrice} />
                    </span>
                  </div>
                  <button type='submit'>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color='gray' size={15} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      'Pay Now'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  )
}

export default Payment
