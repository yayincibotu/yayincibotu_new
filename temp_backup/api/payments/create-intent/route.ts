import { NextRequest, NextResponse } from 'next/server'
import { stripe, STRIPE_CONFIG, calculateTotal, StripeError } from '@/lib/stripe'
import { verifyFirebaseToken } from '@/lib/firebase-admin'
import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI!

interface CreatePaymentIntentRequest {
  service_type: string
  quantity: number
  amount: number // in cents
  target_url?: string
  platform?: string
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid authorization header' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)
    const decodedToken = await verifyFirebaseToken(token)
    if (!decodedToken) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // Parse request body
    const body: CreatePaymentIntentRequest = await request.json()
    const { service_type, quantity, amount, target_url, platform } = body

    // Validate required fields
    if (!service_type || !quantity || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: service_type, quantity, amount' },
        { status: 400 }
      )
    }

    // Validate amount (must be positive and reasonable)
    if (amount < 100 || amount > 1000000) { // ₺1.00 to ₺10,000.00
      return NextResponse.json(
        { error: 'Invalid amount. Must be between ₺1.00 and ₺10,000.00' },
        { status: 400 }
      )
    }

    // Calculate total with tax
    const totalAmount = calculateTotal(amount)

    // Get or create customer in Stripe
    let customer
    try {
      // Try to find existing customer by email
      const existingCustomers = await stripe.customers.list({
        email: decodedToken.email,
        limit: 1,
      })

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0]
      } else {
        // Create new customer
        customer = await stripe.customers.create({
          email: decodedToken.email,
          name: decodedToken.name || decodedToken.email,
          metadata: {
            firebase_uid: decodedToken.uid,
            user_id: decodedToken.uid,
          },
        })
      }
    } catch (error) {
      console.error('Error creating/finding customer:', error)
      return NextResponse.json(
        { error: 'Failed to process customer information' },
        { status: 500 }
      )
    }

    // Generate unique order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: STRIPE_CONFIG.currency,
      customer: customer.id,
      payment_method_types: STRIPE_CONFIG.payment_methods,
      metadata: {
        user_id: decodedToken.uid,
        user_email: decodedToken.email || '',
        service_type,
        quantity: quantity.toString(),
        target_url: target_url || '',
        platform: platform || '',
        order_id: orderId,
        tax_amount: (totalAmount - amount).toString(),
        subtotal: amount.toString(),
      },
      description: `YayıncıBotu - ${service_type} (${quantity} adet)`,
      setup_future_usage: 'off_session', // Save payment method for future use
    })

    // Store order in MongoDB
    const client = new MongoClient(MONGODB_URI)
    try {
      await client.connect()
      const db = client.db('yayincibot')
      const orders = db.collection('orders')

      await orders.insertOne({
        order_id: orderId,
        payment_intent_id: paymentIntent.id,
        user_id: decodedToken.uid,
        user_email: decodedToken.email,
        service_type,
        quantity,
        amount_subtotal: amount,
        amount_tax: totalAmount - amount,
        amount_total: totalAmount,
        target_url: target_url || null,
        platform: platform || null,
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date(),
      })
    } catch (error) {
      console.error('Error storing order:', error)
      // Don't fail the payment creation if order storage fails
      // The webhook will handle order creation/update
    } finally {
      await client.close()
    }

    // Return client secret and order info
    return NextResponse.json({
      client_secret: paymentIntent.client_secret,
      order_id: orderId,
      payment_intent_id: paymentIntent.id,
      amount_subtotal: amount,
      amount_tax: totalAmount - amount,
      amount_total: totalAmount,
      currency: STRIPE_CONFIG.currency,
    })

  } catch (error) {
    console.error('Payment intent creation error:', error)

    if (error instanceof StripeError) {
      return NextResponse.json(
        { 
          error: 'Payment processing error',
          details: error.message,
          code: error.code,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 