import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { client } from '../client';

const Login = () => {

    const responseGoogle = (response) => {
        localStorage.setItem('user', JSON.stringify(response.profileObj))
        const {name, googleId, imageUrl} = response.profileObj
        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: imageUrl,
        };
        client.createIfNotExists(doc).then(() => {
            navigate('/', { replace: true });
        });

    }

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video 
                  src={shareVideo}
                  type="video/mp4"
                  loop
                  controls={false}
                  muted
                  autoPlay
                  className="w-full h-full object-cover"
                ></video>
                <div className="absolute flex flex-col items-center justify-center top-0 left-0 bottom-0 right-0 bg-black-overlay">
                    <div className="p-5">
                        <img src={logo} alt="logo" width="130px" />
                    </div>
                    <div className="shadow-2xl">
                        <p className="text-lg font-light text-white">Sign in to your account</p>
                        <div className="flex flex-col items-center justify-center mt-5">
                            <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                render={(renderProps) => (
                                    <button
                                        className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                                        type="button"
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                    >
                                        <FcGoogle className="w-5 mr-4" />
                                        Login with Google
                                    </button>
                                )}
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;