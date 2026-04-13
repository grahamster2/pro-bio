import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import prisma from '@/lib/prisma';

// Initialize Resend with your API key if it exists
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, projectDetails } = body;

        // Basic validation
        if (!firstName || !lastName || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Save to Database using Prisma
        const lead = await prisma.agencyLead.create({
            data: {
                firstName,
                lastName,
                email,
                projectDetails: projectDetails || null,
            },
        });

        console.log('Lead saved to database:', lead);

        // 2. Send Email via Resend
        if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 're_dummy') {
           try {
               await resend.emails.send({
                  from: 'Rovult Agency <leads@rovult.com>', // Replace with your verified sending domain
                  to: [process.env.ADMIN_EMAIL || email], // Fallbacks if you don't have an admin email var
                  subject: `New Project Inquiry from ${firstName} ${lastName}`,
                  text: `
                    Name: ${firstName} ${lastName}
                    Email: ${email}
                    
                    Project Details:
                    ${projectDetails || "N/A"}
                  `,
               });
               console.log('Email sent successfully via Resend');
           } catch (emailError) {
               console.error('Resend error sending email:', emailError);
               // We don't fail the whole request if only the email fails
           }
        } else {
           console.log('NOTICE: Resend API Key is missing or default. Email was not sent, but database insertion succeeded.');
           console.log('Lead details:', { firstName, lastName, email, projectDetails });
        }

        return NextResponse.json({ success: true, leadId: lead.id });
    } catch (error) {
        console.error('Error saving contact lead:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
