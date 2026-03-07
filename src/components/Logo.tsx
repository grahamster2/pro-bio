import { Wrench } from 'lucide-react';

export function Logo({ className = '' }: { className?: string }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="bg-brand-amber rounded-[8px] w-10 h-10 flex items-center justify-center shrink-0 shadow-sm">
                <Wrench className="w-5 h-5 text-zinc-950" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-heading font-black tracking-tight text-white mb-0.5">
                ROVULT
            </span>
        </div>
    );
}
