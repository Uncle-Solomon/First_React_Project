import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import { MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'

import createClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

import { urlFor } from '../sanity'
import fetchUser from '../utils/fetchUser'

import jwtDecode from 'jwt-decode'


const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-02-10',
  token: process.env.REACT_APP_SANITY_TOKEN
})

const Pin = ({pin : {postedBy, image, _id, destination, save}}) => {

  const [PostHover, setPostHover] = useState(false)
  // const [savingPost, setsavingPost] = useState(false)
  const navigate = useNavigate()
  const user = fetchUser()


  const alreadySaved = !!(save?.filter((item)=> item.postedBy._id === user.jti))?.length;
  const savePin = (id) => {
    if (!alreadySaved) {
      // setsavingPost(true)

      client
        .patch(id)
        .setIfMissing({save: []})
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user.jti,
          postedBy: {
            _type: postedBy,
            _ref: user.jti
          }

        }])
        .commit()
        .then(() => {
          window.location.reload()
          // setsavingPost(true)
        })
    }
  }

  const deletePin = (id) => {
    if (!alreadySaved) {
      // setsavingPost(tAiTwotoneDeleterue)

      client
        .delete(id)
        .commit()
        .then(() => {
          window.location.reload()
          // setsavingPost(true)
        })
    }
  }

  return (
    <div className='m-2'>
      <div
      onMouseEnter={() => setPostHover(true)}
      onMouseLeave={() => setPostHover(false)}
      onClick={() => navigate(`/pin-detail/${_id}`)}
      className="relative cursor-zoom-in w-auto hover:shadow-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
      <img src={urlFor(image).width(250).url()} className='rounded-lg w-full' alt="" />
      {PostHover && (
        <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50' style={{height: '100%'}}>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
              <a href={`${image?.asset?.url}?dl=`} download
              onClick={(e) => e.stopPropagation()}
              className = 'bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
              >
                <MdDownloadForOffline />
              </a>
            </div>
            {alreadySaved ? (
              <button type='button' className='bg-red-500 opacity-75 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none'>
                Saved {save?.length} times</button>
            ): (
              <button type='button' 
              onClick={(e) => {
                e.stopPropagation()
                savePin(_id)
              }
              }
              className='bg-red-500 opacity-75 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none'>
                Save
              </button>
            )
            }
          </div>
          <div className='flex justify-between items-center gap-2 w-full'>
            {destination && (
              <a href={destination}
              target="_blank"
              rel='noreferrer'
              className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md '
              >
                <BsFillArrowUpRightCircleFill /> 
                {destination.length > 20 ? destination.slice(8,20): destination.slice(8)}
              </a>
            )}

            {/* {postedBy?._id === user.jti && ( */}
              <button
              type='button' 
              onClick={(e) => {
                e.stopPropagation()
                deletePin(_id)
              }
              }
              className='bg-white p-2 opacity-75 hover:opacity-100 text-black font-bold text-base rounded-3xl hover:shadow-md outlined-none'
              >
                <AiTwotoneDelete />
              </button>
            {/* )} */}
          </div>
        </div>
      )}
      </div>
      <Link to={`user-profile/${user?._id}`}
      className="flex gap-2mt-2 items-center"
      >
        <img 
        className="w-8 h-8 rounded-full object-cover" 
        src={postedBy?.image} alt="" />
      </Link>
    </div>
  )
}

export default Pin