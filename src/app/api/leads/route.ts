import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { profileId, name, phone, zip, serviceRequested } = body;

        if (!profileId || !name || !phone || !zip) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const supabase = await createClient();

        const { error } = await (supabase as any)
            .from('leads')
            .insert({
                profile_id: profileId,
                name,
                phone,
                zip,
                service_requested: serviceRequested || null,
            });

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving lead:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
