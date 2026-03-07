'use client';

import { useEffect, useRef } from 'react';

export default function ViewTracker({ profileId }: { profileId: string }) {
    const hasTracked = useRef(false);

    useEffect(() => {
        if (hasTracked.current) return;

        hasTracked.current = true;

        fetch('/api/analytics/view', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ profileId })
        }).catch(err => console.error('Failed to track view:', err));
    }, [profileId]);

    return null; // This component doesn't render anything
}
