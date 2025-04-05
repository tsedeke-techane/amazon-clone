import React, { useContext } from 'react'

import classes from "./Header.module.css"
import {Link} from "react-router-dom"
import { BiCart } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { FaSearch } from "react-icons/fa";
import { SlLocationPin } from 'react-icons/sl';
import LowerHeader from './LowerHeader';
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/firebase'

function Header() {
    const [{basket,user},dispatch] = useContext(DataContext)
    const totalItem = basket?.reduce((amount,item)=>{
        return item.amount +amount
    },0)
    
    console.log("here is my basket:-",basket)
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
            <div className={classes.logo__container}>
                <Link to="/">
                    <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
                </Link>
                <div className={classes.delivery}>
                <span>
                    <SlLocationPin />   
                </span>
                <div>
                    <p>Deliver to</p>
                    <span>Ethiopia</span>
                    </div>
                </div>
            </div>
            <div className={classes.search}>
                <select name="" id="">
                    <option value="">All</option>
                    <option value="">brand</option>
                </select>
                <input type="text" name='' id='' placeholder='search Amazon'/>
                <BsSearch size={38}/>
            </div>
            <div className={classes.order__container}>
                <Link to="" className={classes.language}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/800px-Flag_of_the_United_States.png" alt="USA" />
                    <select name='' id=''>
                        <option value="">EN</option>
                    </select>
                    </Link>
                <Link to={!user &&"/auth"}>
                    <div>
                    {
                        user?(
                            <>
                            <p>Hello {user?.email?.split("@")[0]}</p>
                            <span onClick={()=>auth.signOut()}>sign Out</span>
                            </>
                        ):(
                            <>
                            <p>Hello,Sign In</p>
                            <span>Account & Lists</span>
                            </>
                        )
                    }
                        {/* <p>Sign In</p> */}
                    </div>
                       
                </Link>
                <Link to="/orders">
                    <p>returns</p>
                    <span>& Orders</span>
                </Link>
                <Link to='/cart' className={classes.cart}>
                <BiCart size={35}/>
                <span>{totalItem}</span>
                </Link>
            </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  )
}

export default Header
