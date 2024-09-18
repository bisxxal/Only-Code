'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

function Subscribe({subscribed , youSubscribed}:any) {  
    
  return (
    <>

          <Tabs defaultValue="Post" className="w-[full] ">
          <TabsList className=" flex items-center w-[90%] mx-auto h-[50px] justify-evenly rounded  bg-[#1e202e]">
            <TabsTrigger  className=" w-[49%] h-[40px]  data-[state=active]:bg-[#19a3ff] data-[state=active]:text-[white] data-[state=active]:border-none   rounded  hover:text-white  uppercase" value="Post">You Subscribed  </TabsTrigger>
            <TabsTrigger  className=" w-[49%] h-[40px]  data-[state=active]:bg-[#19a3ff] data-[state=active]:text-[white] data-[state=active]:border-none  hover:text-white uppercase "value="Media">User who Subscribed you   </TabsTrigger>
          </TabsList>
          
          <TabsContent value="Post"> 
          <h1 className=' p-5 text-2xl font-semibold text-zinc-500 '>You Subscribed</h1>
            <div className=' flex flex-wrap gap-4'>
                  {
                 subscribed && subscribed?.map((subscription:any) => (
                      <div className=' w-[300px] h-[270px] overflow-hidden rounded-xl border-[2px] border-[#ffffff10] frame inshadow' key={subscription?.id}>
                      <Link href={`/visit/${subscription?.user?.id}`}>
                          <Image src={subscription?.user?.backgoundImage} alt={subscription?.user?.name} width={200} height={200} className=' w-full h-[35%] object-cover rounded-t-xl'/>
                        <div className=' mb-5 flex gap-3'>
                          <Image src={subscription?.user?.image} alt={subscription?.user?.name} width={200} height={200} className='h-24 -mt-10 ml-3 border-[1.7px] border-black w-24 object-cover rounded-full'/>
                          <p className=' mt-3 font-medium text-lg '>{subscription?.user?.name}</p>
                        </div>
                          <p className=' w-[92%] text-sm  flex justify-between mx-auto border-[2px] border-blue-500 py-3 px-3 rounded-full'>SUBSCRIBED <span>FOR {subscription?.user?.subscriptionPrice}</span></p>
                      </Link>
                      </div>
                  ))
              }
          </div>
            
             </TabsContent>
          <TabsContent value="Media">
          <h1 className=' p-5 text-2xl font-semibold text-zinc-500 '> Your Subscriptions</h1>
             
             <div>
                {
                  youSubscribed &&  youSubscribed?.map((subscription:any) => (
                        <div className=' w-[300px] h-[270px] overflow-hidden rounded-xl border-[2px] border-[#ffffff10] frame inshadow' key={subscription?.id}>
                        <Link href={`/visit/${subscription?.id}`}>
                            <Image src={subscription?.backgoundImage} alt='' width={200} height={200} className=' w-full h-[35%] object-cover rounded-t-xl'/>
                          <div className=' mb-5 flex gap-3'>
                            <Image src={subscription?.image} alt='' width={200} height={200} className='h-24 -mt-10 ml-3 border-[1.7px] border-black w-24 object-cover rounded-full'/>
                            <p className=' mt-3 font-medium text-lg '>{subscription?.name}</p>
                          </div>
                            <p className=' w-[92%] text-sm  flex justify-between mx-auto border-[2px] border-blue-500 py-3 px-3 rounded-full'>SUBSCRIBED <span>FOR {subscription?.subscriptionPrice}</span></p>
                        </Link>
                        </div>
                    ))
                }
            </div>

               </TabsContent>
        </Tabs>

 
        </>
  )
}

export default Subscribe