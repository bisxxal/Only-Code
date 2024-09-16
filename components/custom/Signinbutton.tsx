'use client'; 
import { signIn } from "next-auth/react";
import Image from "next/image";
const SignInButton = () => {
  return (
    <div className=" flex justify-between items-center h-screen w-full">
      <div className=" w-1/2 h-screen bg-[#00aff0] pt-20 flex flex-col items-end pr-20 text-4xl font-mediu ">
     <div>
        <div className=" flex items-center gap-6 font-semibold mb-5">
     <Image src={'/logo.webp'} className="w-20 h-20" height={500} width={500} alt="" /> Only fans

        </div>
      Sign up to support 
      <h1>Favrorite creators</h1>
     </div>
      </div>
      <div className=" w-1/2 h-screen flex justify-center items-center ">
      <button className=" px-4 py-2 rounded-full bg-[#00aff0] " onClick={() => signIn('google')}>Sign in with Google</button>
      </div> 
    </div>
  );
};

export default SignInButton;