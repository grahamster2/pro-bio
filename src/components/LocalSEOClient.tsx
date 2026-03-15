'use client'

import { useState } from 'react'
import { ServiceAreaMap } from '@/components/ServiceAreaMap'
import { ProjectGallery } from '@/components/ProjectGallery'
import { Info, BookOpen, Target, MapPin, Image, Search, TrendingUp, ChevronDown, ChevronUp, X } from 'lucide-react'

interface LocalSEOClientProps {
  isPremium: boolean
}

export default function LocalSEOClient({ isPremium }: LocalSEOClientProps) {
  const [showTutorial, setShowTutorial] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="max-w-4xl">
      {/* Tutorial Section */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white mb-1">New to SEO? Start Here!</h2>
              <p className="text-sm text-slate-300">
                Learn how Local SEO helps customers find your business online.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowTutorial(!showTutorial)}
            className="w-8 h-8 rounded-full bg-blue-500/20 hover:bg-blue-500/30 flex items-center justify-center transition-colors"
          >
            {showTutorial ? <X className="w-4 h-4 text-blue-400" /> : <Info className="w-4 h-4 text-blue-400" />}
          </button>
        </div>

        {showTutorial && (
          <div className="space-y-4 mt-6">
            {/* What is SEO Section */}
            <div className="bg-zinc-900/50 rounded-xl p-4">
              <button
                onClick={() => toggleSection('what-is-seo')}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-blue-400" />
                  <h3 className="font-medium text-white">What is SEO?</h3>
                </div>
                {expandedSection === 'what-is-seo' ? 
                  <ChevronUp className="w-4 h-4 text-slate-400" /> : 
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                }
              </button>
              
              {expandedSection === 'what-is-seo' && (
                <div className="mt-3 space-y-3 text-sm text-slate-300">
                  <p>
                    <strong>SEO (Search Engine Optimization)</strong> is like making your business card 
                    easy for Google to read and show to the right people.
                  </p>
                  <p>
                    When someone searches "plumber near me," Google looks for businesses that have 
                    told it exactly where they work and what they do.
                  </p>
                  <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
                    <p className="text-xs text-blue-400 mb-1">Simple Example:</p>
                    <p className="text-xs">
                      Without SEO: "John's Plumbing" - Google doesn't know where you work
                    </p>
                    <p className="text-xs mt-1">
                      With SEO: "John's Plumbing serving Dallas, Plano, Frisco" - Google shows you 
                      to Dallas-area searches
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Why Local SEO Section */}
            <div className="bg-zinc-900/50 rounded-xl p-4">
              <button
                onClick={() => toggleSection('why-local-seo')}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-green-400" />
                  <h3 className="font-medium text-white">Why Local SEO Matters</h3>
                </div>
                {expandedSection === 'why-local-seo' ? 
                  <ChevronUp className="w-4 h-4 text-slate-400" /> : 
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                }
              </button>
              
              {expandedSection === 'why-local-seo' && (
                <div className="mt-3 space-y-3 text-sm text-slate-300">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <TrendingUp className="w-4 h-4 text-green-400 mb-2" />
                      <p className="font-medium text-white text-xs mb-1">More Calls</p>
                      <p className="text-xs">Appear in local searches = more customer calls</p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <MapPin className="w-4 h-4 text-yellow-400 mb-2" />
                      <p className="font-medium text-white text-xs mb-1">Better Leads</p>
                      <p className="text-xs">Customers in your actual service area</p>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <Search className="w-4 h-4 text-purple-400 mb-2" />
                      <p className="font-medium text-white text-xs mb-1">Beat Competitors</p>
                      <p className="text-xs">Most contractors don't use Local SEO</p>
                    </div>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <p className="text-xs text-green-400">
                      <strong>Real Result:</strong> Contractors with Local SEO get 3x more qualified 
                      local leads than those without.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* How It Works Section */}
            <div className="bg-zinc-900/50 rounded-xl p-4">
              <button
                onClick={() => toggleSection('how-it-works')}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  <h3 className="font-medium text-white">How It Works (3 Simple Steps)</h3>
                </div>
                {expandedSection === 'how-it-works' ? 
                  <ChevronUp className="w-4 h-4 text-slate-400" /> : 
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                }
              </button>
              
              {expandedSection === 'how-it-works' && (
                <div className="mt-3 space-y-3 text-sm text-slate-300">
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-400 font-bold text-sm">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">Add Your Service Areas</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Tell us which ZIP codes you serve. This helps Google show you to 
                          customers in those areas.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-green-400 font-bold text-sm">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">Add Project Photos</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Upload photos of your work and tag them with locations. This proves 
                          you actually work in those areas.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-400 font-bold text-sm">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">We Handle the Rest</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Our system automatically optimizes your profile for local search. 
                          No technical knowledge needed!
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
                    <p className="text-xs text-purple-400">
                      <strong>Time Investment:</strong> About 10 minutes total setup, then 2 minutes 
                      per new project you want to add.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile-Responsive Management Section */}
      <div className="space-y-6">
        {/* Service Areas */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden">
          <div className="px-4 sm:px-5 py-4 border-b border-zinc-800/60 bg-zinc-950/40">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-4 rounded-full bg-brand-amber" />
              <h2 className="text-sm font-semibold text-slate-200">Service Areas</h2>
              <span className="text-xs text-slate-500 ml-auto">
                {isPremium ? 'Unlimited' : '3 remaining'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Add ZIP codes where you provide services. This helps customers find you in local searches.
            </p>
          </div>
          <div className="p-4 sm:p-5">
            <ServiceAreaMap
              serviceAreas={[]} // TODO: Fetch from database
              onAddArea={async (zipCode: string, city?: string, state?: string) => {
                // TODO: Implement service area addition
                console.log('Add service area:', { zipCode, city, state })
              }}
              onRemoveArea={async (id: string) => {
                // TODO: Implement service area removal
                console.log('Remove service area:', id)
              }}
              onSetPrimary={async (id: string) => {
                // TODO: Implement primary service area setting
                console.log('Set primary service area:', id)
              }}
              isPremium={isPremium}
            />
          </div>
        </div>

        {/* Project Gallery */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden">
          <div className="px-4 sm:px-5 py-4 border-b border-zinc-800/60 bg-zinc-950/40">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-4 rounded-full bg-brand-amber" />
              <h2 className="text-sm font-semibold text-slate-200">Project Gallery</h2>
              <span className="text-xs text-slate-500 ml-auto">
                {isPremium ? 'Unlimited' : '6 remaining'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Showcase your work with location tags. This builds trust and improves local search rankings.
            </p>
          </div>
          <div className="p-4 sm:p-5">
            <ProjectGallery
              projects={[]} // TODO: Fetch from database
              onAddProject={async (project: any) => {
                // TODO: Implement project addition
                console.log('Add project:', project)
              }}
              onUpdateProject={async (id: string, updates: any) => {
                // TODO: Implement project update
                console.log('Update project:', id, updates)
              }}
              onDeleteProject={async (id: string) => {
                // TODO: Implement project deletion
                console.log('Delete project:', id)
              }}
              onReorderProjects={async (projectIds: string[]) => {
                // TODO: Implement project reordering
                console.log('Reorder projects:', projectIds)
              }}
              isPremium={isPremium}
            />
          </div>
        </div>

        {/* Benefits Summary */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Expected Results
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2 text-sm">Within 30 Days</h4>
              <ul className="space-y-1 text-xs text-slate-300">
                <li>• Higher rankings in your service areas</li>
                <li>• More "near me" search appearances</li>
                <li>• Increased profile views from local customers</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2 text-sm">Long-term Benefits</h4>
              <ul className="space-y-1 text-xs text-slate-300">
                <li>• Become the go-to contractor in your areas</li>
                <li>• Consistent flow of qualified leads</li>
                <li>• Higher-value projects from local customers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
