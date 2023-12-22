import { useState, useEffect } from "react";
import { AiOutlineLogout } from 'react-icons/ai'
import { googleLogout } from '@react-oauth/google'
import {useParams,useNavigate} from 'react-router-dom'
import { userCreatedPinsQuery,userquery,userSavedPinsQuery } from "../Utils/data";
import {client} from '../client';
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
const UserProfile = () => {
    const randomImg = 'https://source.unsplash.com/1600x900/?nature,photography,games,travel,technology'
    const activeBtnStyle = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
    const notActiveBtnStyle = "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none "
    const [user, setUser] = useState()
    const [pins,setPins] = useState()
    const [text, setText] = useState('Created')
    const [activeBtn,setActiveBtn] = useState('Created')
    const navigate = useNavigate();
    const {user_id} = useParams();
    useEffect(()=>{
        const query = userquery(user_id);
        client.fetch(query)
              .then((doc)=>{
                console.log(doc)
                setUser(doc[0]);
              })

    },[user_id])
    useEffect(()=>{
        if(text==='Created'){
            const createdQuery = userCreatedPinsQuery(user_id);
            client.fetch(createdQuery)
                   .then((doc)=>{
                        setPins(doc)
                   })
        }else{
            const savedQuery = userSavedPinsQuery(user_id);
            client.fetch(savedQuery)
                  .then((doc)=>{
                        setPins(doc); 
                  })
        }
    },[text,user_id]);
    const logout=()=>{
        googleLogout();
        localStorage.clear();
        navigate('/login');
    }
    if(!user){
        return <Spinner message={'Loading User Profile...'}/>
    }
    return (  
        <div className="relative pb-2 h-full flec justify-center items-center">
            <div className="flex flex-col pb-5">
                <div className="relative flex flex-col mb-7">
                    <div className="flex flex-col justify-center items-center">
                        <img 
                            src={randomImg}
                            className="h-370 w-full 2xl:h-510 shadow-lg mt-5 object-cover"
                            alt="Cover Pic"
                        />
                        <img 
                            className="rounded-full w-30 h-30 -mt-10 shadow-xl object-cover"
                            src={user.image}
                        />    
                        <h1 className="font-bold text-3xl text-center mt-3">{user.username}</h1>
                    </div>
                    <div className="absolute top-0 z-1 right-0 mt-5 p-2">
                        {user_id === user._id && (
                            <button 
                                className="bg-white p-2 rounded-full cursor-pointer oultline-none shadow-lg"
                                onClick={logout}
                            >
                                <AiOutlineLogout color="red" fontSize={21}/>
                            </button>
                        )}
                    </div>
                </div>
                <div className="text-center mb-7">
                    <button
                        type='button'
                        onClick={(e)=>{
                            setText(e.target.textContent)
                            setActiveBtn('Created')
                            
                        }}
                        className={`${activeBtn ==='Created' ? activeBtnStyle : notActiveBtnStyle}`}
                    >
                     Created
                    </button>
                    <button
                        type='button'
                        onClick={(e)=>{
                            setText(e.target.textContent)
                            setActiveBtn('saved')
                        }}
                        className={`${activeBtn ==='saved' ? activeBtnStyle : notActiveBtnStyle}`}
                    >
                     Saved
                    </button>
                </div>
                {pins?.length ? (
                    <div className="px-2">
                        <MasonryLayout pins={pins}/>
                    </div>
                ):(
                    <div className="font-bold flex justify-center text-xl">
                        No Pins Found 😐
                    </div>
                )}
            </div>
        </div>
    );
}
 
export default UserProfile;