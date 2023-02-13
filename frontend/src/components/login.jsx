import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import jwt_decode from "jwt-decode";

import createClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'


{/* <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;  */}






const Login = () => {
  const navigate = useNavigate()
  const responseGoogle = (response) => {
    console.log(response)
    localStorage.setItem('user', JSON.stringify(response.credential))

    console.log(response.credential)
    const { name, jti, picture } = jwt_decode(response.credential); // here
    console.log(jwt_decode(response.credential))

    const doc = {
        _id: jti,
        _type: 'user',
        userName: name,
        image: picture

    }

    const client = createClient({
      projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
      dataset: 'production',
      useCdn: true,
      apiVersion: '2023-02-10',
      token: process.env.REACT_APP_SANITY_TOKEN
  })
    const builder = imageUrlBuilder(client)

    const urlFor = (source) => builder.image(source);
  

    // client.create(doc).then(res => {
    //     console.log(`Bike was created, document ID is ${res._id}`)
    // })

    // client.Create();//{(doc)}
    
    client.createIfNotExists(doc)
    .then(() => {
      console.log('Document created with ID: ', jti);
      navigate('/')
    })

  }
  return (
    
    <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative w-full h-full'>
            <video 
            src={shareVideo}
            autoPlay
            loop
            type="video/mp4"
            muted
            controls={false}
            className='w-full h-full object-cover'
            />
            <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
             <div className="p-5">
                <img src={logo} alt="logo" width="130px" />
             </div>
             <div className="shadow-2xl">
             <GoogleLogin
                render={(renderProps) => (
                    <button>

                    </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy='single_host_origin'

            />
             </div>

            </div>
        </div>
    </div>
  )
}

export default Login