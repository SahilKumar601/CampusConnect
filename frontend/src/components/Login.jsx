import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google'
import {useNavigate} from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import video from '../assets/share.mp4'
import Logo from '../assets/logowhite.png'
import { jwtDecode } from "jwt-decode";


const Login = () => {
    const createUser=(cred)=>{
        const {name,email,picture,sub}=jwtDecode(cred.credential);
        console.log(name,email,picture,sub);
        localStorage.setItem('user',JSON.stringify(sub,name,picture));
        const doc={
            _id:sub,
            _type:'user',
            username:name,
            image:picture,
        }
    }
    return ( 
    <GoogleOAuthProvider clientId='895463030246-19itrtjqpp2js9fj1s1hg5gmmfv1ec49.apps.googleusercontent.com'>
    <div className="flex justify-start place-items-center flex-col h-screen">
        <div className="relative h-full w-full">
            <video 
                src={video} 
                type="video/mp4"
                autoPlay
                loop
                muted
                controls={false}
                className="w-full h-full object-cover"
            />
        </div>
        <div className='absolute top-0 bottom-0 left-0 right-0 flex flex-col justify-center place-items-center bg-blackOverlay'>
            <div className="p-s">
                <img src={Logo} width='240px' alt="" />
            </div>
            <div className=' mt-5 shadow-2xl'>
                <GoogleLogin 
                    onSuccess={(CredentialResponse)=>createUser(CredentialResponse)}
                    onError={(error)=>{console.log(error.message)}}
                />
            </div>
        </div>
    </div>
    </GoogleOAuthProvider>
    );
}
 
export default Login;