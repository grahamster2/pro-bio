import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { profileId } = body;

        if (!profileId) {
            return NextResponse.json({ error: 'Missing profileId' }, { status: 400 });
        }

        const supabase = await createClient();

        // Optional: Get IP and User-Agent from headers
        const userAgent = request.headers.get('user-agent') || 'Unknown';
        const forwardedFor = request.headers.get('x-forwarded-for');
        const viewerIp = forwardedFor ? forwardedFor.split(',')[0] : 'Unknown';

        const { error } = await (supabase as any)
            .from('page_views')
            .insert({
                profile_id: profileId,
                user_agent: userAgent,
                viewer_ip: viewerIp,
            });

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error recording page view:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
