import { NavLink,Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import {IoIosArrowForward } from 'react-icons/io';
import logo from '../assets/logo.png'
import { categories } from "../Utils/data";

const SideBar = ({User,closeToggle}) => {
    const isNotActiveStyle = 'flex items-center px-3 gap-3 text-gray-500 hover:text-black transition-all duration-5 ease-in-out capitalize'
    const isActiveStyle = 'flex items-center px-3 gap-3 font-extrabold border-r-2 border-black transition-all duration-5 ease-in-out capitalize'
    const handleClick=()=>{
        if(closeToggle) closeToggle(false);
    }
    return (  
        <div className="flex flex-col h-screen justify-between bg-white overflow-y-scroll min-w-200 hide-scrollbar">
            <div className="flex flex-col">
                <Link 
                    to='/'
                    className="flex px-5 my-5 gap-2 pt-1 w-190 item-center"
                    onClick={handleClick}
                >
                    <img src={logo} alt="Logo" />
                </Link>
                <div className="flex flex-col gap-5">
                    <NavLink
                        to='/'
                        className={({isActive})=> isActive ? isActiveStyle : isNotActiveStyle}
                        onClick={handleClick}
                    >
                        <RiHomeFill/>
                        Home
                    </NavLink>
                    <h3 className="mt-3 px-5 text-base 2xl:text-xl">Discover Categories</h3>
                    {categories.slice(0, categories.length-1).map((category)=>(
                        <NavLink 
                            to={`/category/${category.name}`}
                            className={({isActive})=> isActive ? isActiveStyle : isNotActiveStyle}
                            onClick={handleClick}
                            key={category.name}
                        >
                          <img src={category.image} alt="category image" className="w-8 h-8 rounded-full shadow-sm" />
                          {category.name}                             
                        </NavLink>
                    ))}                
                </div>
            </div>
            {User && (
                <Link 
                    to={`/user-profile/${User._id}`}
                    className="flex my-3 mb-3 p-2 gap-2 items-center bg-white rounded-lg shadow-lg"
                    onClick={handleClick}
                >
                    <img src={User.image} alt="UserProfile" className="h-10 w-10 rounded-full" />
                    <p>{User.username}</p>
                </Link>
            )}
        </div>
    );
}
 
export default SideBar;