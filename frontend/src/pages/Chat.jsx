import React, { useState,useEffect } from 'react'
import styled from "styled-components";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { allUsersRoute,host } from '../utils/APIRouter';
import Contacts from '../components/Contacts';

function Chat() {
  const navigate=useNavigate();
  const [contacts,setContacts]=useState([]);
  const [currentUser,setCurrentUser]=useState(undefined)
  useEffect(async()=>{
     if(!localStorage.getItem("chat-app-user")){
      navigate("/login");
     }
     else{
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")))
     }
  },[])
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
  return (
    <>
     <Container>
      <div className='container'>
         <Contacts contacts={contacts} currentUser={currentUser} changeChatFn={handleCurrentChat}/>
         {
          isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser}/>
          )
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
export default Chat