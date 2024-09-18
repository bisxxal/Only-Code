'use client'
import { updateUserProfile } from '@/actions/user.action';
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { VisitPageFrontProps } from './VisitPageFront';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { Button } from '../ui/button';
import { CiCamera } from "react-icons/ci";

function UpdateUserPage({alluser}:VisitPageFrontProps) {

    const [backgroundImage, setBackgoundImage] = useState<string>(alluser?.backgoundImage ?? "");
    const [image, setImage] = useState<string>(alluser?.image ?? "");
    const [isPending, setIsPending] = useState(false);

    const onSumbit = async( formData:FormData) => {
       const name = formData.get('name') as string
         const description = formData.get('description') as string
          const subscriptionPrice = parseInt(formData.get('subscription') as string) || 0;
         try {
            setIsPending(true);
          await toast.promise(
            updateUserProfile( {backgroundImage , name ,description ,image , subscriptionPrice}  ),
            {
              loading: 'Saving...',
              success: <b>Post saved!</b>,
              error: <b>Could not save the post.</b>,
            }
          );
           
            setIsPending(false);
    }
    catch (error) { 
      console.error("An error occurred while creating the post:", error);
    }
}
  return (
    <form action={onSumbit} className=' relative flex flex-col gap-4'>
      <div className=" w-full relative h-[260px] bg-rede-500">

      <div className=' absolute w-full'>
        <CldUploadWidget
                signatureEndpoint={"/api/sign-cloudinary-params"}
                onSuccess={(result, { widget }) => {
                    setBackgoundImage((result.info as CloudinaryUploadWidgetInfo).secure_url);
                    widget.close();
                }}
            >
                {({ open }) => {
                    return (
                        <button className=' p-3 text-4xl absolute top-32 left-1/2 rounded-full  backdrop-blur-[10px]  bg-transparent ' onClick={() => open()}  type='button'>
                        <CiCamera />
                        </button>
                    );
                }}
        </CldUploadWidget>
    </div> 


    { alluser?.backgoundImage && alluser?.backgoundImage ? <Image src={backgroundImage} width={1000} height={1000} className=' h-full w-full  object-cover 'alt='' /> : null }
      </div>
      <div className='w-24 h-24 border-[3px] border-[#16161e] rounded-full  absolute top-[160px] left-10 '>
       { alluser?.image && <Image src={ image ?? alluser?.image} width={700} height={700} className=' rounded-full  w-full h-full object-cover 'alt='' />  }
       

    <div className=' absolute '>
    <CldUploadWidget
            signatureEndpoint={"/api/sign-cloudinary-params"}
            onSuccess={(result, { widget }) => {
                setImage((result.info as CloudinaryUploadWidgetInfo).secure_url);
                widget.close();
            }}
        >
            {({ open }) => {
                return (
                    <button className=' p-3 text-2xl absolute -top-16 left-6 rounded-full  backdrop-blur-[2px]  bg-transparent ' onClick={() => open()}  type='button'>
                      <CiCamera />
                    </button>
                );
            }}
        </CldUploadWidget>
    </div> 
       </div>

       <div className=' px-10 mt-6 flex flex-col gap-3'>
            <label htmlFor="name">Name</label>
            <input className=' rounded-xl bg-transparent inshadow py-2 px-3 placeholder:text-zinc-500' defaultValue={alluser?.name ?? ""} type="text" placeholder='name' name="name"   />

            <label htmlFor="description">Description</label>
            <input className=' rounded-xl bg-transparent inshadow py-2 px-3 placeholder:text-zinc-500' defaultValue={alluser?.description ?? ""}  type="text" placeholder='bio' name="description"  />
          
            <label htmlFor="subscription">subscription</label>
            <input className=' rounded-xl bg-transparent inshadow py-2 px-3 placeholder:text-zinc-500' defaultValue={alluser?.subscriptionPrice ?? ""} type='number' placeholder='Add subscription Price' name="subscription"  />
            
            <label >Email</label>
            <h1 className=' cursor-not-allowed rounded-xl bg-transparent inshadow py-2 px-3 placeholder:text-zinc-500'>{alluser?.email}</h1>
       </div> 

       <Button className=' mx-auto px-4 w-fit inshadow bg-[#3b83f63d] ' type='submit' disabled={isPending}>
            {isPending ? "Updateing Profile..." : "Update Profile"}
        </Button>
    </form>
  )
}

export default UpdateUserPage