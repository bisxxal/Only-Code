import SideBar from "@/components/custom/SideBar";
import React from "react";
import ContentTab from "../../components/custom/ContentTab";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AdminUsers } from "@/actions/user.action";

async function page() {
  const session = await getServerSession(authOptions);
  const adminuser = await AdminUsers(session?.user?.email!);
  return (
    <main className="w-full flex ">
      <SideBar user={adminuser} />

      <div className=" max-xl:pl-[100px] pl-[300px] max-lg:w-full  w-[75%]">
        <ContentTab />
      </div>

      <div className=" max-lg:hidden  w-[25%]"></div>
    </main>
  );
}

export default page;
