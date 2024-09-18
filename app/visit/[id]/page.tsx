import { CoverImage, PaticularPost, PaticularPostForMedia } from "@/actions/post.actions";
import { AdminUsers, PaticularUsers } from "@/actions/user.action"; 
import CheackOutPage from "@/components/custom/CheackOutPage";
import MediaShown from "@/components/custom/MediaShown";
import Posts from "@/components/custom/Posts";
import SideBar from "@/components/custom/SideBar";
import VisitPageFront from "@/components/custom/VisitPageFront";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link";


async function Visitpage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const alluser = await PaticularUsers(params?.id);
  const posts = await PaticularPost({ userId: params?.id });
  const mediaposts = await PaticularPostForMedia({ userId: params?.id });
  const count = await CoverImage(params?.id);
  const adminuser = await AdminUsers();
  
  return (
    <main className=" flex">
      <SideBar user={session?.user} />
      <div className=" max-xl:pl-[100px] min-h-screen pl-[300px] max-lg:w-full border-r-[1.5px] border-[#ffffff27] w-[75%]">
        <VisitPageFront alluser={alluser} count={count} />
       
        <Tabs defaultValue="Post" className="w-[full] ">
          <TabsList className=" flex items-center mx-auto h-[50px] justify-evenly rounded-none  bg-[#1e202e]">
            <TabsTrigger  className=" w-[49%] h-[40px]  hover:bg-[#19a3ff76]  rounded-none hover:rounded-md hover:text-white  uppercase" value="Post"> {  posts?.length  === 0 ? 'No Posts':`Posts ${posts?.length  }` } </TabsTrigger>
            <TabsTrigger  className=" w-[49%] h-[40px]  hover:bg-[#19a3ff76]  rounded-none hover:rounded-md hover:text-white uppercase "value="Media">  {  mediaposts?.length  === 0 ? 'No media':`media ${mediaposts?.length  }` }</TabsTrigger>
          </TabsList>
          
          <TabsContent value="Post"> <h1 className=" px-4 text-xl  text-zinc-400 ">Recent</h1> <Posts posts={posts} user={alluser} adminuser={adminuser} /> </TabsContent>
          <TabsContent value="Media"><h1 className=" px-4 text-xl  text-zinc-400 ">Recent</h1>  <MediaShown posts={mediaposts} user={alluser} adminuser={adminuser} /> </TabsContent>
        </Tabs>

      </div>


      {
        (adminuser?.id === alluser?.id) ||( alluser?.subscriptionPrice !== null )  ? null : (
           <div className=" w-[23%] border-[#ffffff39] border-[2px]  py-7 !pt-4 h-fit flex rounded-xl px-4 flex-col mx-auto mt-20">
        <h1 className=" text-zinc-400 font-medium text-xl mb-4">SUBSCRIPTION</h1>
        <CheackOutPage user={alluser} adminuser={adminuser}  /> 
      </div>
        )
      }
      {
        adminuser?.id !== alluser?.id ? null : (
           <div className=" w-[23%] border-[#ffffff39] frame border-[2px]  py-7 !pt-4 h-fit flex rounded-xl px-4 flex-col mx-auto mt-20">
            <Link className=" w-full inshadow  rounded py-2 px-4 mt-3 border-[2px] border-[#ffffff10] frame inshadow " href="/update-profile"> Update Profile </Link>
            <Link className=" w-full inshadow  border-[2px] border-[#ffffff10] frame inshadow rounded py-2 px-4 mt-3 " href="/analytices"> Analytices </Link>

            {
              adminuser?.subscriptionPrice === null ?  (
                <Link className=" w-full inshadow  border-[2px] border-[#ffffff10] frame inshadow rounded py-2 px-4 mt-3 " href="/update-profile"> Subscription </Link>
              ): null
            }
      </div>
        )
      }
     
    </main>
  );
}

export default Visitpage;
