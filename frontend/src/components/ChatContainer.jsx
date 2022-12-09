import styled from "styled-components";

import axios from "axios";

import { sendMessageRoute,getMessageRoute } from "../utils/APIRouter";

import { useState,useEffect,useRef } from "react";

import { v4 as uuidv4 } from 'uuid';

export const ChatContainer =({currentUser,currentChat,socket})=>{
    const [message,setMessage]=useState([]);
    
    const [arrivalMessage,setArrivalMessage]=useState(null);

    const scrollRef=useRef()

    console.log("message:",message)
    useEffect(()=>{
       findMessage();
    },[currentChat]);

    const findMessage=async()=>{
        if(currentChat){
            const response=await axios.post(getMessageRoute,{
                from : currentUser._id,
                to: currentChat._id
            })
            setMessage(response.data)
        }
    }
const handleSendMessage=async(msg)=>{
    const {data}=await axios.post(sendMessageRoute,{
        from : currentUser._id,
        to:currentChat._id,
        message:msg
    })
    console.log("data:",data)
    
    socket.current.emit("send-msg",{
        to:currentChat._id,
        from:currentUser._id,
        message:msg,
    })

    const mgs=[...message];
    
    

}

    return (
        <>
         <Container>
            <div className="chat-header">
                <div className="user-details">
                   <div className="avatar">
                       {currentChat ===undefined ? "":<img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar"/>}
                   </div>
                   <div className="username">
                        <h3>{currentChat===undefined?"":currentChat.username}</h3>
                   </div>
                </div>
              <Logout/>
            </div>
            <div className="chat-message">
                {message.map((el)=>{
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                           {/* <div className={`message ${element.fromSelf ? :"sended" :"recieved"}`}>

                           </div> */}
                        </div>
                    )
                })}
            </div>
            <ChatInput handleSendMsgFn={handleSendMessage}/>
        </Container> 
        </>
    )
}