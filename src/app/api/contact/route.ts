import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, projectDetails } = body;

        if (!firstName || !lastName || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_dummy') {
            await resend.emails.send({
                from: 'Rovult <leads@rovult.com>',
                to: [process.env.ADMIN_EMAIL || email],
                subject: `New Project Inquiry from ${firstName} ${lastName}`,
                text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nProject Details:\n${projectDetails || 'N/A'}`,
            });
        } else {
            console.log('No Resend key. Lead:', { firstName, lastName, email, projectDetails });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Contact route error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
