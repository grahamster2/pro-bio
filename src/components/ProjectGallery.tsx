'use client'

import { useState } from 'react'
import { Image as ImageIcon, MapPin, Plus, X, Star, Calendar, Edit2, Trash2 } from 'lucide-react'

interface Project {
  id: string
  image_url: string
  title?: string
  description?: string
  city?: string
  state?: string
  zip_code?: string
  project_date?: string
  is_featured: boolean
  sort_order: number
}

interface ProjectGalleryProps {
  projects: Project[]
  onAddProject: (project: Omit<Project, 'id' | 'sort_order'>) => void
  onUpdateProject: (id: string, updates: Partial<Project>) => void
  onDeleteProject: (id: string) => void
  onReorderProjects: (projectIds: string[]) => void
  isPremium: boolean
}

export function ProjectGallery({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
  onReorderProjects,
  isPremium
}: ProjectGalleryProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProject, setEditingProject] = useState<string | null>(null)
  const [newProject, setNewProject] = useState({
    image_url: '',
    title: '',
    description: '',
    city: '',
    state: '',
    zip_code: '',
    project_date: '',
    is_featured: false
  })

  const handleAddProject = async () => {
    if (!newProject.image_url.trim()) {
      alert('Please add an image URL')
      return
    }

    await onAddProject({
      ...newProject,
      image_url: newProject.image_url.trim(),
      title: newProject.title.trim() || undefined,
      description: newProject.description.trim() || undefined,
      city: newProject.city.trim() || undefined,
      state: newProject.state.trim() || undefined,
      zip_code: newProject.zip_code.trim() || undefined,
      project_date: newProject.project_date || undefined,
      is_featured: newProject.is_featured
    })

    // Reset form
    setNewProject({
      image_url: '',
      title: '',
      description: '',
      city: '',
      state: '',
      zip_code: '',
      project_date: '',
      is_featured: false
    })
    setShowAddForm(false)
  }

  const handleUpdateProject = async (id: string, updates: Partial<Project>) => {
    await onUpdateProject(id, updates)
    setEditingProject(null)
  }

  const featuredProjects = projects.filter(p => p.is_featured)
  const regularProjects = projects.filter(p => !p.is_featured)

  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-zinc-800/60 bg-zinc-950/40 flex items-center gap-2.5">
        <div className="w-1.5 h-4 rounded-full bg-brand-amber" />
        <h2 className="text-sm font-semibold text-slate-200">Project Gallery</h2>
        <span className="text-xs text-slate-500 ml-auto">
          {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </span>
      </div>

      <div className="p-5">
        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-brand-amber mb-3 flex items-center gap-2">
              <Star className="w-3 h-3" />
              Featured Projects
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={() => setEditingProject(project.id)}
                  onDelete={() => onDeleteProject(project.id)}
                  onUpdate={(updates) => handleUpdateProject(project.id, updates)}
                  isEditing={editingProject === project.id}
                  isPremium={isPremium}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Projects */}
        {regularProjects.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-slate-400 mb-3">All Projects</h3>
            <div className="grid grid-cols-2 gap-3">
              {regularProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={() => setEditingProject(project.id)}
                  onDelete={() => onDeleteProject(project.id)}
                  onUpdate={(updates) => handleUpdateProject(project.id, updates)}
                  isEditing={editingProject === project.id}
                  isPremium={isPremium}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-8">
            <ImageIcon className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
            <p className="text-sm text-slate-400">No projects added yet</p>
            <p className="text-xs text-slate-500 mt-1">
              Showcase your best work with location tags
            </p>
          </div>
        )}

        {/* Add Project Button */}
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            disabled={!isPremium && projects.length >= 6}
            className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {isPremium ? 'Add Project' : 
             projects.length >= 6 ? 'Upgrade to Add More Projects' : 
             `Add Project (${6 - projects.length} free remaining)`}
          </button>
        )}

        {/* Add Project Form */}
        {showAddForm && (
          <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-white">Add Project</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="w-6 h-6 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  value={newProject.image_url}
                  onChange={(e) => setNewProject(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-amber/20 focus:border-brand-amber/50"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Kitchen Remodel"
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-amber/20 focus:border-brand-amber/50"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-400 block mb-1">
                  Description
                </label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the project..."
                  rows={3}
                  className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-amber/20 focus:border-brand-amber/50 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={newProject.city}
                    onChange={(e) => setNewProject(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Dallas"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-amber/20 focus:border-brand-amber/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={newProject.state}
                    onChange={(e) => setNewProject(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="TX"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-amber/20 focus:border-brand-amber/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={newProject.zip_code}
                    onChange={(e) => setNewProject(prev => ({ ...prev, zip_code: e.target.value }))}
                    placeholder="75201"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-amber/20 focus:border-brand-amber/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400 block mb-1">
                    Project Date
                  </label>
                  <input
                    type="date"
                    value={newProject.project_date}
                    onChange={(e) => setNewProject(prev => ({ ...prev, project_date: e.target.value }))}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-amber/20 focus:border-brand-amber/50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newProject.is_featured}
                  onChange={(e) => setNewProject(prev => ({ ...prev, is_featured: e.target.checked }))}
                  className="w-4 h-4 text-brand-amber bg-zinc-900 border-zinc-700 rounded focus:ring-brand-amber/20"
                />
                <label htmlFor="featured" className="text-xs font-medium text-slate-300">
                  Feature this project
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleAddProject}
                disabled={!newProject.image_url.trim()}
                className="flex-1 py-2 bg-brand-amber hover:bg-amber-400 text-zinc-950 rounded-lg font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Project
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg font-medium text-sm transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {!isPremium && (
          <div className="mt-3 text-xs text-slate-500 text-center">
            <p>Free users can add up to 6 projects</p>
            <p>Upgrade to Premium for unlimited projects</p>
          </div>
        )}

        {/* SEO Benefits Info */}
        <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-blue-400 mb-1">Local SEO Boost</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Projects with locations help you rank higher in local searches for those areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  onEdit: () => void
  onDelete: () => void
  onUpdate: (updates: Partial<Project>) => void
  isEditing: boolean
  isPremium: boolean
}

function ProjectCard({ project, onEdit, onDelete, onUpdate, isEditing, isPremium }: ProjectCardProps) {
  const [editForm, setEditForm] = useState({
    title: project.title || '',
    description: project.description || '',
    city: project.city || '',
    state: project.state || '',
    zip_code: project.zip_code || '',
    is_featured: project.is_featured
  })

  const handleSave = () => {
    onUpdate(editForm)
  }

  const handleCancel = () => {
    setEditForm({
      title: project.title || '',
      description: project.description || '',
      city: project.city || '',
      state: project.state || '',
      zip_code: project.zip_code || '',
      is_featured: project.is_featured
    })
    onEdit()
  }

  return (
    <div className="relative group">
      <div className="aspect-square rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
        <img
          src={project.image_url}
          alt={project.title || 'Project'}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Overlay with location info */}
        {(project.city || project.state) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <div className="flex items-center gap-1 text-white">
              <MapPin className="w-3 h-3" />
              <span className="text-xs font-medium">
                {[project.city, project.state].filter(Boolean).join(', ')}
              </span>
            </div>
          </div>
        )}

        {/* Featured badge */}
        {project.is_featured && (
          <div className="absolute top-2 left-2 bg-brand-amber text-zinc-950 px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-bold">Featured</span>
          </div>
        )}

        {/* Edit/Delete buttons */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <button
            onClick={onEdit}
            className="w-7 h-7 rounded-full bg-zinc-900/80 backdrop-blur-sm border border-zinc-700 flex items-center justify-center text-white hover:bg-zinc-800 transition-all"
          >
            <Edit2 className="w-3 h-3" />
          </button>
          <button
            onClick={onDelete}
            className="w-7 h-7 rounded-full bg-red-500/80 backdrop-blur-sm border border-red-500/30 flex items-center justify-center text-white hover:bg-red-500 transition-all"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="absolute inset-0 bg-zinc-900/95 backdrop-blur-sm rounded-xl p-3 border border-zinc-700">
          <div className="space-y-2">
            <input
              type="text"
              value={editForm.title}
              onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Project title"
              className="w-full px-2 py-1 bg-zinc-800 border border-zinc-600 rounded text-xs text-white placeholder:text-zinc-500"
            />
            
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={editForm.city}
                onChange={(e) => setEditForm(prev => ({ ...prev, city: e.target.value }))}
                placeholder="City"
                className="w-full px-2 py-1 bg-zinc-800 border border-zinc-600 rounded text-xs text-white placeholder:text-zinc-500"
              />
              <input
                type="text"
                value={editForm.state}
                onChange={(e) => setEditForm(prev => ({ ...prev, state: e.target.value }))}
                placeholder="State"
                className="w-full px-2 py-1 bg-zinc-800 border border-zinc-600 rounded text-xs text-white placeholder:text-zinc-500"
              />
            </div>

            {isPremium && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editForm.is_featured}
                  onChange={(e) => setEditForm(prev => ({ ...prev, is_featured: e.target.checked }))}
                  className="w-3 h-3 text-brand-amber bg-zinc-800 border-zinc-600 rounded"
                />
                <label className="text-xs text-slate-300">Featured</label>
              </div>
            )}

            <div className="flex gap-1">
              <button
                onClick={handleSave}
                className="flex-1 py-1 bg-brand-amber hover:bg-amber-400 text-zinc-950 rounded text-xs font-semibold transition-all"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 py-1 bg-zinc-700 hover:bg-zinc-600 text-white rounded text-xs font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
