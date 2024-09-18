'use client'
import React, { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CiWarning } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';
import 'next-cloudinary/dist/cld-video-player.css';
import { CldUploadWidget, CldVideoPlayer, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { createPostAction } from '@/actions/post.actions';
import toast from 'react-hot-toast'; 
 function ContentTab() {
    const [text, setText] = useState("");
	const [mediaType, setMediaType] = useState<"video" | "image">("video");
	const [isPublic, setIsPublic] = useState<boolean>(false);
	const [mediaUrl, setMediaUrl] = useState<string>("");
   const [isPending, setIsPending] = useState(false);
   
   const createPost = async () => {
        try {
            setIsPending(true);
          await toast.promise(
            createPostAction({ text, isPublic, mediaUrl, mediaType }),
            {
              loading: 'Saving...',
              success: <b>Post saved!</b>,
              error: <b>Could not save the post.</b>,
            }
          );
          
          setText("");
			setMediaType("video");
			setIsPublic(false);
			setMediaUrl("");
            setIsPending(false);
 
        } catch (error) { 
          console.error("An error occurred while creating the post:", error);
        }
      };
      
  return ( 
    <div className=' w-full fram border h-screen border-[#ffffff23] '>
     

    <form className=' w-full bg-red-5 '
        onSubmit={(e) => {
            e.preventDefault();
            createPost();
        }}
    >
    <Card className='w-full mx-auto fram bg-transparent text-white border-[2px border-none rounded-none border-[#ffffff23 '>
    <CardHeader>
        <CardTitle className='text-2xl text-center '>New Post</CardTitle>
        <CardDescription className=' text-center'>
            Share your exclusive content with your audience. Select only one video/image at a time.
        </CardDescription>
    </CardHeader>

    <CardContent className='grid gap-4'>
        <div className='grid gap-2'>
            <Label htmlFor='content'>Content</Label>
            <Textarea
                id='content'
                className=' inshadow h-28'
                placeholder="Share today's exclusive"
                required
                onChange={(e) => setText(e.target.value)}
            />
        </div>

        <Label>Media Type</Label>

        <RadioGroup
            defaultValue='video'
            value={mediaType}
            onValueChange={(value: "image" | "video") => setMediaType(value)}
        >
            <div className='flex text-white items-center space-x-2'>
                <RadioGroupItem className=' checked:text-white' value='video' id='video' />
                <Label htmlFor='video'>Video</Label>
            </div>
            <div className='flex items-center space-x-2'>
                <RadioGroupItem value='image' id='image' />
                <Label htmlFor='image'>Image</Label>
            </div>
        </RadioGroup>

        <CldUploadWidget
            signatureEndpoint={"/api/sign-cloudinary-params"}
            onSuccess={(result, { widget }) => {
                setMediaUrl((result.info as CloudinaryUploadWidgetInfo).secure_url);
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

   
        {mediaUrl && mediaType === "image" && (
            <div className='flex justify-center relative w-full h-96'>
                <Image fill src={mediaUrl} alt='Uploaded Image' className='object-contain rounded-md' />
            </div>
        )}

        {mediaUrl && mediaType === "video" && (
            <div className='w-full mx-auto'>
                <CldVideoPlayer width={960} height={540} className='rounded-md' src={mediaUrl} />
            </div>
        )}

        <div className='flex items-center space-x-2'>
            <Checkbox
                id='public'
                checked={isPublic}
                onCheckedChange={(e) => setIsPublic(e as boolean)}
                className=' checked:text-white '
            />

            <Label
                htmlFor='public'
                className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
                Mark as public
            </Label>
        </div>

        <Alert  className=' inshadow bg-transparent text-yellow-400'> 
           <CiWarning className=' text-2xl !text-yellow-400'/>
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>Public posts will be visible to all users.</AlertDescription>
        </Alert>
    </CardContent>

    <CardFooter>
        <Button className='w-full bg-transparen inshadow bg-[#3b83f63d] ' type='submit' disabled={isPending}>
            {isPending ? "Creating Post..." : "Create Post"}
        </Button>
 
    </CardFooter>
    </Card>
    </form>
</div> 
  )
}

export default ContentTab