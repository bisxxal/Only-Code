'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";

function PostCard({ post, isSubscribed, admin }: any) {
  const [like , setLike] = useState(false)
  return (
    <div className=' w-full border-b-[1.5px] border-[#ffffff27]  py-3 mt-2'>
        <div className=' px-4 '>

            <div className=' flex justify-between'>
                <div className=' flex gap-2 items-center justify-center'>
                <Image src={'/avatar.jpg'} alt='post' width={550} height={525} className=' h-14 w-14 rounded-full' />
                <h1>isa Buscemi</h1>  
                </div>

                <h1>Aug 23</h1>
          </div>

            <p className=' mt-5'> {post[0]?.text} </p>
            <p className=' mt-5'>Haiii ♥️ Glad you're here! Now come check out the good stuff!! 😘🍑 <br />
            https://onlyfans.com/buscemi/c1 </p>
        </div>


        {
            (post[1].isPublic ||  isSubscribed=== true )&& post[1].mediaUrl && post[1].mediaType === 'image' && (
                <div className=' w-full mt-2'>
                    <Image src={'/header.jpg'} alt='post' width={950} height={925} className=' h-96 w-full object-cover' />
                </div>
            )
        }
        {/* {
            (post[0].isPublic ||  isSubscribed )&& post[0].mediaUrl && post[0].mediaType === 'video' && (
               
            )
        } */}

        {
            !isSubscribed && !post[1].isPublic && (
                <div className=' w-full mt-2 bg-[#1a1b26] inshadow h-96'>
                    
                    <div className=' flex items-end pb-10 justify-center px-6 relative h-full'>

                    <IoMdLock  className=' text-7xl text-[#2f323b] absolute top-1/3'/>
                         
                         <div className=' p-4 w-full inshadow border-[1px] rounded-lg border-[#ffffff3f] '>
                        <div className='  bg-blue-400 cursor-pointer hover:bg-[#0091ea]  transition-all justify-center text-medium items-center mt-3 rounded-full  text-blue-500 flex py-2'> 
                        <h1 className=' text-white'>SUBSCRIBE TO SEE USER'S POST</h1>
                         </div>
                        </div>
                    </div>
                </div>
             )
        }

        <div color="white" className='text-white px-4  '>
            <div className=' flex gap-5 items-center my-2 text-2xl '>
        <SlLike onClick={()=>setLike(!like)} className={`${like?' text-red-600 ' : ' text-white '} text-2xl `} />
        <FaRegComment />
            </div>
            
        456 like
        </div>
    </div>
  )
}

export default PostCard