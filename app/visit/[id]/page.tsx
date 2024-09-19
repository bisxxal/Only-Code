// import { CoverImage, PaticularPost, PaticularPostForMedia } from "@/actions/post.actions";
// import { AdminUsers, PaticularUsers } from "@/actions/user.action"; 
// import CheackOutPage from "@/components/custom/CheackOutPage";
// import MediaShown from "@/components/custom/MediaShown";
// import Posts from "@/components/custom/Posts";
// import SideBar from "@/components/custom/SideBar";
// import VisitPageFront from "@/components/custom/VisitPageFront";
// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
// import React from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import Link from "next/link";


// async function Visitpage({ params }: { params: { id: string } }) {
//   const session = await getServerSession(authOptions);
//   const alluser = await PaticularUsers(params?.id);
//   const posts = await PaticularPost({ userId: params?.id });
//   const mediaposts = await PaticularPostForMedia({ userId: params?.id });
//   const count = await CoverImage(params?.id);
//   const adminuser = await AdminUsers(session?.user?.email!);
  
//   return (
//     <main className=" flex">
//       <SideBar user={adminuser} />
//       <div className=" max-xl:pl-[100px] min-h-screen pl-[300px] max-lg:w-full border-r-[1.5px] border-[#ffffff27] w-[75%]">
//         <VisitPageFront alluser={alluser} count={count} />
       
//         <Tabs defaultValue="Post" className="w-[full] ">
//           <TabsList className=" flex items-center mx-auto h-[50px] justify-evenly rounded-none  bg-[#1e202e]">
//             <TabsTrigger  className=" w-[49%] h-[40px]  hover:bg-[#19a3ff76]  rounded-none hover:rounded-md hover:text-white  uppercase" value="Post"> {  posts?.length  === 0 ? 'No Posts':`Posts ${posts?.length  }` } </TabsTrigger>
//             <TabsTrigger  className=" w-[49%] h-[40px]  hover:bg-[#19a3ff76]  rounded-none hover:rounded-md hover:text-white uppercase "value="Media">  {  mediaposts?.length  === 0 ? 'No media':`media ${mediaposts?.length  }` }</TabsTrigger>
//           </TabsList>
          
//           <TabsContent value="Post"> <h1 className=" px-4 text-xl  text-zinc-400 ">Recent</h1> <Posts posts={posts} user={alluser} adminuser={adminuser} content='' /> </TabsContent>
//           <TabsContent value="Media"><h1 className=" px-4 text-xl  text-zinc-400 ">Recent</h1>  <MediaShown posts={mediaposts} user={alluser} adminuser={adminuser} /> </TabsContent>
//         </Tabs>

//       </div>


//       {
//         (adminuser?.id === alluser?.id) || ( alluser?.subscriptionPrice === null )  ? null : (
//            <div className=" w-[23%] border-[#ffffff39] border-[2px]  py-7 !pt-4 h-fit flex rounded-xl px-4 flex-col mx-auto mt-20">
//         <h1 className=" text-zinc-400 font-medium text-xl mb-4">SUBSCRIPTION</h1>
//         <CheackOutPage content="" user={alluser} adminuser={adminuser}  /> 
//       </div>
//         )
//       }
//       {
//         adminuser?.id !== alluser?.id ? null : (
//            <div className=" w-[23%] border-[#ffffff39] frame border-[2px]  py-7 !pt-4 h-fit flex rounded-xl px-4 flex-col mx-auto mt-20">
//             <Link className=" w-full inshadow  rounded py-2 px-4 mt-3 border-[2px] border-[#ffffff10] frame inshadow " href="/update-profile"> Update Profile </Link>
//             <Link className=" w-full inshadow  border-[2px] border-[#ffffff10] frame inshadow rounded py-2 px-4 mt-3 " href="/analytices"> Analytices </Link>

//             {
//               adminuser?.subscriptionPrice === null ?  (
//                 <Link className=" w-full inshadow  border-[2px] border-[#ffffff10] frame inshadow rounded py-2 px-4 mt-3 " href="/update-profile"> Subscription </Link>
//               ): null
//             }
//       </div>
//         )
//       }
     
//     </main>
//   );
// }

// export default Visitpage;

import { CoverImage, PaticularPost, PaticularPostForMedia } from "@/actions/post.actions";
import { AdminUsers, PaticularUsers } from "@/actions/user.action";
import CheackOutPage from "@/components/custom/CheackOutPage";
import MediaShown from "@/components/custom/MediaShown";
import Posts from "@/components/custom/Posts";
import SideBar from "@/components/custom/SideBar";
import VisitPageFront from "@/components/custom/VisitPageFront";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import React from "react";

async function Visitpage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);


  if (!session?.user?.email) { 
    return null;  
  }
    const [alluser, posts, mediaposts, count, adminuser] = await Promise.all([
    PaticularUsers(params?.id),
    PaticularPost({ userId: params?.id }),
    PaticularPostForMedia({ userId: params?.id }),
    CoverImage(params?.id),
    AdminUsers(session?.user?.email),
  ]);

  const isAdminUser = adminuser?.id === alluser?.id;
  const showSubscriptionSection = !isAdminUser && alluser?.subscriptionPrice !== null;

  return (
    <main className="flex">
      <SideBar user={adminuser} />
      
      <div className="pl-[300px] max-xl:pl-[100px] min-h-screen border-r-[1.5px] border-[#ffffff27] w-[75%] max-lg:w-full">
        <VisitPageFront alluser={alluser} count={count} />
        
        <Tabs defaultValue="Post" className="w-full">
          <TabsList className="flex items-center mx-auto h-[50px] justify-evenly bg-[#1e202e] rounded-none">
            <TabsTrigger value="Post" className="w-[49%] h-[40px] hover:bg-[#19a3ff76] hover:text-white uppercase">
              {posts?.length === 0 ? 'No Posts' : `Posts ${posts.length}`}
            </TabsTrigger>
            <TabsTrigger value="Media" className="w-[49%] h-[40px] hover:bg-[#19a3ff76] hover:text-white uppercase">
              {mediaposts?.length === 0 ? 'No media' : `Media ${mediaposts.length}`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Post">
            <h1 className="px-4 text-xl text-zinc-400">Recent</h1>
            <Posts posts={posts} user={alluser} adminuser={adminuser} content="" />
          </TabsContent>
          
          <TabsContent value="Media">
            <h1 className="px-4 text-xl text-zinc-400">Recent</h1>
            <MediaShown posts={mediaposts} user={alluser} adminuser={adminuser} />
          </TabsContent>
        </Tabs>
      </div>

      {showSubscriptionSection && (
        <div className="w-[23%] border-[#ffffff39] border-[2px] py-7 h-fit flex rounded-xl px-4 flex-col mx-auto mt-20">
          <h1 className="text-zinc-400 font-medium text-xl mb-4">SUBSCRIPTION</h1>
          <CheackOutPage content="" user={alluser} adminuser={adminuser} />
        </div>
      )}

      {isAdminUser && (
        <div className="w-[23%] border-[#ffffff39] border-[2px] py-7 h-fit flex rounded-xl px-4 flex-col mx-auto mt-20">
          <Link href="/update-profile" className="w-full inshadow rounded py-2 px-4 mt-3 border-[2px] border-[#ffffff10]">
            Update Profile
          </Link>
          <Link href="/analytices" className="w-full inshadow rounded py-2 px-4 mt-3 border-[2px] border-[#ffffff10]">
            Analytices
          </Link>
          {adminuser?.subscriptionPrice === null && (
            <Link href="/update-profile" className="w-full inshadow rounded py-2 px-4 mt-3 border-[2px] border-[#ffffff10]">
              Subscription
            </Link>
          )}
        </div>
      )}
    </main>
  );
}

export default Visitpage;
