import {Link,useNavigate} from 'react-router-dom';
import { IoMdAdd,IoMdSearch } from 'react-icons/io';
const Navbar = ({searchterm ,setsearchterm,User}) => {
    const navigate = useNavigate();
    return ( 
        <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
            <div className='flex justify-start items-center w-full px-2 rounded-md bg-white broder-none outline-none focus-within:shadow-sm'>
                <IoMdSearch fontSize={21} className='ml-1'/>
                <input
                    type='text'
                    onChange={(e)=>{setsearchterm(e.target.value)}}
                    placeholder='Search'
                    value={searchterm}
                    onFocus={()=>navigate('/search')}
                    className='p-2 w-full bg-white outline-none'
                />
            </div>
            <div className=' flex gap-2'>
                <Link to={`/create-pin`} className='bg-black text-white rounded-lg mr-2 w-10 h-10 md:w-12 md:h-12 flex justify-center items-center'>
                    <IoMdAdd />
                </Link>
                <Link to={`user-profile/${User?._id}`}>
                <img src={User?.image} alt="user" className='w-12 h-12 rounded-lg'/>
                </Link>
            </div>
        </div>
    );
}
 
export default Navbar;