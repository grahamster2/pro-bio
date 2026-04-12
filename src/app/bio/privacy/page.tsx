import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-zinc-950 text-slate-100 flex flex-col max-w-4xl mx-auto px-6 py-12">
            <div className="mb-8">
                <Link href="/" className="inline-flex items-center gap-2 text-brand-amber hover:text-amber-400 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </div>

            <h1 className="text-4xl font-heading font-black mb-6">Privacy Policy</h1>
            <div className="prose prose-invert max-w-none text-slate-300">
                <p>At Rovult, we value your privacy and aim to be transparent about how we process your information.</p>

                <h2 className="text-xl font-bold mt-8 mb-4 text-white">1. Information We Collect</h2>
                <p>We collect basic business information you provide during signup, such as business name, phone number, trades, and optional licenses or insurance documents.</p>

                <h2 className="text-xl font-bold mt-8 mb-4 text-white">2. How We Use Information</h2>
                <p>Your business profile is intended to be public. The data is displayed on your personalized link to assist your clients in reaching you. Private documents like COI are only visible to our verification team.</p>

                <h2 className="text-xl font-bold mt-8 mb-4 text-white">3. Third-party Providers</h2>
                <p>We use Clerk for authentication and Supabase for database storage. Please consult their respective privacy policies regarding data handling.</p>
            </div>
        </div>
    )
}
