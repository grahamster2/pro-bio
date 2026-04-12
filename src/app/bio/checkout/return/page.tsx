"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";

function CheckoutReturnContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [status, setStatus] = useState<"loading" | "complete" | "open" | "error">("loading");

    useEffect(() => {
        if (!sessionId) {
            setStatus("error");
            return;
        }

        fetch(`/api/checkout/session-status?session_id=${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "complete") {
                    setStatus("complete");
                } else if (data.status === "open") {
                    setStatus("open");
                } else {
                    setStatus("error");
                }
            })
            .catch((err) => {
                console.error(err);
                setStatus("error");
            });
    }, [sessionId]);

    if (status === "loading") {
        return (
            <div className="p-8 text-center text-slate-400 flex flex-col items-center justify-center">
                <div className="w-8 h-8 rounded-full border-r-2 border-t-2 border-brand-amber animate-spin mb-4" />
                Checking payment status...
            </div>
        );
    }

    if (status === "complete") {
        return (
            <div className="text-center p-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-slate-50 mb-2">Payment Successful!</h1>
                <p className="text-slate-400 mb-8">Thank you for upgrading to Rovult Premium.</p>
                <Link
                    href="/dashboard"
                    className="block w-full bg-brand-amber hover:bg-yellow-400 text-slate-900 font-bold py-3 px-4 rounded-xl transition-colors"
                >
                    Go to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="text-center p-4">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-50 mb-2">Payment Failed</h1>
            <p className="text-slate-400 mb-8">Your payment was not successful, or was canceled.</p>
            <Link
                href="/checkout"
                className="block w-full bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:ring-slate-700/50 text-slate-50 font-medium py-3 px-4 rounded-xl transition-colors mb-4"
            >
                Try Again
            </Link>
            <Link href="/dashboard" className="block text-slate-400 hover:text-slate-300 transition-colors">
                Return to Dashboard
            </Link>
        </div>
    );
}

export default function CheckoutReturnPage() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading...</div>}>
                    <CheckoutReturnContent />
                </Suspense>
            </div>
        </div>
    );
}
