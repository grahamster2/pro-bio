'use client';

import { useState } from 'react';
import { Mail, Wrench, Hammer, Zap, Droplet, Star } from 'lucide-react';

export function QuoteForm({
    profileId,
    contractorName,
    contractorPhone,
    serviceOptions = []
}: {
    profileId: string;
    contractorName: string;
    contractorPhone: string | null;
    serviceOptions?: string[];
}) {
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [zip, setZip] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        const serviceText = selectedService ? `I need help with: ${selectedService}\n` : '';
        const messageBody = `Hi ${contractorName},\n\nI would like to request a quote.\n\n${serviceText}\nMy Details:\nName: ${name}\nPhone: ${phone}\nZip Code: ${zip}\n\nPlease let me know your availability.`;

        // 1. Post to lead API
        try {
            await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    profileId,
                    name,
                    phone,
                    zip,
                    serviceRequested: selectedService
                })
            });
            setIsSuccess(true);
        } catch (err) {
            console.error('Failed to save lead:', err);
            alert("Something went wrong requesting a quote. Please try again or text the professional directly.");
        }

        // 2. Open SMS app as a fallback/immediate alert for the professional
        if (contractorPhone) {
            const encodedMessage = encodeURIComponent(messageBody);
            // using a small delay so they see the success state
            setTimeout(() => {
                window.location.href = `sms:${contractorPhone}?&body=${encodedMessage}`;
            }, 500);
        }
    };

    if (isSuccess) {
        return (
            <div className="px-8 py-12 bg-zinc-950 border-t border-zinc-900 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-heading font-black text-slate-100 mb-2">Quote Requested!</h3>
                <p className="text-sm text-slate-400">
                    Your details have been sent. {contractorName} will be in touch with you shortly.
                </p>
                <button
                    onClick={() => { setIsSuccess(false); setName(''); setPhone(''); setZip(''); setSelectedService(null); }}
                    className="mt-6 text-xs text-brand-amber font-bold underline decoration-brand-amber/30 hover:decoration-brand-amber"
                >
                    Request another
                </button>
            </div>
        );
    }

    // If no custom services are provided, we skip the specific service selection and just show a general form
    const hasServices = serviceOptions.length > 0;

    return (
        <div className="px-8 py-8 bg-zinc-950 border-t border-zinc-900">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Request a Quote
            </h3>
            <form className="space-y-4" onSubmit={handleSubmit}>

                {/* Dynamic Visual Selectors */}
                {hasServices && (
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">1. What do you need?</label>
                        <div className="grid grid-cols-2 gap-3">
                            {serviceOptions.map((service, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setSelectedService(service)}
                                    className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-xl transition-all shadow-inner text-center leading-tight ${selectedService === service ? 'bg-brand-amber/10 border-2 border-brand-amber text-brand-amber' : 'bg-zinc-900 border-2 border-zinc-800 text-slate-400 hover:bg-zinc-800 hover:border-zinc-700'}`}
                                >
                                    <Star className="w-5 h-5 opacity-70 mb-1" />
                                    <span className="text-[11px] font-black tracking-wide uppercase">{service}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Text Inputs */}
                <div className={`space-y-3 ${hasServices ? 'pt-2' : ''}`}>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">{hasServices ? '2.' : '1.'} Your Details</label>
                    <input
                        placeholder="Full Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 px-4 py-4 rounded-xl text-base font-medium text-slate-200 focus:outline-none focus:border-brand-amber transition-colors"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            placeholder="Phone"
                            required
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 px-4 py-4 rounded-xl text-base font-medium text-slate-200 focus:outline-none focus:border-brand-amber transition-colors"
                        />
                        <input
                            placeholder="Zip Code"
                            required
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            className="w-full bg-zinc-900 border border-zinc-800 px-4 py-4 rounded-xl text-base font-medium text-slate-200 focus:outline-none focus:border-brand-amber transition-colors"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button disabled={isSubmitting} type="submit" className="relative w-full h-16 bg-brand-amber text-zinc-950 rounded-xl font-black text-xl shadow-[0_4px_20px_rgba(245,158,11,0.2)] hover:scale-[1.02] transition-transform overflow-hidden group disabled:opacity-50 disabled:hover:scale-100">
                        <span className="absolute inset-0 bg-white/20 animate-pulse"></span>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {isSubmitting ? 'Sending...' : (hasServices ? 'Get My Quote' : 'Contact Me')}
                        </span>
                    </button>
                    <p className="text-[10px] text-slate-600 text-center mt-3 font-medium">This will prepare a text message to the professional.</p>
                </div>
            </form>
        </div>
    );
}
