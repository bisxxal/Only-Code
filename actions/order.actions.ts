'use server'
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe' 

interface OrderProps {
    // price: number;
    // userId: string;
    // buyerId: string;
    // name: string;
    
}
export const createOrder = async (order:any) => {
    try {
        
            const stripe = new Stripe('sk_test_51PJ0rUSELHUO23ag6EAkQxPMXveBQj0mURv8yFUnyoJzF3WrNm6UAWeGRg8mU7IqcRBQSpGft03ttra9QJWmHbiG00RTLDrdtI')

            
        const price = 0 ? 0 : order.price * 100
        console.log(price);
            
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

        // return stripe.accountSessions

    } catch (error) {
        console.log('Error during checkout:', error);
        
    }
}

interface CheakOutProps {
    stripeId: string;
    sellerId: string;
    buyerId: string;
    totalAmount: string;
    createdAt: Date;
}
export const cheakOutOrder = async (orders:CheakOutProps) => {

    try {
        const newOrder = await prisma.subscription.create({
            data:{
                // stripeId: order.stripeId,
                // sellerId: order.sellerId,
                // buyerId: order.buyerId,
                // totalAmount: order.totalAmount,
                // createdAt: order.createdAt
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