import SideBar from "@/components/custom/SideBar";
import React from "react"; 
import { getServerSession } from "next-auth"; 
import UpdateUserPage from "@/components/custom/UpdateUserPage";
import { AdminUsers } from "@/actions/user.action";
import { authOptions } from "@/lib/auth";

async function Updateepage() {
  const session = await getServerSession(authOptions);
  const admin = await AdminUsers();
 
  return (
    <main>
      <SideBar  user={session?.user} />
      <div className=" max-xl:pl-[100px] min-h-screen pl-[300px] max-lg:w-full border-r-[1.5px] border-[#ffffff27] w-[75%]">
        
        <h1 className=" p-4 text-xl text-zinc-400 font-semibold">Edit page</h1>
        <UpdateUserPage alluser={admin} />
      </div>
    </main>
  );
}

export default Updateepage;
