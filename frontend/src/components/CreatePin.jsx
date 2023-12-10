import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { client } from "../client";
import { categories } from "../Utils/data";
import { useNavigate } from "react-router-dom";
import TriangularSpinner from "./TriangularSpinner";
const CreatePin = ({User}) => {
    const [title, setTitle] = useState('')
    const [about, setAbout] = useState('')
    const [destination, setDestination] = useState('');
    const [loading, setLoading] = useState(false)
    const [fields, setFields] = useState(null)
    const [category, setCategory] = useState(null)
    const [imageAssets, setImageAssets] = useState()
    const [wrongImageType, setWrongImageType] = useState(false)
    const navigate = useNavigate();
    const uploadImage=(e)=>{
        const {type,name} = e.target.files[0];
        console.log(type,name);
        if(type === 'image/png' || type === 'image/jpg' || type === 'image/gif' || type === 'image/svg' || type === 'image/tiff'|| type === 'image/jpeg'){
            setWrongImageType(false);
            setLoading(true);
            client.assets
                .upload('image',e.target.files[0],{contentType:type,filename:name})
                .then((doc)=>{
                    setImageAssets(doc);
                    setLoading(false);
                })
                .catch((err)=>{
                    console.log('Image upload Error : '+ err.message);
                })
        }else{
            setWrongImageType(true);
        }
    }
    const savePin=()=>{
        if(title && about && destination && imageAssets?._id){
            const doc={
                _type:'pin',
                title,
                description:about,
                destination,
                image:{
                    _type:'image',
                    asset:{
                        _type:'reference',
                        _ref:imageAssets?._id,
                    }
                },
                userId:User._id,
                postedBy:{
                    _type:'postedBy',
                    _ref:User._id,
                },
                category,
            }
            client.create(doc)
                .then(()=>{
                    navigate('/');
                })
        }else{
            setFields(true);
            setTimeout(()=>setFields(false),2000);
        }
    }
    return (  
        <div className=" flex flex-col justify-center items-center mt-5 lg:h-4/5">
            {fields && (
                <p className="bg-red-500 mb-5 p-3 rounded-lg text-white text-xl transition-all duration-150 ease-in"> 🚩 Please Fill In All the Details‼ </p>
            )}
            <div className="bg-white flex md:flex-row flex-col justify-center items-center md:p-2 p-3 lg:w-4/5 w-full">
                <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
                    <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
                        {loading && <TriangularSpinner/>}
                        {wrongImageType && <p className="font-bold">Wrong Image Type Please Try again</p>}
                        {!imageAssets ? (
                            <>
                            <label htmlFor="file" className="cursor-pointer">
                                <div className='flex flex-col items-center justify-center '>
                                    <div className="flex flex-col justify-center items-center">
                                        <p className="font-bold text-2xl">
                                            <AiOutlineCloudUpload/>
                                        </p>
                                        <p className="text-lg">Click to Upload</p>
                                    </div>
                                    <p className="mt-32 text-gray-500">Recommendation: Use high-quality JPG, SVG, PNG, GIF, or TIFF less than 20MB!</p>
                                </div>
                            </label>
                            <input
                             type="file"
                             id="file"
                             name="file"
                             onChange={uploadImage}
                             className="w-0 h-0"
                            />
                            </>
                        ): (
                            <div className="relative h-full">
                                <img src={imageAssets?.url} className="w-600 h-300" alt="uploaded-pic" />
                                <button
                                    type="button"
                                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                                    onClick={()=>setImageAssets(null)}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full ">
                    <input
                        type="text"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        placeholder="Add your Title..."
                        className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
                    />
                    {User && (
                        <div className="flex gap-2 my-2 items-center bg-white rounded-lg">
                            <img src={User?.image} alt="user-Image" className="w-10 h-10 rouned-full" />
                            <p className="font-bold">{User.username}</p>
                        </div>
                    )}
                     <input
                        type="text"
                        value={about}
                        onChange={(e)=>setAbout(e.target.value)}
                        placeholder="What's this post about 🧐"
                        className="outline-none text-base sm:text-2xl mt-3 border-b-2 border-gray-200 p-2"
                    />
                     <input
                        type="text"
                        value={destination}
                        onChange={(e)=>setDestination(e.target.value)}
                        placeholder="Drop a Destination link"
                        className="outline-none text-base sm:text-2xl mt-3 border-b-2 border-gray-200 p-2"
                    />
                    <div className="flex flex-col">
                        <div>
                            <p className="mb-2 font-semibold test-lg md:text-xl">Choose Pin Category</p>
                            <select name="" id="" onChange={(e)=>setCategory(e.target.value)} className="outline-none w-4/5 text-base border-b-2 border-gray-300">
                                <option value="others" className="sm:text-bg bg-white">Select Category</option>
                                {categories.map((item) => (
                                    <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}>
                                    {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end items-end mt-5">
                            <button
                                type="button"
                                onClick={savePin}
                                className="bg-red-500 flex flex-row items-center text-white font-bold p-3 px-4 rounded-full w-30 outline-none "
                            >
                                <p>Upload the Post</p> <AiOutlineCloudUpload className="ml-2 w-10 h-10"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CreatePin;