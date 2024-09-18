'use client'
import React, { useState } from 'react'
import { getPreviousDayFormatted, PostProps } from './Posts'
import { CldVideoPlayer } from 'next-cloudinary'
import Image from 'next/image'
import 'next-cloudinary/dist/cld-video-player.css';
import { formatNumber } from './VisitPageFront'
import { FcLike } from "react-icons/fc";
function MediaShown({posts , user ,adminuser  }: PostProps) {
    const [showDisplay, setShowDisplay] = useState<boolean>(false) 
    const [data , setData] = useState<any>([
        {imageurl: '', isMedia: '' , like:0 , date:''}
    ])

    const handleShow = (url: string, mediaType: string , like:number , date:Date ) => {
        setData({imageurl:url, isMedia:mediaType ,like:like , date:date})
        setShowDisplay(true)
    } 
    
  return (
    <div className=' relative w-full mt-3 '>
        <div className={` ${showDisplay   ? ' fixed flex flex-col justify-evenly items-center  ':' hidden '} backdrop-blur top-0 left-0 z-20 w-full overflow-hidden h-screen bg-[#000000aa]`}>
            <h1 className=' absolute top-7 right-10 cursor-pointer text-2xl hover:bg-[#d1111138] bg-[#ffffff25] p-4 py-2 rounded-full ' onClick={()=>setShowDisplay(false)} > X </h1>
            <div className='w-[80%] overflow-hidden mx-auto h-[80%]'>
                {data ?.imageurl && data?.isMedia === 'image'  && (
                  <Image  src={data?.imageurl} alt='post' width={950} height={925} className=' w-full h-full object-cover  rounded-xl' />
                )
                }
                {
                data?.imageurl && data?.isMedia === 'video' && (
                <CldVideoPlayer width='960' height={940} className=' w-full h-full object-cover rounded-xl' src={data?.imageurl} />
                )
                }
            </div>

            <div className=' absolute bottom-10 flex items-center gap-1 left-12'>
                        {data?.like === 0 ? '0' : (data?.like)}  Likes
              </div>
            <div className=' absolute top-10 flex items-center gap-1 left-12'>
                        { getPreviousDayFormatted(data?.date) } 
              </div>
        </div>


        <div className='flex flex-wrap w-full '>
            {
               posts&& posts?.map((post:any) => (
                    <div key={post?.id} className=' relative border-[1.4px] border-zinc-950 overflow-hidden  w-[33%] h-[230px] '>

                        <div className=' absolute text-sm bottom-3 flex items-center gap-1 left-2'>
                        {post?.likes === 0 ? '0' : formatNumber(post?.likes)}   <FcLike   className='text-xl'/>
            
                        </div>
{
              adminuser &&  adminuser?.id === user?.id ? (
                <>
                    {
                       post?.mediaUrl && post?.mediaType === 'image'  && (
                            <div onClick={()=>handleShow( post?.mediaUrl , post?.mediaType , post?.likes , post?.createdAt)} className=' w-full h-full'>
                                <Image  src={post.mediaUrl} alt='post' width={950} height={925} className=' w-full h-full object-cover' />
                            </div>
                    ) }
                    {
                     post?.mediaUrl && post?.mediaType === 'video' && (
                    <div onClick={()=>handleShow( post?.mediaUrl , post?.mediaType , post?.likes , post?.createdAt)} className='w-full h-full '>
                        <CldVideoPlayer width='960' height={940} className='rounded-md w-full h-full object-cover' src={post?.mediaUrl} />
                    </div>
                    ) }
                </>
                )
             :(
            <>
             {
               ( post?.isPublic ||   user?.isSubscription?.some((i: any) => i?.buyerId === adminuser?.id ) && post?.mediaUrl && post?.mediaType === 'image' ) && (
                <div onClick={()=>handleShow( post?.mediaUrl , post?.mediaType , post?.likes , post?.createdAt)} className=' w-full h-full'>
                <Image  src={post?.mediaUrl} alt='post' width={950} height={925} className=' w-full h-full object-cover' />
                </div>
            ) 
            } 
            {
               (post?.isPublic ||   user?.isSubscription?.some((i: any) => i?.buyerId === adminuser?.id) )&& post?.mediaUrl && post?.mediaType === 'video' && (
                <div onClick={()=>handleShow( post?.mediaUrl , post?.mediaType , post?.likes , post?.createdAt)} className='w-full h-full '>
                <CldVideoPlayer width='960' height={940} className='rounded-md w-full h-full object-cover' src={post?.mediaUrl} />
            </div>
            )
            } 
              </>
            ) }
              </div>
        ))
            }
        </div>

        {
        posts?.length === 0   &&
        (
        <div className='text-white px-20 max-lg:px-1 h-[350px] text-center flex flex-col justify-center'>
        <Image src={'/nopost.png'} className=' w-[50%] max-md:h-[35%] max-md:w-full mx-auto h-[50%]' height={900} width={900} alt='' />
            <h1 className='font-semibold text-zinc-700'>  No Posts Yet</h1>
        </div>)          
        }
    </div>
  )
}

export default MediaShown