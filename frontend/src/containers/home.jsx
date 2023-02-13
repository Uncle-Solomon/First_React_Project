import React, {useState, useRef, useEffect} from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link, Route, Routes} from'react-router-dom'

import { SideBar, UserProfile } from '../components'

const Home = () => {
  return (
    <div>
        <h1>Hello World, It's me</h1>
    </div>
  )
}

export default Home