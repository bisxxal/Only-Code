'use client'
 
import Image from "next/image"
import Link from "next/link"

function page({params}: any) {
  return (
    <div className='h-screen flex justify-center items-center bg-blac text-zinc-200 '>

        <div className=" flex items-center justify-center flex-col gap-5">         
            <h1> {params.id === 'payture' ? 'Payment Verified Subscribed' :'Payment not verified ' }</h1>
            {params.id === 'payture' ? (  <Link className="inshadow  border-[2px] border-[#ffffff70] px-5 py-2 rounded-xl" href={'/'}>Go To Home</Link> ) :(   <Link className=" border-[2px] border-[#ffffff70] px-5 py-2 rounded-xl" href={'/'}>Go to Dashbord</Link>) }
        </div>
        
    </div>
  )
}

export default page