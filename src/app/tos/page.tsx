import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-zinc-950 text-slate-100 flex flex-col max-w-4xl mx-auto px-6 py-12">
            <div className="mb-8">
                <Link href="/" className="inline-flex items-center gap-2 text-brand-amber hover:text-amber-400 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </div>

            <h1 className="text-4xl font-heading font-black mb-6">Terms of Service</h1>
            <div className="prose prose-invert max-w-none text-slate-300">
                <p>Welcome to Rovult. By accessing or using our website and services, you agree to be bound by these Terms of Service.</p>

                <h2 className="text-xl font-bold mt-8 mb-4 text-white">1. Service Description</h2>
                <p>Rovult provides a simple link-in-bio style website builder targeted at blue-collar professionals. You are responsible for ensuring your business info is accurate.</p>

                <h2 className="text-xl font-bold mt-8 mb-4 text-white">2. Data & Privacy</h2>
                <p>We care about your privacy. Please review our Privacy Policy to understand how we collect and use your data.</p>

                <h2 className="text-xl font-bold mt-8 mb-4 text-white">3. Acceptable Use</h2>
                <p>You agree not to use the service for any illegal activities or to post misleading credentials. We reserve the right to remove accounts that violate these terms.</p>
            </div>
        </div>
    )
}
