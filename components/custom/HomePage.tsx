'use client'
import React from 'react'
import PostCard from './PostCard'
import Posts from './Posts'
import { useRouter } from 'next/navigation'

function HomePage() {
    const router = useRouter()
  return (
    <div className=' w-full border-r-[1.5px] border-[#ffffff27] '>
        <h1 className=' p-4'>Home</h1>

        <div onClick={()=> router.push('/new-post')} className='h-32 border-y-[1.5px] text-zinc-500 p-3 '>
            <p>Compose new post...</p>
        </div>

        {/* <Posts/> */}
    </div>
  )
}

export default HomePage