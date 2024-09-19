import { AdminUsers, userSubscription, userWhoSubscribed } from '@/actions/user.action';
import SideBar from '@/components/custom/SideBar';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React from 'react'
import Subscribe from './Subscribe';

async function page() {
  const session = await getServerSession(authOptions);
  // const adminuser = await AdminUsers();
  const adminuser = await AdminUsers(session?.user?.email!);
    const subscribed = await userSubscription({ id: adminuser?.id }); 
    const youSubscribed = await userWhoSubscribed({ id: adminuser?.id }); 
  return (
    <main className="w-full flex  ">
      <SideBar user={session?.user} />

      <div className=" max-xl:pl-[100px] pl-[310px] min-h-screen w-full pt-3">
       
      <Subscribe youSubscribed={youSubscribed} subscribed={subscribed} />
      </div>
       
    </main>
  )
}

export default page