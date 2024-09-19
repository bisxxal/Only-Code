'use server'
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe' 

export const createOrder = async (order:any) => {
    try {
        
         const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
 
        const price = 0 ? 0 : order.price * 100
             
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price_data: {
                currency: 'inr',
                unit_amount: price,
                product_data: {
                  name: order.name,
                },
              },
              quantity: 1,
            },
            ],
            metadata:{
                sellerId: order.userId,
                buyerId: order.buyerId
            },
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/succes/payture`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/succes/payfalse`,
          }); 

          return session.url;
 
    } catch (error) {
        console.log('Error during checkout:', error);
        
    }
}

interface CheakOutProps {
    stripeId: string;
    sellerId: string;
    buyerId: string;
    totalAmount: string; 
}
export const cheakOutOrder = async (orders:CheakOutProps) => {

    try {
        const newOrder = await prisma.subscription.create({
            data:{
                stripeId: orders.stripeId, 
                buyerId: orders.buyerId, 
                userId: orders.sellerId,
                price: Number(orders.totalAmount),
                isPaid: true,
            }
        });
        return JSON.parse(JSON.stringify(newOrder));

    } catch (error) {
        console.error('Error during checkout:', error);
    }

}