import React from "react";
import AnalyticsTab from "../../components/custom/AnalyticsTab";
import { AdminUsers, userWhoSubscribed } from "@/actions/user.action";
import SideBar from "@/components/custom/SideBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function page() {
  const adminuser = await AdminUsers();
  const session = await getServerSession(authOptions);
  const youSubscribed = await userWhoSubscribed({ id: adminuser?.id });
  return (
    <main className="w-full flex ">
      <SideBar user={session?.user} />

      <div className=" max-xl:pl-[100px] pl-[310px] max-lg:w-full  w-[75%]">
        <AnalyticsTab adminuser={adminuser} youSubscribed={youSubscribed} />
      </div>

      <div className=" max-lg:hidden  w-[25%]"></div>
    </main>
  );
}

export default page;
