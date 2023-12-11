import { useState,useEffect } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { BsFillSendCheckFill } from "react-icons/bs";
import MasonryLayout from './MasonryLayout'
import {Link,useParams} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import { client,urlFor } from "../client";
import {pinDetailMorePinQuery,pinDetailQuery} from '../Utils/data'
import Spinner from './Spinner';

const PinDetails = ({User}) => {
    const [pin, setPin] = useState()
    const [pinDetail, setPinDetail] = useState(null)
    const [comment, setComments] = useState()
    const [addingCommnet, setAddingComments] = useState(false)
    const {pinID}  = useParams();
    const fetchPinDetails = ()=>{
        let query = pinDetailQuery(pinID);
        if(query){
            client.fetch(query)
            .then((data)=>{
                setPinDetail(data[0]);
                if(data[0]){
                    query = pinDetailMorePinQuery(data[0]);
                    client.fetch(query)
                    .then((res)=>{
                        setPin(res);
                    })
                }
            })
        }
    }
    useEffect(()=>{
        fetchPinDetails()
    },[pinID])
    if(!pinDetail){
        return <Spinner message={'Loading Details...'}/>
    }
    const addComment= ()=>{
        if(comment){
            setAddingComments(true)
            client
                .patch(pinID)
                .setIfMissing({comment:[]})
                .insert('after','comment[-1]',[{
                    comment,
                    _key: uuidv4(),
                    postedBy:{
                        _type:'postedBy',
                        _ref:User?._id
                    }
                }])
                .commit()
                .then(()=>{
                    fetchPinDetails();
                    setAddingComments(false);
                    setComments('');
                })
        }
        
    }
    return (  
        <div className="flex xl-flex-row flex-col m-auto bg-white" style={{maxWidth:'1200px', borderRadius:'32px'}}>
            <div className="flex justify-center items-center md:items-start flex-inital ">
                <img src={pinDetail?.image && urlFor(pinDetail.image).url()} alt="user-post"
                    className="rounded-t-3xl rounded-b-lg"
                />
            </div>
            <div className="w-full p-5 flex-1 xl:min-w-620">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                    <a 
                        href={`${pinDetail?.image?.asset?.url}?dl=`}
                        download
                        onClick={(e)=>e.stopPropagation()}
                        className='bg-white w-9 h-9 p-1 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                    >
                        <MdDownloadForOffline/>
                    </a>
                    </div>
                    <a href={pinDetail?.destination}>
                        {pinDetail?.destination}
                    </a>
                </div>
                <div>
                    <h1 className="font-bold text-4xl break-words mt-3">
                        {pinDetail.title}
                    </h1>
                    <p className="mt-3">{pinDetail.description}</p>
                </div>
                <Link to={`/user-profile/${pinDetail?.postedBy._id}`}className='flex gap-2 mt-5 items-center bg-white rounded-lg'>
                    <img src={pinDetail?.postedBy?.image} alt="user-profile" className='w-8 h-8 object-cover rounded-full' />       
                    <p className='font-bold captialize'>{pinDetail?.postedBy.username}</p>
                </Link>
                <h2 className="mt-5 text-2xl">Comments</h2>
                <div className="max-h-370 overflow-y-auto">
                    {pinDetail?.comment?.map((item)=>(
                        <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
                            <img
                                src={item.postedBy?.image}
                                className="w-10 h-10 rounded-full cursor-pointer"
                                alt="user-profile"
                            />
                            <div className="flex flex-col">
                                <p className="font-bold">{item.postedBy?.username}</p>
                                <p>{item.comment}</p>
                            </div>
                        </div>
                    ))}
            </div>
                <div className=" flex flex-wrap mt-6 gap-3">
                    <Link to={`/user-profile/${User?._id}`}>
                        <img src={User?.image} alt="user-profile" className='w-10 h-10 rounded-full cursor-pointer' />       
                    </Link>
                    <input 
                        type="text"
                        className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-500" 
                        placeholder="Write your Views Here"
                        value={comment}
                        onChange={(e)=>setComments(e.target.value)}
                    />
                    <button
                        type="button"
                        className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base ouline-none"
                        onClick={addComment}
                    >
                    {addingCommnet ? <BsFillSendCheckFill/>:<IoIosSend/>}
                    </button>
                </div>
            </div>
                    
        </div>

    );
}
 
export default PinDetails;