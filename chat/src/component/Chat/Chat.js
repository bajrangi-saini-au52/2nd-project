import React, { useEffect, useState } from 'react'
import {user} from "../Join/Join";
import socketIO from "socket.io-client"
import "./Chat.css"
import Message from '../Message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom"
  



const ENDPOINT = "http://localhost:4500/";

const socket = socketIO(ENDPOINT,{ transports:['websocket']});


function Chat() {


  const [ id,setid] = useState("")
  const[message,setMessage] = useState([])


  const send=()=>{
   const message = document.getElementById('chatInput').value
    socket.emit('message',{message,id})
    document.getElementById('chatInput').value = "";
  }

  console.log(message)
  
 useEffect(()=>{

    socket.on('connect',()=>{
        alert("connectd")
        setid(socket.id);
    })



    socket.emit('joined',{user})

// event 
    socket.on('welcome',(data)=>{
      setMessage([...message,data]);
      console.log(data.user, data.message)
    })

    socket.on('userjoined',(data)=>{
      setMessage([...message,data]);
      console.log(data.user,data.message)
    })

    socket.on('leave',(data)=>{
      setMessage([...message,data]);
      console.log(data.user,data.message)
    })


    return()=>{
      socket.emit(`disconnectd`)
      socket.off()
        
    }

}, [socket])




useEffect(()=>{


  socket.on('sendmessage',(data)=>{
    setMessage([...message,data]);
     console.log(data.user,data.message,data.id)

  })



  return()=>{
    socket.off();
  }


},[message])

// this show only when array of msg is change



  return (
    <div className="chatPage">

        <div className="chatContainer">
            <div className="header">
              <h2>C CHAT</h2>
               <a href="/"><img src='' alt="close"/></a>
            </div>


            <ReactScrollToBottom className="chatBox">
              {message.map((item,i)=> <Message user={item.id === id?``:item.user} message = {item.message} classs={item.id === id?`rigth`:`left`}/>)}
            </ReactScrollToBottom>





            <div className="inputBox">
                <input onKeyPress={(event)=>event.key === `Enter` ? send():null} type="text" name='' id="chatInput"/> 
                <button onClick={send} className='sendBtn'>Send</button>
            </div>

             
        </div>                  
                      
                 
      
    </div>
  )
}

export default Chat
