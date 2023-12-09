import { useState,useRef,useEffect } from "react";
import { HiMenu } from 'react-icons/hi';

import { AiFillCloseCircle } from 'react-icons/ai';
import { Link,Route,Routes } from "react-router-dom"; 
import { Login,SideBar,UserProfile } from "../components";
import Pin from './Pin.jsx';
import logo from '../assets/logo.png'
import {client} from '../client.js'
import { userquery } from "../Utils/data.js";
import { fetchUser } from "../Utils/fetchUser.js";

const Home = () => {
    const [Toggle ,setToggle]=useState(false);
    const [User, setUser] = useState(null);
    const scrollRef=useRef(null);
    const userInfo = fetchUser();
    useEffect(()=>{
        const query = userquery(userInfo);
        client.fetch(query)
            .then((data)=>{
                setUser(data[0]);
            })
    },[])
    useEffect(() => {
        scrollRef.current.scrollTo(0,0);
    }, [])
    
    return ( 
        <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
            <div className="hidden md:flex h-screen flex-initial">
                <SideBar User={User && User}/>
            </div>
            <div className="flex md:hidden flex-row">
                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu fontSize={40} className='cursor-pointer' onClick={()=>setToggle(true)} />
                    <Link to='/'>
                        <img src={logo} alt='logo' className='w-28'/>
                    </Link>
                    <Link to={`/user-profile/${User?._id}`}>
                        <img src={User?.image} alt='UserProfile' className='w-28'/>
                    </Link>
                </div>
            {Toggle && (
                <div className="fixed w-4/5 overflow-y-auto h-screen bg-white shadow-md z-10 animate-slide-in">
                    <div className="absolute w-full flex justify-end items-center p-2">
                        <AiFillCloseCircle fontSize={30} className="cursor-pointer " onClick={()=>setToggle(false)}/>
                    </div>
                    <SideBar User={User && User} closeToggle={setToggle}/>
                </div>
            )}
            </div>
            <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
                <Routes>
                    <Route path="/user-profile/:user_id" element={<UserProfile/>}/>
                    <Route path="/*" element={<Pin User={User && User}/>}/>
                </Routes>
            </div>    
        </div>
    );
}
 
export default Home;