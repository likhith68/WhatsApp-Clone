import './SidebarChat.css';
import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import db from "./firebase"
import { Link } from 'react-router-dom';

function SidebarChat({ id, name, addNewChat }) {

    const [seed, setSeed] = useState("");
    const[messages,setMessages]=useState("");
    
    useEffect(()=>{
        if(id)
        {
            db.collection('rooms').doc(id).collection('messages').orderBy("timestamp","desc").onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map((doc)=>doc.data()))
            ));
        }
    },[id]);
    
    //UseEffect for random Avatars
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    //useEffect for adding rooms directly 
    const createChat = () => {
        const roomName = prompt("Please enter a name for the chat");
        if (roomName) {
            db.collection('rooms').add({
                name:roomName, 
            })
        }
    };

    return !addNewChat ? ( 
    <Link to={`/rooms/${id}`}>
        <div className = 'sidebarchat' >
            <Avatar src = { `https://avatars.dicebear.com/api/human/${seed}.svg` }/> 
            <div className = "sidebarchat__info" >
                <h2 > { name } </h2> <p>{messages[0]?.message}</p> 
            </div > 
        </div>
    </Link>
    ) : ( 
        <div onClick = { createChat } className = 'sidebarchat' >
            <h2> Add New Chat </h2> 
        </div >
    );
}

export default SidebarChat