import { AttachFile, MoreVert, SearchOutlined } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MicIcon from "@mui/icons-material/Mic";
import InsertEmoticon from "@mui/icons-material/InsertEmoticon";
import {useStateValue} from "./StateProvider";
import "./Chat.css";
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function Chat() {
    const[input,setInput]=useState("");
    const[Seed,setSeed]=useState("");
    const{roomId}=useParams();
    const[roomName,setRoomName]=useState("");
    const[messages,setMessages]=useState([]);
    const[{user}]=useStateValue();


    //change room name useEffect
    useEffect(()=>{
        if(roomId)
        {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
                setRoomName(snapshot.data().name)));
            
            
            //collecting messages stored in db and storing it in the setmessages array from which we will display again
            db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map(doc=>doc.data()))
            ))
        }
    },[roomId]);

    //for random Avatars useEffect
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[roomId]);

    //Displays what wwe typed in console realtime
    const sendMessage = (e) =>{
        e.preventDefault();
        console.log("You typed >> ",input);
        db.collection('rooms').doc(roomId).collection("messages").add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
    }

  return (
    <div className='chat'>
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${Seed}.svg`}/>
        <div className="chat__headerInfo">
            <h3>{roomName}</h3>
            <p>last seen{" "}
                {new Date(
                messages[messages.length-1]?.timestamp?.toDate()
           ).toUTCString()}</p>
        </div>
        <div className="chat__headerRight">
            <IconButton>
                <SearchOutlined/>
            </IconButton>
            <IconButton>
                <AttachFile/>
            </IconButton>
            <IconButton>
                <MoreVert/>
            </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map((message)=>(
            <p className={`chat__message ${message.name==user.displayName && "chat__receiver"}`}>
                <span className="chat__name">{message.name}</span>
                    {message.message}
                <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
            </p>
        ))}
        
      </div>

      <div className="chat__footer">
        <InsertEmoticon/>
        <form action="">
            <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}  placeholder='Type a message'/>
            <button type="submit" onClick={sendMessage}>Send a Message</button>
        </form>
        <MicIcon/>
      </div>
    </div>
  )
}

export default Chat
