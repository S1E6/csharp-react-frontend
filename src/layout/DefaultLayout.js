import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { ClientProvider } from '../context/ClientProvider'
import { VoitureProvider } from '../context/VoitureProvider'
import { AchatProvider } from '../context/AchatProvider'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AchatProvider>
            <VoitureProvider>
              <ClientProvider>
                <AppContent />
              </ClientProvider>
            </VoitureProvider>
          </AchatProvider>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
