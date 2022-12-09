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
  const navigate=useNavigate();
  const [contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState(undefined);
  const [isLoading,setIsLoading]=useState(false);
  
  const socket=useRef();
  console.log("currentUser:",currentUser)


  useEffect(async()=>{
     if(!localStorage.getItem("chat-app-user")){
      navigate("/login");
     }
     else{
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
       setIsLoading(true);
    }
  },[])

  useEffect(()=>{
    if(currentUser){
      socket.current=io(host)
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser])

  useEffect(async()=>{
  if(currentUser){
    if(currentUser.isAvatarImageSet){
      const data=await axios.get(`${allUsersRoute}/${currentUser._id}`);
      setContacts(data.data)
    }
    else{
      navigate("/setAvatar");
    }
  }
  },[currentUser])

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

const Container=styled.div`
     height:100vh;
     width:100vw;
     display:flex;
     flex-direction:column;
     justify-content:center;
     gap:1rem;
     align-items:center;
     gap:1rem;
     align-items:center;
     background-color:grey ;
     .container{
      height:85vh;
      width:85vw;
      background-color:black;
      display:grid;
      grid-template-columns:25% 75%
      @media screen and (min-width:720px) and (max-width:1080px)
         grid-template-columns:35% 65%;

     }
`