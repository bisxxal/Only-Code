'use client'
import React, { useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Button } from '../ui/button';
import { PostProps } from './Posts';
import { createOrder } from '@/actions/order.actions';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheackOutPage({ user,  adminuser } : PostProps) {
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
        console.log(order);
        
        } catch (error) {
          console.error('Error during checkout:', error);
        }
      };
    
  return (
    <Button
      onClick={onCheakOut}
      role="link"
      size="lg"
      className="rounded-full bg-blue-600 w-full inshadow"
    >
      Subscribe
    </Button>
  )
}

export default CheackOutPage