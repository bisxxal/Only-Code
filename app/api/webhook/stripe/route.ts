import stripe from 'stripe'
import { NextResponse } from 'next/server'   
import { cheakOutOrder } from '@/actions/order.actions'

export async function POST(request: Request) {
  const body = await request.text()

  const sig = request.headers.get('stripe-signature') as string
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err) {
    return NextResponse.json({ message: 'Webhook error', error: err })
  }

  // Get the ID and type
  const eventType = event.type
  
  console.log('checkout.session.completed');

  // CREATE
  if (eventType === 'checkout.session.completed') {


    const { id, amount_total, metadata } = event.data.object
    
    const orders = {
      stripeId: id,
      sellerId: metadata?.sellerId || '',
      buyerId: metadata?.buyerId || '',
      totalAmount: amount_total ? (amount_total / 100).toString() : '0',
      // createdAt: new Date(),
    }

    const newOrder = await cheakOutOrder(orders)
    return NextResponse.json({ message: 'OK',showingOrder:orders, order: newOrder })
  }

  return new Response('', { status: 200 })
}