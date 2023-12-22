import {useState,useEffect} from 'react';
import {client} from '../client';
import MasonryLayout from './MasonryLayout';
import { feedQuery,searchQuery } from '../Utils/data';
import { BallTriangleSpinner } from './BallTriangleSpinner';

const Search = ({searchterm}) => {
    const [pins,setPins] = useState();
    const [loading,setLoading] = useState(false);
    useEffect(()=>{
        if(searchterm){
            setLoading(true);
            const query = searchQuery(searchterm.toLowerCase());
            client.fetch(query)
                  .then((data)=>{
                    setPins(data)
                    setLoading(false);
                  })
        }else{
            client.fetch(feedQuery)
                  .then((data)=>{
                    setPins(data)
                    setLoading(false);
                  })
        }
    },[searchterm])

    return (  
        <div>
            {loading && <BallTriangleSpinner message={'Searching...'}/>}
            {pins?.length > 0 && <MasonryLayout pins={pins}/> }
            {pins?.length === 0 && searchterm && !loading && (
                <div className='mt-10 text-center text-xl'>
                    No Pins Found 🙁
                </div>
            )}
        </div>
    );
}
 
export default Search;