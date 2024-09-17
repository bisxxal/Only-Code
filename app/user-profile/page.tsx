import SideBar from "@/components/custom/SideBar";
import React from "react"; 
import { getServerSession } from "next-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalyticsTab from "./AnalyticsTab";
import ContentTab from "./ContentTab";
import { Metadata } from "next";
import UserProfileUpload from "./UserProfileUpload";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "New Post ONLY Code",
};

async function UserProfile() {
  const session = await getServerSession(authOptions);
 
  return (
    <div className=" flex ">
      <SideBar user={session?.user} />
      <div className=" max-xl:pl-[100px] min-h-screen pl-[300px] max-lg:w-full border-r-[1.5px] border-[#ffffff27] w-[75%]">
        <Tabs defaultValue="content" className="w-full  mx-auto my-10 px-2 md:px-10" >
          <TabsList className="flex flex-col inshadow py-3 bg-[#1a1b26] md:flex-row w-full md:w-3/4 mx-auto h-auto">
            <TabsTrigger value="content" className="w-full md:w-auto">
              Content
            </TabsTrigger>

            <TabsTrigger value="analytics" className="w-full md:w-auto">
              Analytics
            </TabsTrigger>
            
            <TabsTrigger value="update" className="w-full md:w-auto">
              Update
            </TabsTrigger>
          
          </TabsList>

          <TabsContent value="content">
            <ContentTab />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>
          <TabsContent value="update">
            <UserProfileUpload />
          </TabsContent>
        </Tabs>
      </div>

      <div className=" max-lg:hidden bg-zinc-900 w-[25%]"></div>
    </div>
  );
}

export default UserProfile;
