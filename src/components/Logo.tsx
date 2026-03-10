import Image from 'next/image';

export function Logo({ className = '' }: { className?: string }) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <Image
                src="/logo.png"
                alt="Rovult Logo"
                width={180}
                height={60}
                className="object-contain w-[140px] h-auto sm:w-[180px]"
                priority
            />
        </div>
    );
}
