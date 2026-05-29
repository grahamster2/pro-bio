"use client";

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [formData, setFormData] = useState({
     firstName: '',
     lastName: '',
     email: '',
     projectDetails: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
     setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setLoading(true);
     setErrorMsg('');
     
     try {
        const res = await fetch('/api/contact', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(formData)
        });
        
        if (!res.ok) {
           const { error } = await res.json();
           throw new Error(error || 'Failed to send message');
        }
        
        setSuccess(true);
        setFormData({ firstName: '', lastName: '', email: '', projectDetails: '' });
     } catch (err: any) {
        setErrorMsg(err.message || 'An error occurred.');
     } finally {
        setLoading(false);
     }
  };

  return (
    <div className="aurora-page flex flex-col min-h-screen bg-[#050505] text-[#f4f4f5] font-sans">
      <div className="aurora">
        <div className="aurora-grain" />
        <div className="aurora-vignette" />
      </div>
      <Navigation />
      
      <main className="flex-1 pt-40 px-6 max-w-3xl mx-auto w-full pb-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">Let's talk.</h1>
          <p className="text-xl text-neutral-400 font-medium">
            Ready to upgrade your digital architecture? Tell us about your project.
          </p>
        </div>

        <div className="bg-[#0a0a0c] border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#38bdf8] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
           
           <form onSubmit={handleSubmit} className="space-y-6 relative z-10 flex flex-col">
              {success && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium">
                  Thanks for reaching out! We will get back to you shortly.
                </div>
              )}
              {errorMsg && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400">First Name</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full bg-[#121212] border border-[#27272a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#38bdf8] transition-colors" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-400">Last Name</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full bg-[#121212] border border-[#27272a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#38bdf8] transition-colors" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">Email Address</label>
                <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-[#121212] border border-[#27272a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#38bdf8] transition-colors" placeholder="john@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-400">Project Details</label>
                <textarea name="projectDetails" value={formData.projectDetails} onChange={handleChange} rows={5} className="w-full bg-[#121212] border border-[#27272a] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#38bdf8] transition-colors" placeholder="Tell us about the challenges you're facing..."></textarea>
              </div>

              <button disabled={loading} type="submit" className="w-full py-4 mt-4 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                 {loading ? 'Sending...' : 'Send Message'}
              </button>
           </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
