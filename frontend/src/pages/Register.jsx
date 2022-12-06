import React from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom";
import Logo from "../assets/logo.svg";

function Register() {
    const handleSubmit=(e)=>{
        e.preventDefault();
        alert("form is done")
    }
    const handleChange=(e)=>{
        // e.preventDefault();
        alert("working")
    }
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
   align-item:center;
   background-color:grey;
   .brand{
     display:flex;
     align-items:center;
     gap:1rem;
     justify-content:center;
     img{
        height:50px;
     }
   }
`
export default Register


