 
'use client';

import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { GoHome } from 'react-icons/go';
import { FaRegUser, FaPlus } from 'react-icons/fa6';
import { AdminUsers } from '@/actions/user.action';

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export type SideBarProps = {
  user: User | null | undefined;
};

function SideBar({ user }: SideBarProps) {
  const [adminId, setAdminId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminId = async () => {
      try {
        const admin = await AdminUsers();
        setAdminId(admin?.id || null);
      } catch (error) {
        console.error('Error fetching admin ID:', error);
      }
    };

    fetchAdminId();
  }, []);

  return (
    <div className="fixed max-xl:w-[100px] w-[300px] h-screen border-r-[1.5px] border-[#ffffff27]">
      <div className="mt-5 flex flex-col mx-auto w-[65%] gap-4">

        <Link  href={`/visit/${adminId}`}> 
        {user?.image && (
          <Image
          src={user?.image}
          height={300}
          width={300}
          alt="User profile picture"
          className="w-10 h-10 object-cover rounded-full"
          />
        )}
        </Link>
        <Link
          className="frame inshadow px-5 flex items-center gap-2 hover:bg-[#5a96c323] hover:text-blue-600 font-medium p-3 rounded-full"
          href="/"
        >
          <GoHome className="text-xl" />
          <h1 className="block max-xl:hidden">Home</h1>
        </Link>
        <Link
          className="frame inshadow px-5 flex items-center gap-2 hover:bg-[#5a96c323] hover:text-blue-600 font-medium p-3 w-full rounded-full"
          href="/update-profile"
        >
          <FaRegUser className="text-xl" />
          <h1 className="block max-xl:hidden">Update Profile</h1>
        </Link>
       
          <Link
            className="frame inshadow px-5 flex items-center gap-2 hover:bg-[#5a96c323] hover:text-blue-600 font-medium p-3 w-full rounded-full"
            href={`/visit/${adminId}`}
          >
            <FaRegUser className="text-xl" />
            <h1 className="block max-xl:hidden">Admin Profile</h1>
          </Link>    
          <Link
            className="frame inshadow px-5 flex items-center gap-2 hover:bg-[#5a96c323] hover:text-blue-600 font-medium p-3 w-full rounded-full"
            href={`/subscriptions`}
          >
            <FaRegUser className="text-xl" />
            <h1 className="block max-xl:hidden">Subscriptions</h1>
          </Link>    
          <Link
            className="frame inshadow px-5 flex items-center gap-2 hover:bg-[#5a96c323] hover:text-blue-600 font-medium p-3 w-full rounded-full"
            href={`/analytices`}
          >
            <FaRegUser className="text-xl" />
            <h1 className="block max-xl:hidden">Analytices</h1>
          </Link>    
        <Link
          className="inshadow px-5 flex gap-2 items-center mt-6 bg-[#00aff0] hover:bg-blue-500 py-2 rounded-full"
          href="/new-post"
        >
          <FaPlus className="text-xl" />
          <h1 className="block max-xl:hidden">New Post</h1>
        </Link>
        <button
          className="inshadow bg-red-600  p-2 rounded-full"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
