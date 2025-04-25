import React, { useContext, useEffect, useState } from 'react';
import LayOut from '../../Layout/LayOut';
import { db } from '../../Utility/firebase';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import classes from './Orders.module.css';
import ProductCard from '../../Components/Product/ProductCard';

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection('users')
        .doc(user?.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });

      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {orders?.length === 0 && <p>No order yet</p>}
          <div>
            {orders?.map((eachOrder) => (
              <div key={eachOrder.id}>
                <hr />
                <p>Order ID: {eachOrder?.id}</p>
                {eachOrder?.data?.basket?.map((order) => (
                  <ProductCard
                    flex={true}
                    product={order}
                    key={order.id}
                    renderAdd={true}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
