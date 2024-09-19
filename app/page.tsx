import { getServerSession } from "next-auth";
import SideBar from "@/components/custom/SideBar";
import { AdminUsers, allUsers } from "@/actions/user.action";
import SuggestedUser from "@/components/custom/SuggestedUser";
import HomePage from "@/components/custom/HomePage";
import { authOptions } from "@/lib/auth";
import { postForPublicUser } from "@/actions/post.actions";
import Posts from "@/components/custom/Posts";
export default async function Home() {
  const session = await getServerSession(authOptions);
  const alluser = await allUsers();
  const posts = await postForPublicUser();
  // const adminuser = await AdminUsers();
  const adminuser = await AdminUsers(session?.user?.email!);

  return (
    <main className="w-full flex ">
      <SideBar user={adminuser} />

      <div className=" max-xl:pl-[100px] pl-[300px] max-lg:w-full  w-[75%]">
        <HomePage />

        <Posts posts={posts?.posts} adminuser={adminuser} content="homepage" />
      </div>

      <div className=" max-lg:hidden w-[25%]">
        <SuggestedUser alluser={alluser} />
      </div>
    </main>
  );
}
