'use client'

import { useState } from 'react'
import { MapPin, Plus, X, Search, Check } from 'lucide-react'

interface ServiceArea {
  id: string
  zip_code: string
  city?: string
  state?: string
  is_primary: boolean
}

interface ServiceAreaMapProps {
  serviceAreas: ServiceArea[]
  onAddArea: (zipCode: string, city?: string, state?: string) => void
  onRemoveArea: (id: string) => void
  onSetPrimary: (id: string) => void
  isPremium: boolean
}

export function ServiceAreaMap({ 
  serviceAreas, 
  onAddArea, 
  onRemoveArea, 
  onSetPrimary, 
  isPremium 
}: ServiceAreaMapProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newZipCode, setNewZipCode] = useState('')
  const [newCity, setNewCity] = useState('')
  const [newState, setNewState] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const handleAddServiceArea = async () => {
    if (!newZipCode.trim()) return

    setIsSearching(true)
    try {
      // Simple validation - in production, you'd use a real ZIP code API
      const zipCode = newZipCode.trim()
      if (!/^\d{5}(-\d{4})?$/.test(zipCode)) {
        alert('Please enter a valid ZIP code')
        return
      }

      await onAddArea(zipCode, newCity.trim() || undefined, newState.trim() || undefined)
      
      // Reset form
      setNewZipCode('')
      setNewCity('')
      setNewState('')
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding service area:', error)
      alert('Error adding service area. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const primaryArea = serviceAreas.find(area => area.is_primary)

  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-zinc-800/60 bg-zinc-950/40 flex items-center gap-2.5">
        <div className="w-1.5 h-4 rounded-full bg-brand-amber" />
        <h2 className="text-sm font-semibold text-slate-200">Service Areas</h2>
        <span className="text-xs text-slate-500 ml-auto">
          {serviceAreas.length} {serviceAreas.length === 1 ? 'area' : 'areas'}
        </span>
      </div>

      <div className="p-5">
        {/* Primary Service Area */}
        {primaryArea && (
          <div className="mb-4 p-3 bg-brand-amber/5 border border-brand-amber/20 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-amber" />
                <div>
                  <p className="text-sm font-semibold text-white">Primary Service Area</p>
                  <p className="text-xs text-slate-400">
                    {primaryArea.zip_code}
                    {primaryArea.city && `, ${primaryArea.city}`}
                    {primaryArea.state && `, ${primaryArea.state}`}
                  </p>
                </div>
              </div>
              <Check className="w-4 h-4 text-brand-amber" />
            </div>
          </div>
        )}

        {/* Service Areas List */}
        <div className="space-y-2 mb-4">
          {serviceAreas.map((area) => (
            <div
              key={area.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${
                area.is_primary 
                  ? 'bg-brand-amber/5 border-brand-amber/20' 
                  : 'bg-zinc-800/50 border-zinc-700/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-white">
                    {area.zip_code}
                    {area.city && `, ${area.city}`}
                    {area.state && `, ${area.state}`}
                  </p>
                  {!area.is_primary && (
                    <button
                      onClick={() => onSetPrimary(area.id)}
                      className="text-xs text-brand-amber hover:text-brand-400 transition-colors"
                    >
                      Set as primary
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={() => onRemoveArea(area.id)}
                className="w-6 h-6 rounded-full bg-zinc-700 hover:bg-red-500/20 border border-zinc-600 hover:border-red-500/30 flex items-center justify-center text-zinc-400 hover:text-red-400 transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {serviceAreas.length === 0 && (
            <div className="text-center py-8">
              <MapPin className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
              <p className="text-sm text-slate-400">No service areas added yet</p>
              <p className="text-xs text-slate-500 mt-1">
                Add ZIP codes where you provide services
              </p>
            </div>
          )}
        </div>

        {/* Add Service Area Form */}
        {showAddForm ? (
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white">Add Service Area</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="w-6 h-6 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  value={newZipCode}
                  onChange={(e) => setNewZipCode(e.target.value)}
                  placeholder="12345"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-amber/20 focus:border-brand-amber/50"
                  disabled={isSearching}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="City"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-amber/20 focus:border-brand-amber/50"
                    disabled={isSearching}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    placeholder="State"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-amber/20 focus:border-brand-amber/50"
                    disabled={isSearching}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleAddServiceArea}
                disabled={isSearching || !newZipCode.trim()}
                className="flex-1 py-2 bg-brand-amber hover:bg-amber-400 text-zinc-950 rounded-lg font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? 'Adding...' : 'Add Area'}
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg font-medium text-sm transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAddForm(true)}
            disabled={!isPremium && serviceAreas.length >= 3}
            className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {isPremium ? 'Add Service Area' : 
             serviceAreas.length >= 3 ? 'Upgrade to Add More Areas' : 
             `Add Area (${3 - serviceAreas.length} free remaining)`}
          </button>
        )}

        {!isPremium && (
          <div className="mt-3 text-xs text-slate-500 text-center">
            <p>Free users can add up to 3 service areas</p>
            <p>Upgrade to Premium for unlimited service areas</p>
          </div>
        )}

        {/* SEO Benefits Info */}
        <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-2">
            <Search className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-blue-400 mb-1">SEO Boost</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Service areas help you rank higher in local Google searches for those ZIP codes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
