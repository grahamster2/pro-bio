import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
            apiVersion: '2023-10-16' as any,
        });

        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_dummy';

        // Direct Supabase Admin Client since Webhooks aren't authenticated by Clerk 
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
            process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_key'
        );

        const body = await req.text();
        const signature = (await headers()).get('Stripe-Signature') as string;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        } catch (err: any) {
            console.error(`Webhook signature verification failed: ${err.message}`);
            return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
        }

        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;

                // client_reference_id should contain the Clerk User ID, but might be dropped in some v2 testmode flows
                let userId = session.client_reference_id;
                const subscriptionId = session.subscription as string;
                const customerId = session.customer as string;

                if (!userId && customerId) {
                    // Fall back to retrieving the user ID from the customer metadata we set during creation
                    try {
                        const customer = await stripe.customers.retrieve(customerId) as any;
                        userId = customer.metadata?.userId || null;
                    } catch (e) {
                        console.error('Failed to retrieve customer to fallback for userId', e);
                    }
                }

                if (!userId) {
                    console.error('No userId found in session or customer metadata');
                    break;
                }

                // If this is a subscription, get the actual subscription data
                if (subscriptionId) {
                    const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;

                    const { error } = await supabaseAdmin
                        .from('profiles')
                        .update({
                            is_premium: subscription.status === 'active' || subscription.status === 'trialing',
                            stripe_customer_id: customerId,
                            stripe_subscription_id: subscriptionId,
                            stripe_price_id: subscription.items.data[0]?.price.id,
                            stripe_current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                        })
                        .eq('user_id', userId);

                    if (error) {
                        console.error('Error updating Supabase profile:', error);
                        throw new Error(`Profile update failed: ${error.message}`);
                    }
                }
                break;
            }

            case 'invoice.paid': {
                const invoice = event.data.object as any;

                if (invoice.subscription) {
                    const subscriptionId = invoice.subscription as string;
                    const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;

                    await supabaseAdmin
                        .from('profiles')
                        .update({
                            is_premium: subscription.status === 'active' || subscription.status === 'trialing',
                            stripe_price_id: subscription.items.data[0]?.price.id,
                            stripe_current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                        })
                        .eq('stripe_subscription_id', subscriptionId);
                }
                break;
            }

            case 'customer.subscription.updated':
            case 'customer.subscription.deleted': {
                const subscription = event.data.object as any;

                await supabaseAdmin
                    .from('profiles')
                    .update({
                        is_premium: subscription.status === 'active' || subscription.status === 'trialing',
                        stripe_price_id: subscription.items.data[0]?.price.id,
                        stripe_current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
                    })
                    .eq('stripe_subscription_id', subscription.id);
                break;
            }
        }

        return NextResponse.json({ received: true });
    } catch (err: any) {
        console.error('Error handling webhook:', err);
        return new NextResponse(`Internal Server Error: ${err.message}`, { status: 500 });
    }
}
