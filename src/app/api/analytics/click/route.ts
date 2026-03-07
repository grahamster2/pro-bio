import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { profileId, linkType, linkUrl } = body;

        if (!profileId || !linkType || !linkUrl) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const supabase = await createClient();

        const { error } = await (supabase as any)
            .from('link_clicks')
            .insert({
                profile_id: profileId,
                link_type: linkType,
                link_url: linkUrl,
            });

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error recording link click:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
