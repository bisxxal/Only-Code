import SideBar from "@/components/custom/SideBar";
import React from "react";
import ContentTab from "../user-profile/ContentTab";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function page() {
  const session = await getServerSession(authOptions);
  return (
    <main className="w-full flex ">
      <SideBar user={session?.user} />

      <div className=" max-xl:pl-[100px] pl-[300px] max-lg:w-full  w-[75%]">
        <ContentTab />
      </div>

      <div className=" max-lg:hidden  w-[25%]">
        {/* <SuggestedUser alluser={alluser} /> */}
      </div>
    </main>
  );
}

export default page;
