import { useState } from "react";
import { Routes,Route } from "react-router-dom";
import {Navbar,Feed,PinDetails,Search,CreatePin} from '../components' 
const Pin = ({User}) => {
    const [searchterm, setsearchterm] = useState('')
    return ( 
        <div className="px-2 md:px-5">
            <div className="bg-gray-50">
                <Navbar User={User} searchterm={searchterm}  setsearchterm={setsearchterm}/>
            </div>
            <div className="h-full">
                <Routes>
                    <Route path='/' element={<Feed/>}/>
                    <Route path='/category/:categoryId' element={<Feed/>}/>
                    <Route path='/pin-details/:pinID' element={<PinDetails User={User}/>}/>
                    <Route path='/create-pin' element={<CreatePin User={User}/>}/>
                    <Route path='/search' element={<Search searchterm={searchterm} setsearchterm={setsearchterm}/>}/>

                </Routes>
            </div>
        </div>
    );
}
 
export default Pin;