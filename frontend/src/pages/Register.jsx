import React from 'react'
import styled from "styled-components";
import {Link} from "react-router-dom"

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
                <img src="" alt="" />
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
   
`
export default Register


