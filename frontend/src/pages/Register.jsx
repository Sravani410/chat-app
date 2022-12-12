import React, { useState,useEffect } from 'react'
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { registerRoute } from "../utils/APIRouter"

const  Register=()=> {
    
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })


    const toastOption = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("chat-app-user")){
            navigate("/login")
        }
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();
        // alert("form")

        if (handleValidation()) {
            // console.log(registerRoute)
            const { username, email, password } = values;

            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOption);
            }
            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user))
               navigate("/login");
            }
            
        };
        alert("");

    }
    const handleValidation = () => {
    
         //alert("as")
        const { username, email, password, confirmPassword } = values;

        console.log(username, email, password, confirmPassword)

        if (password !== confirmPassword || password === "" || confirmPassword === "") {
            console.log("password:", password, "confirmPassword:", confirmPassword)
            // console.log(e)
            // console.log("toast message :",toast)
            toast.error("password and confirm password should be same !", toastOption);
            return false;
        }
        // else if (username.length < 3 || username === "") {
        //     // console.log("username:",username.length)
        //     toast.error("username should not be less than 3 !", toastOption);
        //     return false
        // }
        else if (password.length < 8 || password === "") {
            // console.log("username:",username.length)
            toast.error("password should be atleast minimum 8 characters!", toastOption);
            return false
        }
        else if (email === "") {
            toast.error("email should not be empty", toastOption);
            return false
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
                        <h1>Chat app</h1>
                    </div>
                    <input type="text" placeholder='Username' name="username" className="input" onChange={handleChange} />
                    <input type="email" placeholder='Email' name="email" className='input' onChange={handleChange} />
                    <input type="password" placeholder='password' name="password" className='input' onChange={handleChange} />
                    <input type="password" placeholder="confirm Password" name="confirmPassword" className='input' onChange={handleChange} />
                    <button type="submit">Create User</button>
                    {/* <input type="submit" value="Submit" /> */}
                    <span>have a already account ? <Link to="/login">Login</Link></span>
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
export default Register


