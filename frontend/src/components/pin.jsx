import React from 'react'
import { urlFor } from '../sanity'

const Pin = ({pin : {posteedBy, image, _id, destination}}) => {
  return (
    <div><img src={urlFor(image).width(250).url()} className='rounded-lg w-full' alt="" /></div>
  )
}

export default Pin