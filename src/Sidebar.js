import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from "@mui/material";
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./Sidebar.css";
import {SearchOutlined } from '@mui/icons-material';
import SidebarChat from './SidebarChat';
import db from "./firebase";
import {useStateValue} from "./StateProvider";


function Sidebar() {
    const[rooms,setRooms] =useState([]);
    const[{user},dispatch]=useStateValue();


    //useEffect for displaying rooms
    useEffect(()=>{
        const unsubscribe=db.collection('rooms').onSnapshot(snapshot=>(
            setRooms(snapshot.docs.map(doc=>
            ({
                id:doc.id,
                data:doc.data(),
            })
            ))
        ))
        return ()=>{
            unsubscribe();
        }
    },[])
    return ( 
    <div>
        <div className = "sidebar" >
            <div className = "sidebar__header" >
            <Avatar src={user?.photoURL}/ >
            <div className = "sidebar__headerRight" >
                <IconButton >
                    <DonutLargeIcon / >
                </IconButton>
                <IconButton >
                    <ChatIcon / >
                </IconButton> 
                <IconButton >
                    <MoreVertIcon / >
                </IconButton> 
            </div > 
            </div>
        <div className = "sidebar__search" >
            <div className = "sidebar__searchContainer" >
                <SearchOutlined / >
                <input type = "text" placeholder = "Search or start a new chat" / >
            </div>
        </div >

        <div className = "sidebar__chats" >
            <SidebarChat addNewChat / >
            {rooms.map(room => (
                <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
            ))}
        </div>
        </div>
    </div>
    )
}

export default Sidebar