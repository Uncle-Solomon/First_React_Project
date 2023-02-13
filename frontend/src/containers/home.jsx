import React, {useState, useRef, useEffect} from 'react'
import jwtDecode from 'jwt-decode'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link, Route, Routes} from'react-router-dom'

import { SideBar, UserProfile } from '../components'

import createClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

import logo from '../assets/logo.png'
import Pins from './pins'

import {UserQuery} from '../utils/data'






const Home = () => {
  const [ToggleSideBar, setToggleSideBar] = useState(false)
  const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-02-10',
    token: process.env.REACT_APP_SANITY_TOKEN
  })
  const builder = imageUrlBuilder(client)
  
  const urlFor = (source) => builder.image(source);
   
  const [user, setUser] = useState(null)
  
  // const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')).userInfo: console.log("Something wrong")
  const userInfo = JSON.parse(localStorage.getItem('user'))
  // console.log(jwtDecode(userInfo))

  const decoded = jwtDecode(userInfo)
  
  
  useEffect(() => {
    const query = UserQuery(decoded?.jti)
  
    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
  }, [])

  console.log(user)
  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
        <div className="hidden md:flex h-screen flex-initial">
          <SideBar />
        </div>
        <div className="flex md:hidden flex-row">
          <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSideBar(false)}></HiMenu>
          <Link to='/'>
          <img src={logo} alt="" className='w-28' />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt="" className='w-28' />
          </Link>
        </div>
    </div>
  )
}

export default Home 