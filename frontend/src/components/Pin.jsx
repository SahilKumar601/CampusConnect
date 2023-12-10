import {v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline} from 'react-icons/md';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { AiTwotoneDelete } from 'react-icons/ai';
import { client,urlFor } from "../client";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { fetchUser } from '../Utils/fetchUser';
import { Link } from 'react-router-dom';

const Pin = ({pin:{postedBy,image,_id,destination,save}}) => {
    const [HoverStatus, setHoverStatus] = useState(false);
    const navigate= useNavigate();
    const userInfo = fetchUser();
    const aldreadySaved = !!(save?.filter((post)=>post.postedBy?._id===userInfo))?.length;
    const savePin=(id)=>{
        if(!aldreadySaved){
            client
                .patch(id)
                .setIfMissing({save:[]})
                .insert('after','save[-1]',[{
                    _key:uuidv4(),
                    userId:userInfo,
                    postedBy:{
                        _type:'postedBy',
                        _ref:userInfo
                    }
                }])
                .commit()
                .then(()=>{
                    window.location.reload();
                })
        }
    }
    const deletePin=(id)=>{
        client
            .delete(id)
            .then(()=>{
                window.location.reload();
            })
    }
    return (  
        <div className='m-2'>
            <div
                onMouseEnter={()=> setHoverStatus(true)}
                onMouseLeave={()=> setHoverStatus(false)}
                onClick={()=> navigate(`/post-detail/${_id}`)}
                className='relative cursor-pointer w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all  duration-500 ease-in-out'
            >
                <img className="rounded-lg w-full" alt='feed-images' src={urlFor(image).width(250).url()} />
                {HoverStatus && (
                    <div 
                        className='absolute  top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
                        style={{height: '100%'}}
                    >
                        <div className='flex items-center justify-between '>
                            <div className='flex gap-2'>
                                <a 
                                    href={`${image?.asset?.url}?dl=`}
                                    download
                                    onClick={(e)=>e.stopPropagation()}
                                    className='bg-white w-9 h-9 p-1 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                                >
                                    <MdDownloadForOffline/>
                                </a>
                            </div>
                            {aldreadySaved ? (
                                <button type='button' className='bg-red-500 opacity-75 hover:opacity-100 text-white rounded-3xl text-base px-5 py-1 font-bold hover:shadow-md outline-none'>
                                    {save?.length} Saved
                                </button>
                            ):(
                                <button 
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        savePin(_id);
                                    }} 
                                    type='button' 
                                    className='bg-red-500 opacity-75 hover:opacity-100 text-white rounded-3xl text-base px-5 py-1 font-bold hover:shadow-md outline-none'
                                >
                                    Save
                                </button>
                            )}
                        </div>
                        <div className='flex justify-between items-center gap-2 w-full'>
                            {destination && (
                                <a 
                                    href={destination}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='bg-white flex items-center gap-2  p-2 pl-4 pr-4 text-black font-bold rounded-full opacity-70 hover:opacity-100 hover:shadow--md'
                                >
                                    <BsFillArrowUpRightCircleFill />
                                    {destination.length > 20 ? destination.slice(8,20):destination.slice(8)}
                                </a>
                            )} 
                            {postedBy._id===userInfo && (
                                <button
                                    type='button'
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        deletePin(_id);
                                    }}
                                    className='bg-white p-2 opacity-75 hover:opacity-100 text-dark rounded-3xl text-base  font-bold hover:shadow-md outline-none'
                                >
                                    <AiTwotoneDelete/>
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Link to={`user-profile/${userInfo}`}className='flex gap-2 mt-2 items-center'>
                <img src={postedBy?.image} alt="user-profile" className='w-8 h-8 object-cover rounded-full' />       
                <p className='font-bold captialize'>{postedBy.username}</p>
            </Link>
        </div>
    );
}
 
export default Pin;