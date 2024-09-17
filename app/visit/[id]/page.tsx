import { CoverImage, PaticularPost } from "@/actions/post.actions";
import { AdminUsers, PaticularUsers } from "@/actions/user.action"; 
import CheackOutPage from "@/components/custom/CheackOutPage";
import Posts from "@/components/custom/Posts";
import SideBar from "@/components/custom/SideBar";
import VisitPageFront from "@/components/custom/VisitPageFront";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

async function Visitpage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const alluser = await PaticularUsers(params.id);
  const posts = await PaticularPost({ userId: params.id });
  const count = await CoverImage(params.id);
  const adminuser = await AdminUsers();

  return (
    <main className=" flex">
      <SideBar user={session?.user} />
      <div className=" max-xl:pl-[100px] min-h-screen pl-[300px] max-lg:w-full border-r-[1.5px] border-[#ffffff27] w-[75%]">
        <VisitPageFront alluser={alluser} count={count} />
        <Posts posts={posts} user={alluser} adminuser={adminuser} />
      </div>

      <div className=" w-[23%] border-[#ffffff39] border-[2px]  py-8 h-fit flex rounded px-4 flex-col mx-auto mt-20">
        <h1 className=" text-zinc-400 font-medium text-xl mb-2">SUBSCRIPTION</h1>
        <CheackOutPage user={alluser} adminuser={adminuser} /> 
      </div>
    </main>
  );
}

export default Visitpage;
