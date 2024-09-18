'use client'
import Image from 'next/image'
import React from 'react'
import { CiImageOn } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";
import { FcLike } from "react-icons/fc"; 

export interface VisitPageFrontProps {
  alluser: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    isSubcribed: boolean | null;
    customerId: string | null;
    backgoundImage: string | null;
    createdAt: Date;
    description: string | null;
    updatedAt: Date;
    subscriptionPrice : number | null;
} | null | undefined

count?: any
}
 export function formatNumber(num: number) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    }
    return num.toString();
  }
 function VisitPageFront({alluser , count}: VisitPageFrontProps) {
 
  return (
    <div className=' w-full border-r-[1.5px] border-[#ffffff27]  b'>

      {/* coverImage */}
      <div className='relative w-full border-b-[10px] pb-5 border-[#242529] '>
        <div className=' h-[220px] relative inshadow frame '>
          <div className=' backdrop-blur-[6px] px-5 py-1.5 text-black font-medium rounded-full absolute top-2 left-2 flex gap-3'> 
          <CiImageOn size={25}/>{count.imageCount} 
          <CiVideoOn size={25}/>{count?.videoCount}
          <FcLike size={25}/>{formatNumber(count?.totalLikes)}
             </div>
          {
          alluser?.backgoundImage && alluser?.backgoundImage ? <Image src={alluser?.backgoundImage} width={1000} height={1000} className=' h-full w-full  object-cover 'alt='' /> : null
          }
           </div>
        <div className='w-24 h-24 border-[3px] border-[#16161e] rounded-full overflow-hidden absolute top-[160px] left-10 '>
           { alluser?.image && <Image src={alluser?.image} width={700} height={700} className='  w-full h-full object-cover 'alt='' />  }

           </div>
        <div className='px-4 mt-10'>
          <h1 className='text-white text-xl font-semibold'>{alluser?.name}</h1>
          <p className='text-white mt-4 text-sm'>{alluser?.description} </p>
        </div>
      </div>

      {/* subscription */}

      <div className=' px-7 py-4 border-b-[10px] pb-5  border-[#242529]'>
        <h1>SUBSCRIPTION</h1>

      </div>


     
    </div>
  )
}

export default VisitPageFront