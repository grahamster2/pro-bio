"use client";

import { useEffect, useState } from "react";
import "./TypewriterSlogan.css";

const words = [
    "build homes.",
    "pour concrete.",
    "fix pipes.",
    "pull wire.",
    "get it done."
];

export function TypewriterSlogan() {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (index >= words.length) return;

        if (subIndex === words[index].length && !isDeleting) {
            // Pause at the end of the word before starting to delete
            const timeout = setTimeout(() => {
                setIsDeleting(true);
            }, 2000);
            return () => clearTimeout(timeout);
        }

        if (subIndex === 0 && isDeleting) {
            // Move to the next word when deletion is complete
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
        }, isDeleting ? 90 : 150); // 150ms to type, 90ms to delete (slowed down further)

        return () => clearTimeout(timeout);
    }, [subIndex, index, isDeleting]);

    return (
        <span className="inline-flex items-end self-end whitespace-nowrap min-w-[320px] md:min-w-[400px] lg:min-w-[550px]">
            <span className="loader tracking-tighter">
                <span className="loader-text block">
                    {words[index].substring(0, subIndex) || "\u200B"}
                </span>
            </span>
        </span>
    );
}
