import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import {Route, Routes } from 'react-router-dom';
import Lpage from './Lpage';
import {useStateValue} from "./StateProvider";


function App() {
    const[{user}]=useStateValue();
    

    return ( 
    <div className = "App" >
        {!user ?
            (   
                <Lpage/>
            ):
            (
                <div className = 'app__body' >
                    <Sidebar />
                    <Routes>
                        <Route path="/rooms/:roomId" element={<><Chat/></>}/>
                        <Route path="/"  element={<Chat/>}/>
                    </Routes>
                </div>   
            )
        }
    </div>
    );
}

export default App;