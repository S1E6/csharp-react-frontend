import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { ClientProvider } from '../context/ClientProvider'
import { VoitureProvider } from '../context/VoitureProvider'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <ClientProvider>
            <VoitureProvider>
              <AppContent />
            </VoitureProvider>
          </ClientProvider>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
