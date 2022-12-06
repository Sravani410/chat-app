import React, { useState } from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";
import Logo from "../assets/logo.svg";

function Register() {
    const [values,setValues]=useState({
       username:"",
       email:"",
       password:"",
       confirmPassword:"",
    })

    const handleSubmit=(e)=>{
        e.preventDefault();
        alert("form is done")
    }
    const handleChange=(e)=>{
       const { name,value }=e.target
        setValues({
          ...values,
          [name]:value
        })
    }
    console.log("values :",values)
  return (
        <>
          <FormContainer>
               <form onSubmit={(e)=>handleSubmit(e)}>
              <div className='brand'>
                <img src={Logo} alt="Logo" />
                <h1>Chat app</h1>
              </div>
              <input  type="text" placeholder='Username' name="username" onChange={(e)=>handleChange(e)}/>
              <input type="email" placeholder='Email' name="email" onChange={(e)=>handleChange(e)} />
              <input type="password" placeholder='password' name="password" onChange={(e)=>handleChange(e)} />
              <input type="password" placeholder="Re-Enter Password" name="Re-Enter password" onChange={(e)=>handleChange(e)} />
              <button type="button">Create User</button>
              <span>have a already account ? <Link to="/login">Login</Link></span>
           </form>
           </FormContainer>
        </>
          
          
       
   
  )
}
const FormContainer=styled.div `
    
   height:100vh;
   width:100vw;
   display:flex;
   flex-direction:column;
   justify-content:center;
   gap:1rem;
   align-items:center;
   background-color:grey;
    .brand {
        /* border: 1px solid white; */
        display: flex;
        align-items: center;
        gap: .01rem;
        justify-content: center;
        img {
            height: 3.5rem;
        }
        h1 {
            margin: auto;
            color: white;
            text-transform: uppercase;
        }
    }

    form {
        /* border: 1px solid white; */
        height: 40vw;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        background-color: #55535376;
        border-radius: 2rem;
        padding: 2.2rem 4rem;
        input {
            background-color: transparent;    
            padding: 1rem;
            border: 0.1rem solid #4e0eff;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #997af0;
                outline: none;
            }
        }
        button {
            background-color: #997af0;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;
            &:hover {
               background-color: #4e0eff;
            }
        }
        span {
            color: white;
            text-transform: uppercase;
            a {
                color: #4e0eff;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`
export default Register


