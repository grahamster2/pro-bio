import { Wrench } from 'lucide-react'
import Link from 'next/link'
import { SignIn } from '@clerk/nextjs'

export default function LoginPage() {
    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center mx-auto min-h-screen">
            <Link
                href="/"
                className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-slate-300 bg-zinc-800 hover:bg-zinc-700 flex items-center group text-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>{" "}
                Back
            </Link>

            <div className="flex flex-col items-center mb-8">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4 border border-zinc-700">
                    <Wrench className="w-6 h-6 text-brand-amber" />
                </div>
                <h1 className="text-3xl font-heading font-black text-slate-100">Welcome to ProBio</h1>
                <p className="text-slate-400 mt-2 text-center mb-8">Sign in to your account</p>

                <SignIn
                    appearance={{
                        elements: {
                            card: "bg-zinc-900 border border-zinc-800",
                            headerTitle: "text-slate-100",
                            headerSubtitle: "text-slate-400",
                            socialButtonsBlockButton: "border-zinc-700 text-slate-300 hover:bg-zinc-800 bg-zinc-900",
                            socialButtonsBlockButtonText: "text-slate-300 font-medium",
                            dividerLine: "bg-zinc-800",
                            dividerText: "text-slate-500",
                            formFieldLabel: "text-slate-300",
                            formFieldInput: "bg-zinc-900 border-zinc-800 text-slate-100 placeholder:text-slate-500 focus:border-brand-amber",
                            formButtonPrimary: "bg-brand-amber text-zinc-950 font-bold hover:bg-amber-400",
                            footerActionText: "text-slate-400",
                            footerActionLink: "text-brand-amber hover:text-amber-400"
                        }
                    }}
                    routing="hash"
                    fallbackRedirectUrl="/dashboard"
                />
            </div>
        </div>
    )
}
