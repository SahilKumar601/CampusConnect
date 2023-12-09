import {Circles} from 'react-loader-spinner';
const Spinner = ({message}) => {
    return (  
        <div className='flex flex-col justify-center items-center h-full w-full'>
            <Circles 
                color='#00BFFF'
                height={50}
                width={500}
                className='m-5' 
            />
            <p className='text-lg text-center px-2'>{message}</p>
        </div>
    );
}
 
export default Spinner;
