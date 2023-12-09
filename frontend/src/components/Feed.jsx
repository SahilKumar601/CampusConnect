import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import MasonryLayout from './MasonryLayout.jsx';
import Spinner from './Spinner.jsx';
import { client } from "../client";
import { feedQuery, searchQuery } from "../Utils/data.js";
const Feed = () => {
    const [loading, setloading] = useState(false);
    const [pins, setpins] = useState(null);
    const {categoryId}=useParams();
    useEffect(() => {
        if(categoryId){
            setloading(true);
            const query= searchQuery(categoryId);
            client.fetch(query)
                .then((data)=>{
                    setpins(data);
                    setloading(false);
                })
        }else{
            setloading(true);
            client.fetch(feedQuery)
                .then((data)=>{
                    setpins(data);
                    setloading(false);
                })
            
        }
    }, [categoryId])
    if(loading) return <Spinner message="We Loading New Ideas into your Feed!"/>
    return ( 
        <div>
            {pins && <MasonryLayout pins={pins}/>}
        </div>
    );
}
 
export default Feed;