'use client' 
import Image from 'next/image'
import { useRouter } from 'next/navigation'; 
 

export interface SuggestedUserProps {
  alluser: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    isSubcribed: boolean | null;
    customerId: string | null;
    backgoundImage: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
function SuggestedUser({alluser}: SuggestedUserProps) {
  const router = useRouter()
  return (
    <div className='w-full min-h-screen px-3  '>
        <h1 className='mb-5 mt-8 text-zinc-400 text-xl font-medium '>SUGGESTIONS</h1>
        <div className=' flex flex-col min-h-[75vh] items-center gap-3 w-full'>
           {
           alluser && alluser?.map((item, index) => {
              return (
                <div onClick={()=>router.push(`/visit/${item?.id}`)} key={index} className=' cursor-pointer bg-[#1a1b26] inshadow frame rounded-xl  relative w-[90%] h-[130px] overflow-hidden '>
                  <h1 className=' absolute top-1/3 font-bold text-lg left-[40%]'>{item?.name}</h1>
                  { item?.image && <Image src={item?.image} width={700} height={700} className=' absolute  h-24 border-[2.5px] top-4 left-6  w-24 rounded-full 'alt='' />  }
                  {
                    item?.backgoundImage && item?.backgoundImage ? <Image src={item?.backgoundImage} width={700} height={700} className=' h-full w-full  object-cover 'alt='' /> : null
                  }
                 </div>
              )})
            }
        </div>

        <div className='pt-7 text-sm flex justify-between px-2 text-gray-400 border-t-[1.5] border-[#ffffff2b] '>
            <h1>Privacy   &#8226;</h1>
            <h1>Cookie Notice &#8226;</h1>
            <h1>Terms of service    &#8226;</h1>
        </div>
    </div>
  )
}

export default SuggestedUser