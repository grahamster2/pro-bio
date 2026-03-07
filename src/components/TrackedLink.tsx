'use client';

export default function TrackedLink({
    href,
    className,
    children,
    profileId,
    linkType,
    target,
    rel
}: {
    href: string,
    className?: string,
    children: React.ReactNode,
    profileId: string,
    linkType: string,
    target?: string,
    rel?: string
}) {
    const handleClick = () => {
        // Fire and forget
        fetch('/api/analytics/click', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ profileId, linkType, linkUrl: href })
        }).catch(err => console.error('Failed to track click:', err));
    };

    return (
        <a href={href} className={className} onClick={handleClick} target={target} rel={rel}>
            {children}
        </a>
    );
}
