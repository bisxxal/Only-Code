 
import { getServerSession } from "next-auth"; 
import SideBar from "@/components/custom/SideBar"; 
import {  allUsers } from "@/actions/user.action";
import SuggestedUser  from "@/components/custom/SuggestedUser";
import HomePage from "@/components/custom/HomePage"; 
import { authOptions } from "@/lib/auth";
// import { CldVideoPlayer } from 'next-cloudinary';
// import 'next-cloudinary/dist/cld-video-player.css';
  

export default async function Home() {
  const session = await getServerSession(authOptions); 
  const alluser = await allUsers();

  // const post = await postsAll()
  
 
  return (
    <main className="w-full flex ">
     <SideBar   user={session?.user}/>

     {/* <CldVideoPlayer
        width="1920"
        height="1080"
        src="<Public ID>"
      /> */}
      
      <div className=" max-xl:pl-[100px] pl-[300px] max-lg:w-full  w-[75%]">
       <HomePage /> 


      </div>
      
       <div className=" max-lg:hidden w-[25%]">
      <SuggestedUser alluser={alluser} />
       </div>
    
    
    </main>
  );
}
