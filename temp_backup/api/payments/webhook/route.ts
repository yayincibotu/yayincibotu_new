import { NextRequest, NextResponse } from 'next/server'
import { stripe, WEBHOOK_EVENTS } from '@/lib/stripe'
import { MongoClient } from 'mongodb'
import Stripe from 'stripe'

const MONGODB_URI = process.env.MONGODB_URI!
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

type CustomInvoice = Stripe.Invoice & { subscription?: string | null }

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET)
    } catch (error) {
      console.error('Webhook signature verification failed:', error)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    console.log('Webhook event received:', event.type)

    // Handle the event
    switch (event.type) {
      case WEBHOOK_EVENTS.PAYMENT_INTENT_SUCCEEDED:
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent)
        break

      case WEBHOOK_EVENTS.PAYMENT_INTENT_FAILED:
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent)
        break

      case WEBHOOK_EVENTS.INVOICE_PAID:
        await handleInvoicePaid(event.data.object as CustomInvoice)
        break

      case WEBHOOK_EVENTS.INVOICE_PAYMENT_FAILED:
        await handleInvoicePaymentFailed(event.data.object as CustomInvoice)
        break

      case WEBHOOK_EVENTS.CUSTOMER_SUBSCRIPTION_CREATED:
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription)
        break

      case WEBHOOK_EVENTS.CUSTOMER_SUBSCRIPTION_UPDATED:
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case WEBHOOK_EVENTS.CUSTOMER_SUBSCRIPTION_DELETED:
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

// Handle successful payment
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const client = new MongoClient(MONGODB_URI)
  try {
    await client.connect()
    const db = client.db('yayincibot')
    const orders = db.collection('orders')

    const orderId = paymentIntent.metadata.order_id
    const userId = paymentIntent.metadata.user_id
    const serviceType = paymentIntent.metadata.service_type
    const quantity = parseInt(paymentIntent.metadata.quantity)

    // Update order status
    await orders.updateOne(
      { order_id: orderId },
      {
        $set: {
          status: 'completed',
          payment_status: 'paid',
          payment_intent_id: paymentIntent.id,
          paid_at: new Date(),
          updated_at: new Date(),
        }
      }
    )

    // Start service fulfillment
    await fulfillOrder({
      orderId,
      userId,
      serviceType,
      quantity,
      targetUrl: paymentIntent.metadata.target_url,
      platform: paymentIntent.metadata.platform,
    })

    console.log(`Payment succeeded for order ${orderId}`)

  } catch (error) {
    console.error('Error handling payment success:', error)
  } finally {
    await client.close()
  }
}

// Handle failed payment
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  const client = new MongoClient(MONGODB_URI)
  try {
    await client.connect()
    const db = client.db('yayincibot')
    const orders = db.collection('orders')

    const orderId = paymentIntent.metadata.order_id

    // Update order status
    await orders.updateOne(
      { order_id: orderId },
      {
        $set: {
          status: 'failed',
          payment_status: 'failed',
          failure_reason: paymentIntent.last_payment_error?.message || 'Payment failed',
          updated_at: new Date(),
        }
      }
    )

    console.log(`Payment failed for order ${orderId}`)

  } catch (error) {
    console.error('Error handling payment failure:', error)
  } finally {
    await client.close()
  }
}

// Handle subscription invoice paid
async function handleInvoicePaid(invoice: CustomInvoice) {
  const client = new MongoClient(MONGODB_URI)
  try {
    await client.connect()
    const db = client.db('yayincibot')
    const subscriptions = db.collection('subscriptions')

    const customerId = invoice.customer as string
    const subscriptionId = invoice.subscription

    if (!subscriptionId) {
      console.log('No subscription ID found in invoice')
      return
    }

    // Update subscription status
    await subscriptions.updateOne(
      { stripe_subscription_id: subscriptionId },
      {
        $set: {
          status: 'active',
          current_period_start: new Date((invoice.period_start || 0) * 1000),
          current_period_end: new Date((invoice.period_end || 0) * 1000),
          updated_at: new Date(),
        }
      }
    )

    console.log(`Invoice paid for subscription ${subscriptionId}`)

  } catch (error) {
    console.error('Error handling invoice paid:', error)
  } finally {
    await client.close()
  }
}

// Handle subscription invoice payment failed
async function handleInvoicePaymentFailed(invoice: CustomInvoice) {
  const client = new MongoClient(MONGODB_URI)
  try {
    await client.connect()
    const db = client.db('yayincibot')
    const subscriptions = db.collection('subscriptions')

    const subscriptionId = invoice.subscription

    if (!subscriptionId) {
      console.log('No subscription ID found in invoice')
      return
    }

    // Update subscription status
    await subscriptions.updateOne(
      { stripe_subscription_id: subscriptionId },
      {
        $set: {
          status: 'past_due',
          updated_at: new Date(),
        }
      }
    )

    console.log(`Invoice payment failed for subscription ${subscriptionId}`)

  } catch (error) {
    console.error('Error handling invoice payment failure:', error)
  } finally {
    await client.close()
  }
}

// Handle subscription created
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const client = new MongoClient(MONGODB_URI)
  try {
    await client.connect()
    const db = client.db('yayincibot')
    const subscriptions = db.collection('subscriptions')

    // Get customer details
    const customer = await stripe.customers.retrieve(subscription.customer as string)
    const userEmail = 'email' in customer ? customer.email : null

    // Store subscription
    await subscriptions.insertOne({
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer,
      user_email: userEmail,
      status: subscription.status,
      current_period_start: new Date((subscription as any).current_period_start * 1000),
      current_period_end: new Date((subscription as any).current_period_end * 1000),
      plan_id: subscription.items.data[0].price?.id,
      created_at: new Date(),
      updated_at: new Date(),
    })

    console.log(`Subscription created: ${subscription.id}`)

  } catch (error) {
    console.error('Error handling subscription creation:', error)
  } finally {
    await client.close()
  }
}

// Handle subscription updated
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const client = new MongoClient(MONGODB_URI)
  try {
    await client.connect()
    const db = client.db('yayincibot')
    const subscriptions = db.collection('subscriptions')

    // Update subscription
    await subscriptions.updateOne(
      { stripe_subscription_id: subscription.id },
      {
        $set: {
          status: subscription.status,
          current_period_start: new Date((subscription as any).current_period_start * 1000),
          current_period_end: new Date((subscription as any).current_period_end * 1000),
          updated_at: new Date(),
        }
      }
    )

    console.log(`Subscription updated: ${subscription.id}`)

  } catch (error) {
    console.error('Error handling subscription update:', error)
  } finally {
    await client.close()
  }
}

// Handle subscription deleted
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const client = new MongoClient(MONGODB_URI)
  try {
    await client.connect()
    const db = client.db('yayincibot')
    const subscriptions = db.collection('subscriptions')

    // Update subscription status
    await subscriptions.updateOne(
      { stripe_subscription_id: subscription.id },
      {
        $set: {
          status: 'canceled',
          canceled_at: new Date(),
          updated_at: new Date(),
        }
      }
    )

    console.log(`Subscription canceled: ${subscription.id}`)

  } catch (error) {
    console.error('Error handling subscription cancellation:', error)
  } finally {
    await client.close()
  }
}

// Service fulfillment logic
async function fulfillOrder({
  orderId,
  userId,
  serviceType,
  quantity,
  targetUrl,
  platform
}: {
  orderId: string
  userId: string
  serviceType: string
  quantity: number
  targetUrl?: string
  platform?: string
}) {
  try {
    // This would integrate with actual service providers
    // For now, we'll just log and mark as processing
    
    console.log(`Fulfilling order ${orderId}:`, {
      userId,
      serviceType,
      quantity,
      targetUrl,
      platform
    })

    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    const db = client.db('yayincibot')
    const orders = db.collection('orders')

    // Update order to processing
    await orders.updateOne(
      { order_id: orderId },
      {
        $set: {
          fulfillment_status: 'processing',
          fulfillment_started_at: new Date(),
          updated_at: new Date(),
        }
      }
    )

    // Here you would integrate with:
    // - Twitch viewer bot service
    // - Instagram follower service
    // - YouTube view service
    // - TikTok like service
    // etc.

    // For demo purposes, mark as completed after 30 seconds
    setTimeout(async () => {
      try {
        await orders.updateOne(
          { order_id: orderId },
          {
            $set: {
              fulfillment_status: 'completed',
              fulfillment_completed_at: new Date(),
              updated_at: new Date(),
            }
          }
        )
        console.log(`Order ${orderId} fulfillment completed`)
      } catch (error) {
        console.error(`Error completing order ${orderId}:`, error)
      }
    }, 30000)

    await client.close()

  } catch (error) {
    console.error('Error fulfilling order:', error)
  }
} 