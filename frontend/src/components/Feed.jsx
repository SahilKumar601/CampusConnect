import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import MasonryLayout from './MasonryLayout.jsx';
import Spinner from './Spinner.jsx';
import { client } from "../client";
import { searchQuery } from "../Utils/data.js";
const Feed = () => {
    const [loading, setloading] = useState(false)
    const [pins, setpins] = useState(null)
    const {categoryId}=useParams();
    if(loading) return <Spinner message="We Loading New Ideas into your Feed!"/>
    useEffect(() => {
        setloading(true);
        if(categoryId){
            const query= searchQuery(categoryId);
            client.fetch(query)
                .then((data)=>{
                    setpins(data);
                    setloading(false);
                })
        }else{
            
        }
    }, [categoryId])
    
    return ( 
        <div>
            {pins && <MasonryLayout/>}
        </div>
    );
}
 
export default Feed;