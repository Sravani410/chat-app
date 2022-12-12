import React, { useState,useEffect, useRef } from 'react'
import styled from "styled-components";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { allUsersRoute,host } from '../utils/APIRouter';
import {Contacts} from '../components/Contacts';
import { Welcome } from '../components/Welcome';
import { ChatContainer} from '../components/ChatContainer';
import {io} from "socket.io-client";


export const Chat=()=> {
 
  const [contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState(undefined);
  const [isLoading,setIsLoading]=useState(false);
  
  const socket=useRef();
  console.log("currentUser:",currentUser)

  const navigate=useNavigate();
  useEffect(()=>{
    const check=async()=>{
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login");
     }
     else{
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
       setIsLoading(true);
    }
    }
    check();
  },[])

  useEffect(()=>{
    if(currentUser){
      socket.current=io(host)
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser])

  useEffect(()=>{
 getUsers();
  },[currentUser])

  const getUsers=async()=>{
 if(currentUser){
    if(currentUser.isAvatarImageSet){
      const data=await axios.get(`${allUsersRoute}/${currentUser._id}`);
      setContacts(data.data.Users)
    }
    else{
      navigate("/setAvatar");
    }
  }
  }

  const handleCurrentChat=(chat)=>{
   setCurrentUser(chat);
  }
  return (
    <>
     <Container>
      <div className='container'>
         <Contacts contacts={contacts} currentUser={currentUser} changeChatFn={handleCurrentChat}/>
         {
          isLoading && currentUser === undefined ? (
            <Welcome currentUser={currentUser}/>
          ):(<ChatContainer currentUser={currentUser} currentChat={currentUser} socket={socket}/>)
         }
      </div>
     </Container>
    </>
   
  )
}

const Container = styled.div`
    /* border: 1px solid; */
    height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #050527;
    .container {
        /* border: 1px solid white; */
        height: 85vh;
        width: 85vw;
        
        background-color: #55535376;
        display: grid;
        grid-template-columns: 25% 75%;
        @media screen and (min-width : 720px) and (max-width : 1080px) {
            grid-template-columns: 35% 65%;
        }
        @media screen and (min-width : 160px) and (max-width : 720px) {
            /* border: 1px solid yellow ; */
            grid-template-columns: 98%;
        }
    }
`