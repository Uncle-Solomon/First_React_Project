import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {client} from '../sanity'
import Masonrylayout from './masonryLayout'
import Spinner from './spinner'
import { feedQuery, searchQuery } from '../utils/data';

import createClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'


const Feed = () => {

  const [loading, setLoading] = useState(false)
  const {categoryId} = useParams()
  const [pins, setPins] = useState(null)
  const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-02-10',
    token: process.env.REACT_APP_SANITY_TOKEN
  })
  const builder = imageUrlBuilder(client)

  const urlFor = (source) => builder.image(source);

  useEffect(() => {
    setLoading(true)

    if (categoryId) {
      const query = searchQuery(categoryId)

      client.fetch(query)
      .then((data)=> { 
        setPins(data);
        setLoading(false)
      })

    } else {
      client.fetch(feedQuery)
      .then((data) => {
        setPins(data)
        setLoading(false)
      })
    }
  }, [categoryId])
  

  if(loading) return <Spinner message="We are adding new ideas to your feed" />

  return (
    <div>
      {pins && <Masonrylayout pins={pins} />}
    </div>
  )
}

export default Feed