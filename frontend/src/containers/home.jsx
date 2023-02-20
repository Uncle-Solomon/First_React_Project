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
  const [toggleSideBar, setToggleSideBar] = useState(false)
  const scrollRef = useRef(null)

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

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, [])
  

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
        <div className="hidden md:flex h-screen flex-initial">
          <SideBar user = {user && user} />
        </div>
        <div className="flex md:hidden flex-row">
          <div className="p2 w-full flex flex-row justify-between items-center shadow-md">
            <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSideBar(true)}></HiMenu>
            <Link to='/'>
            <img src={logo} alt="" className='w-28' />
            </Link>
            <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="" className='w-28' />
            </Link>
          </div>
          {toggleSideBar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={() => setToggleSideBar(false)} />
            </div>
            <SideBar user = {user && user} closeToggle={setToggleSideBar}/>
          </div>
          )}
        </div>
        
        <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
          <Routes>
            <Route path='/user-profile/:jti' element={<UserProfile />}></Route>
            <Route path='/*' element={<Pins user={user && user} />}></Route>

          </Routes>
        </div>
    </div>
  )
}

export default Home 