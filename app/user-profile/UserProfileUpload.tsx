'use client'
import { updateUserProfile } from '@/actions/user.action';
import { Button } from '@/components/ui/button';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function UserProfileUpload() {
    const [backgroundImage, setBackgoundImage] = useState<string>("");
    const [isPending, setIsPending] = useState(false);
   
    const createPost = async () => {
    //     try {
    //         setIsPending(true);
    //       await toast.promise(
    //         updateUserProfile( {backgroundImage} ),
    //         {
    //           loading: 'Saving...',
    //           success: <b>Post saved!</b>,
    //           error: <b>Could not save the post.</b>,
    //         }
    //       );
          
    //     //   setText("");
		// // 	setMediaType("video");
		// // 	setIsPublic(false);
		// 	setBackgoundImage("");
    //         setIsPending(false);
 
    //     } catch (error) { 
    //       console.error("An error occurred while creating the post:", error);
    //     }
      };

  return (
    <div>
        <form 
            onSubmit={(e) => {
                e.preventDefault();
                createPost();
            }}>

       <CldUploadWidget
            signatureEndpoint={"/api/sign-cloudinary-params"}
            onSuccess={(result, { widget }) => {
                setBackgoundImage((result.info as CloudinaryUploadWidgetInfo).secure_url);
                widget.close();
            }}
            >
            {({ open }) => {
                return (
                    <Button className=' inshadow ' onClick={() => open()}  type='button'>
                        Upload Media
                    </Button>
                );
            }}
        </CldUploadWidget>

        <Button className='w-full bg-transparen inshadow bg-[#3b83f63d] ' type='submit' disabled={isPending}>
            {isPending ? "Creating Post..." : "Create Post"}
        </Button>

    </form>
    </div>
  )
}

export default UserProfileUpload