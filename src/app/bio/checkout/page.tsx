"use client";

import { useEffect, useState } from "react";

export default function CheckoutPage() {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/checkout/create-checkout-session", {
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.url) {
                    window.location.href = data.url;
                } else if (data.error) {
                    setError(data.error);
                }
            })
            .catch((err) => setError(err.message));
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-center">
                {error ? (
                    <div className="p-4 text-red-500 bg-red-950/20 rounded-xl text-center">
                        <p className="font-semibold">Configuration Error:</p>
                        <p className="text-sm mt-1">{error}</p>
                    </div>
                ) : (
                    <div className="p-8 text-center text-slate-400 flex flex-col items-center justify-center">
                        <div className="w-8 h-8 rounded-full border-r-2 border-t-2 border-brand-amber animate-spin mb-4 mx-auto" />
                        <p>Redirecting to secure checkout...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
