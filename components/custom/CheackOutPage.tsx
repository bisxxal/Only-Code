'use client'
import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '../ui/button';
import { PostProps } from './Posts';
import { createOrder } from '@/actions/order.actions';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheackOutPage({ user,  adminuser ,content} : PostProps) {
    useEffect(() => { 
    
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) { 
        }
    
        if (query.get('canceled')) { 
        }
      }, []);

    const onCheakOut = async () => {
        const order = { 
          price: user?.subscriptionPrice,
          userId : user?.id, // sellerId
          // isPaid:true,
          buyerId : adminuser?.id, // buyerId
          // sellerId : user?.id,
          name: user?.name
        };
    
        try {
          const url = await createOrder(order);

          if (url) {
            window.location.href = url;
          }
        // console.log(order);
        
        } catch (error) {
          // console.error('Error during checkout:', error);
        }
      }; 
     
  return (
    <div>
    
      {
        user?.isSubscription &&  user.isSubscription?.some((i: any) => i?.buyerId === adminuser?.id) ?(
          <div className=' flex justify-between px-4 border-[2px] border-[#ffffff39] text-[#20bcff] font-medium py-2 rounded-full '>
            subscribed <p>FOR {user.subscriptionPrice}</p>
          </div>
        ) : (
          <Button
      onClick={onCheakOut}
      role="link"
      size="lg"
      className="rounded-full flex justify-center px-5 bg-[#0696d4] hover:bg-[#0091ea] w-full inshadow"
    >
      {/* Subscribe  <p>&#8377; {user?.subscriptionPrice}</p> */}
      {content ? content : <div className=' flex items-center justify-between w-full'>  Subscribe  <p>&#8377; {user?.subscriptionPrice}</p> </div> }
    </Button>
        )
      }
     
    </div>
  )
}

export default CheackOutPage