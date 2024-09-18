import React from 'react'
import AnalyticsTab from '../user-profile/AnalyticsTab'
import { AdminUsers } from '@/actions/user.action';
import SideBar from '@/components/custom/SideBar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

async function page() {
    const adminuser = await AdminUsers();
    const session = await getServerSession(authOptions);
  return (
    <main className="w-full flex ">
      <SideBar user={session?.user} />

      <div className=" max-xl:pl-[100px] pl-[310px] max-lg:w-full  w-[75%]">
        <AnalyticsTab adminuser={adminuser} />
      </div>

      <div className=" max-lg:hidden  w-[25%]">
        {/* <SuggestedUser alluser={alluser} /> */}
      </div>
    </main>
  )
}

export default page