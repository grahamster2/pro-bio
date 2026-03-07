import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { auth } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
    apiVersion: '2026-01-28.clover' as any,
});

export async function POST() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const headersList = await headers();
        const host = headersList.get('host');
        const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
        const baseUrl = `${protocol}://${host}`;

        const supabase = await createClient();
        const { data: profile } = await supabase
            .from('profiles')
            .select('stripe_customer_id, business_name')
            .eq('user_id', userId)
            .single();

        let customerId = profile?.stripe_customer_id;

        const createStripeCustomer = async () => {
            const customer = await stripe.customers.create({
                metadata: { userId },
                name: profile?.business_name || 'Rovult User',
            });
            await supabase
                .from('profiles')
                .update({ stripe_customer_id: customer.id })
                .eq('user_id', userId);
            return customer.id;
        };

        if (!customerId) {
            customerId = await createStripeCustomer();
        }

        const createSession = async (cId: string) => {
            return await stripe.checkout.sessions.create({
                client_reference_id: userId,
                customer: cId,
                mode: 'subscription',
                payment_method_types: ['card'],
                line_items: [
                    {
                        price: process.env.STRIPE_PRICE_ID,
                        quantity: 1,
                    },
                ],
                success_url: `${baseUrl}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${baseUrl}/dashboard/settings`,
            });
        };

        let session;
        try {
            session = await createSession(customerId);
        } catch (err: any) {
            if (err.message && err.message.includes('No such customer')) {
                console.log('Customer not found in Stripe (likely test/live mismatch). Recreating...');
                customerId = await createStripeCustomer();
                session = await createSession(customerId);
            } else {
                throw err;
            }
        }

        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        console.error('Error creating checkout session:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
