import React, { useState } from 'react'
import "./join.css";
import {Link} from "react-router-dom"



let user;

const sendUser=()=>{
  user = document.getElementById('joinInput').value;
  document.getElementById('joinInput').value = "";
  
}


const Join = () => {

 const [name,setname] = useState("")
 console.log(name)

  return (
    <div className='joinPage'>
       <div className='joinContainor'>
        <img src="C:\Users\Giriraj Ranjan\Downloads\mobile.jpg"  alt="logo"/>
        <h1>C chat</h1>
        <input onChange={(e)=>setname(e.target.value)} placeholder='Enter Your Name' type="text" id="joinInput"/>

        <Link onClick={(event)=> !name ?event.preventDefault():null} to="/chat"> 
        <button onClick={sendUser} className='joinBtn'>Login</button>
        </Link>
       </div>
    </div>
  )
}

export default Join
export{user}
