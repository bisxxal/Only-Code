'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { SkeletonCard } from './Skeleton' 
import { commentOnPostAction, deletePost, likePostAction, PaticularPost } from '@/actions/post.actions';
import { SlLike } from 'react-icons/sl';
import { FaRegComment } from 'react-icons/fa';
import { IoMdLock } from 'react-icons/io';
import { formatNumber } from './VisitPageFront';
import { CldVideoPlayer } from 'next-cloudinary';
import { MdOutlineDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { FiSend } from "react-icons/fi";
import CheackOutPage from './CheackOutPage';
import 'next-cloudinary/dist/cld-video-player.css';
export interface PostProps {
	posts?: any;
	user?: {
    id: string;
    name: string | null; email: string | null; emailVerified: Date | null; image: string | null; subscriptionPrice?:number|null; isSubcribed: boolean | null; customerId: string | null; backgoundImage: string | null; description: string | null; createdAt: Date; updatedAt: Date; 
    isSubscription: any;
} | null | undefined;
         
    adminuser?: {
    id: string;
    name: string | null; email: string | null; emailVerified: Date | null; image: string | null; subscriptionPrice?:number|null; isSubcribed: boolean | null; customerId: string | null; backgoundImage: string | null; description: string | null; createdAt: Date; updatedAt: Date;
    isSubscription: any;  } | null | undefined;

    content?: string;
 }
export function getPreviousDayFormatted(dateString: string): string { 
    const date = new Date(dateString); 
    const previousDay = new Date(date);
    previousDay.setDate(date.getDate() - 1); 
    const options: Intl.DateTimeFormatOptions = { 
        month: 'short', 
        day: '2-digit'
    }; 
    const formattedDate = previousDay.toLocaleDateString('en-US', options); 
    const originalDateFormatted = date.toLocaleDateString('en-US', options); 
    const isOneDayBefore = formattedDate === originalDateFormatted; 
    return isOneDayBefore ? `${formattedDate} (1 day before)` : formattedDate;
} 
 function Posts({posts ,user ,adminuser , content }: PostProps) { 
  const router = useRouter()
  const isLoading = false
  const [isLiked , setIsLiked] = useState(false) 
  const [showCommentBox, setShowCommentBox] = useState(false);
  
  
    const delePost = async(id:string) => {
 
        await toast.promise(
        deletePost({id}),        
        {
            loading: 'Deleting post...',
            success: <b>Post Deleted!</b>,
            error: <b>Could not delete the post.</b>,
        }
        );

        router.refresh()
    }
    
      const likeThePost = async (postId: string) => {
          await likePostAction(postId); 
        router.refresh()
      };
    
 
      const addComment = async (e: React.FormEvent<HTMLFormElement>, postId: string) => {
        e.preventDefault();
        const text = (e.target as HTMLFormElement).text.value;

        // console.log(text, postId);
        try {
            await toast.promise(
                commentOnPostAction(postId ,text, ),
                {
                    loading: 'Comenting on post...',
                    success: <b>Commented!</b>,
                    error: <b>Could not comment the post.</b>,
                }
            );

         router.refresh()
        } 
        catch (error) {
            console.error('Error adding comment:', error);
            toast.error('Failed to add comment. Please try again.');
        }
      }
 
  return (
    <div className=' w-full'>  
  {/* <div className=' w-full py-5 px-2 border-b-[2px] border-white flex justify-center ' > {  posts.length  === 0 ? 'No Posts':`Posts ${posts.length  }` } </div> */}
 
{
	!isLoading && posts.length  !== 0 && posts?.map((post:any) =>  (
		<div key={post.id} className=' w-full border-b-[1.5px] border-[#ffffff27]  py-3 mt-2'>
        <div className=' px-4 '>

            <div className=' flex justify-between'>
                <div className=' flex gap-2 items-center justify-center'>
               { user?.image && <Image src={user?.image} width={550} height={525} className=' h-14 w-14 rounded-full'  alt='post'/>}
                <h1>{user?.name}</h1>  

                { post?.user?.image && <Image src={post?.user?.image} width={550} height={525} className=' h-14 w-14 rounded-full'  alt='post'/>}
                <h1>{post?.user?.name}</h1>  
                </div>

                {/* <div className=' flex gap-2 items-center justify-center'>
               { post?.user?.image && <Image src={post?.user?.image} width={550} height={525} className=' h-14 w-14 rounded-full'  alt='post'/>}
                <h1>{post?.user?.name}</h1>  
                </div> */}

               <div className=' flex items-center gap-3'>  <h1>{getPreviousDayFormatted(post?.createdAt)}</h1>
               
               {
               post.userId === adminuser?.id &&  <div onClick={()=>delePost(post?.id)}  className=' p-2 rounded-full bg-[#ff000015]'>  <MdOutlineDelete className=' text-red-600 text-2xl' /> </div>
               }
              
               </div>
          </div>

            <p className=' mt-5'> {post?.text} </p> 
        </div> 
        <div>
            {
                adminuser?.id === user?.id ? (
                <>
                    {
                    content !== 'homepage' &&  post.mediaUrl && post.mediaType === 'image'  && (
                            <div className=' w-full mt-2'>
                                <Image src={post.mediaUrl} alt='post' width={950} height={925} className=' h-96 w-full object-cover' />
                            </div>
                        )
                        }

                        {
                        content !== 'homepage' &&  post.mediaUrl && post.mediaType === 'video' && (
                        <div className='w-full mx-auto'>
                            <CldVideoPlayer width='960' height={540} className='rounded-md' src={post.mediaUrl} />
                        </div>
                        )
                        }
                
                </>)
             :(
            <>
             {
            content !== 'homepage' &&  ( post.isPublic ||   user?.isSubscription?.some((i: any) => i?.buyerId === adminuser?.id ) && post.mediaUrl && post.mediaType === 'image' ) && (
                <div className=' w-full mt-2'>
                    <Image src={post.mediaUrl} alt='post' width={950} height={925} className=' h-96 w-full object-cover' />
                </div>
            )
            }

            {
            content !== 'homepage' &&  (post.isPublic ||   user?.isSubscription?.some((i: any) => i?.buyerId === adminuser?.id) )&& post.mediaUrl && post.mediaType === 'video' && (
            <div className='w-full mx-auto'>
                <CldVideoPlayer width='960' height={540} className='rounded-md' src={post.mediaUrl} />
            </div>
            )
            }

            {
            content !== 'homepage' &&  !user?.isSubscription?.some((i: any) => i?.buyerId === adminuser?.id ) && !post.isPublic && (
                <div className=' w-full mt-2 bg-[#1a1b26] inshadow h-96'>
                    
                    <div className=' flex items-end pb-10 justify-center px-6 relative h-full'>

                    <IoMdLock  className=' text-7xl text-[#2f323b] absolute top-1/3'/>
                            
                            <div className=' p-4 w-full inshadow border-[1px] rounded-lg border-[#ffffff3f] '>
                      
                            <CheackOutPage user={user} adminuser={adminuser} content={'SUBSCRIBE TO SEE USER S POST'} />
                        </div>
                    </div>
                </div>
                )
            }
                    </>
                )
            }

            {
                content && content === 'homepage' && (
                    <>

                    {
                    post.mediaUrl && post.mediaType === 'image'  && (
                          <div className=' w-full mt-2'>
                              <Image src={post.mediaUrl} alt='post' width={950} height={925} className=' h-96 w-full object-cover' />
                          </div>
                      )
                      }
          
                      {
                       post.mediaUrl && post.mediaType === 'video' && (
                      <div className='w-full mx-auto'>
                          <CldVideoPlayer width='960' height={540} className='rounded-md' src={post.mediaUrl} />
                      </div>
                      )
                      }
                          
                    </>
                )
            }
        </div> 
        <div color="white" className='text-white px-4  '>
            <div className=' flex gap-5 items-center my-2 text-2xl '>
           <SlLike
                onClick={() => likeThePost(post.id)}
                className={`${
                  post?.likelist?.some((i: any) => i.userId === adminuser?.id)
                    ? 'text-red-600'
                    : 'text-white'
                } cursor-pointer text-2xl`}
              />
 
        <div className={`${showCommentBox === true ? 'text-[#00aeee] bg-[#0099ff1c]' : 'text-white'} p-2.5  cursor-pointer rounded-full text-2xl`} onClick={()=>setShowCommentBox(!showCommentBox)}>
        <FaRegComment   />
        </div>
  
            </div>
            
        {post?.likes === 0 ? '0' : formatNumber(post?.likes)} likes


     { showCommentBox && <div className='hidescroll w-full h-[250px] overflow-y-auto bg-[#1e202e] rounded-xl mt-5 inshadow'>

            <form className=' h-14  px-5 mt-3 mb-4 pt-4 flex justify-between' onSubmit={(e) => addComment(e, post?.id)} >
            <input name='text' className=' w-[90%] rounded-xl px-3 outline-none bg-transparent border border-[#ffffff21] inshadow' type="text" placeholder='Add new comment...' />
            <button className=' bg-blue-500 text-2xl px-4 rounded-xl' type="submit"><FiSend /></button>
            </form>

        { 
          post?.comments.length !== 0 ? post?.comments?.map((item:any) => ( 
            <div key={item?.id} className='px-4 flex my-3 '>
                <Image onClick={()=>router.push(`${item?.user?.id}`)} src={item?.user?.image} width={550} height={525} className=' h-14 w-14 rounded-full'  alt='post'/>
                <div className=' ml-4'>
                    <h1 className=' font-medium'>{item?.user?.name}</h1>
                    <p className=' text-sm'>{item?.text} </p>
                </div>
            </div> 
              )) : <div className=' w-full h-20 flex items-center justify-center'> No Comment Yet</div>
        }
        </div>
        }
       
        </div>
    </div>
	 ))
}

 {/* //////////// ------------------------------------ */}
 
        {
            !isLoading && posts.length === 0   &&
           (
           <div className='text-white px-20 h-[350px] text-center flex flex-col justify-center'>
            <Image src={'/nopost.png'} className=' w-[50%] mx-auto h-[50%]' height={900} width={900} alt='' />
             <h1 className='font-semibold text-zinc-700'>  No Posts Yet</h1>
            
            </div>)          
        }

   {
    isLoading && ( 
        <div className='  w-[80%] mt-10 mx-auto '>
        {[...Array(3)].map((_, i) => (

            <SkeletonCard  key={i} /> 
        ))}
    </div>
     )
   }
    </div>
  )
}

export default Posts