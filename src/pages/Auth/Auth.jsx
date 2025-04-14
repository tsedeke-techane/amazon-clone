import React, { useContext, useState } from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import classes from "./SignUp.module.css"
import { auth } from '../../Utility/firebase'
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from 'firebase/auth'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import { Type } from '../../Utility/action.type'
import { BeatLoader, ClipLoader } from 'react-spinners'


function Auth() {
  
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [error,setError] = useState("")

  const [loading,setLoading] = useState({
    signIn:false,
    signUp:false
  })
  
  console.log(email,password)
  
  const [{user},dispatch] = useContext(DataContext)
  const navigate = useNavigate()
  const navStateData =useLocation()

  // console.log(navStateData)

  const authHandler=async(e)=>{

    e.preventDefault()
    // console.log(e.target.name)
    if (e.target.name=="signin"){
      setLoading({...loading,signIn:true})
      signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
        dispatch({
          type:Type.SET_USER,
          user:userInfo.user
        })
        setLoading({...loading,signIn:false})
        navigate(navStateData?.state?.redirect || "/",{replace:true})

      }).catch((err) => {
        setError(err.message); // Update error state with the error message from err
        setLoading({...loading,signIn:false})

      })
    }else{
        setLoading({...loading,signUp:true})
        createUserWithEmailAndPassword(auth,email,password).then((userInfo)=>{

          dispatch({
            type:Type.SET_USER,
            user:userInfo.user
          })
          setLoading({...loading,signUp:false})
          navigate(navStateData?.state?.redirect || "/",{replace:true})

        }).catch((err) => {
          console.error(err);
          setError(err.message);  // Update error state with the error message from err
          setLoading({...loading,signUp:false})
        
        })
    }
  }
  return (
    <>
    
      <section className={classes.login}>
      <Link to="/">
      <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/amazon_logo_icon_169612.png" alt="amazon-logo" />
      </Link>
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {
          navStateData?.state?.msg && 
          <small
          style={{
            padding:"5px",
            textAlign:"center",
            color:"red",
            fontWeight:"bold",
          }}
          >{navStateData?.state?.msg}</small>
        }
        <form action="">
          <div>
            <label htmlFor='email'>Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id='email' />
          </div>
  
          <div>
            <label htmlFor='password'>PassWord</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id='password'/>
          </div>
          <button type='submit' name='signin'  onClick={authHandler} className={classes.login__signInButton}>
            {
              loading.signIn?(<ClipLoader size={15}/>):(" Sign In")
            }
           
          </button>
        </form>
        <p>
          By signing-in you are agree to the AMAZON FAKE CLONE Conditions of use & Sale. please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
  
        </p>
        <button type='submit' name='signup'  onClick={authHandler} className={classes.login__registerButton}>
          {
            loading.signUp?(<ClipLoader size={15}/>):("Create your Amazon Account")
          }
          
        </button>
        {error && <small style={{padding:"10px",color:"red"}}>{error}</small>}
      </div>
      
      
     </section>
   
   </>
  )
}

export default Auth;
