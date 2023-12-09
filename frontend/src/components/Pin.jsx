import {v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline} from 'react-icons/md';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { AiTwotoneDelete } from 'react-icons/ai';
import { client,urlFor } from "../client";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { fetchUser } from '../Utils/fetchUser';

const Pin = ({pin:{postedBy,image,_id,destination}}) => {
    const [HoverStatus, setHoverStatus] = useState(false);
    const [savingPost, setSavingPost] = useState(false);
    const navigate= useNavigate();
    const userInfo = fetchUser();
    return (  
        <div className='m-2'>
            <div
                onMouseEnter={()=> setHoverStatus(true)}
                onMouseLeave={()=> setHoverStatus(false)}
                onClick={()=> navigate(`/post-detail/${_id}`)}
                className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all  duration-500 ease-in-out'
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
                                    className="bg-white w-9 h-9 p-1 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                                >
                                    <MdDownloadForOffline/>
                                </a>
                            </div>
                            {aldreadySaved?.length !== 0 ? (
                                <button>
                                    Saved
                                </button>
                            ):(
                                <button>
                                    Save
                                </button>
                            )}
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
 
export default Pin;