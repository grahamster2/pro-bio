'use client'

import { ServiceAreaMap } from '@/components/ServiceAreaMap'
import { ProjectGallery } from '@/components/ProjectGallery'

interface SettingsLocalSEOProps {
  isPremium: boolean
}

export function SettingsLocalSEO({ isPremium }: SettingsLocalSEOProps) {
  return (
    <>
      {/* Service Areas - Premium Feature */}
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

      {/* Project Gallery - Premium Feature */}
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
    </>
  )
}
