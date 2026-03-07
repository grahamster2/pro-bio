'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { UploadCloud, Loader2, Image as ImageIcon, Pencil } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@clerk/nextjs';

interface ImageUploaderProps {
    onUploadComplete: (url: string) => void;
    currentImageUrl?: string | null;
    isGallery?: boolean;
    bucketName?: string;
}

export function ImageUploader({
    onUploadComplete,
    currentImageUrl,
    isGallery = false,
    bucketName = 'contractor_assets'
}: ImageUploaderProps) {
    const { getToken, userId } = useAuth();
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !userId) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }

        // Show local preview immediately for UX
        const localPreviewUrl = URL.createObjectURL(file);
        setPreview(localPreviewUrl);
        setIsUploading(true);

        try {
            const clerkToken = await getToken({ template: 'supabase', skipCache: true });
            const supabase = createClient(clerkToken);

            // Create a unique file path tied to the user
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
            const filePath = `${userId}/${fileName}`;

            // Upload to Supabase Storage
            const { error: uploadError, data } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file, { upsert: false });

            if (uploadError) {
                throw uploadError;
            }

            // Get the public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucketName)
                .getPublicUrl(filePath);

            onUploadComplete(publicUrl);
        } catch (error: any) {
            console.error('Detailed upload error:', error);
            alert(`Failed to upload image: ${error?.message || 'Unknown error'}. Please try again.`);
            setPreview(currentImageUrl || null); // Revert on failure
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Reset input
            }
        }
    };

    const triggerFileSelect = () => {
        if (!isUploading && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="w-full">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            {/* Gallery Upload Style vs Profile Avatar Style */}
            {isGallery ? (
                <button
                    type="button"
                    onClick={triggerFileSelect}
                    disabled={isUploading}
                    className={`w-full h-32 border-2 border-dashed border-zinc-700 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-brand-amber hover:bg-zinc-800/50 transition-all ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    {isUploading ? (
                        <Loader2 className="w-8 h-8 text-brand-amber animate-spin" />
                    ) : (
                        <UploadCloud className="w-8 h-8 text-slate-400" />
                    )}
                    <span className="text-sm font-medium text-slate-400">
                        {isUploading ? 'Uploading...' : 'Upload Photo'}
                    </span>
                </button>
            ) : (
                <div
                    onClick={triggerFileSelect}
                    className={`w-full relative group p-6 rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900 hover:border-brand-amber/50 transition-all flex flex-col sm:flex-row items-center gap-6 cursor-pointer ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    <div className="relative w-28 h-28 rounded-full bg-zinc-900 border-4 border-zinc-950 shadow-xl flex items-center justify-center overflow-hidden shrink-0">
                        {preview ? (
                            <Image
                                src={preview}
                                alt="Profile Avatar"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <ImageIcon className="w-10 h-10 text-zinc-600" />
                        )}

                        {/* Uploading Overlay */}
                        {isUploading && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                                <Loader2 className="w-6 h-6 text-brand-amber animate-spin" />
                            </div>
                        )}

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    </div>

                    {/* Floating Pencil Icon */}
                    <div className="absolute left-[8.5rem] top-24 w-8 h-8 rounded-full bg-brand-amber text-zinc-950 flex items-center justify-center shadow-lg border-2 border-zinc-950 transform -translate-y-1/2 -ml-3 z-20 group-hover:scale-110 transition-transform hidden sm:flex">
                        <Pencil className="w-3.5 h-3.5 fill-current" />
                    </div>

                    <div className="text-center sm:text-left flex-1 pb-2 sm:pb-0">
                        <h4 className="text-base font-bold text-slate-200 mb-1 group-hover:text-brand-amber transition-colors">
                            {isUploading ? 'Uploading...' : 'Upload Profile Photo'}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                            Customers trust pros they can see. Use a clear photo of yourself or your company logo.
                        </p>
                        <p className="text-[10px] text-slate-600 font-medium mt-3 uppercase tracking-wider">
                            JPG, PNG or GIF. Max 2MB.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
