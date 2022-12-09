import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { loginRoute } from "../utils/APIRouter"

const Login=()=> {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    password: "",
  })


  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/')
    }
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    // alert("form")

    if (handleValidation()) {
      console.log(loginRoute)
      const { username, password } = values;

      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOption);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user))
        navigate("/setAvatar");
      }
      
    };
    alert("");

  }
  const handleValidation = () => {
    
     alert("as")
    const { username, password } = values;

    console.log(username, password)

    if (password<8) {
      console.log("password:", password,)
      // console.log(e)
      // console.log("toast message :",toast)
      toast.error("Password should be greater or equal to 8 character", toastOption);
      return false;
    }
    else if (username === "" || password==="") {
      // console.log("username:",username.length)
      toast.error("username and password is required", toastOption);
      return false;
    }

    return true;
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }


  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className='brand'>
            <img src={Logo} alt="Logo" />
            <h1>Login</h1>
          </div>
          <input type="text" placeholder='Username' name="username" className="input" onChange={handleChange} min="3" />
          <input type="password" placeholder='password' name="password" className='input' onChange={handleChange} />
          <button type="submit">Login</button>
          <span>Don't have a account ? <Link to="/register">Register</Link></span>
        </form>
        <ToastContainer></ToastContainer>
      </FormContainer>
    </>
  )
}
const FormContainer = styled.div`
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
export default Login


