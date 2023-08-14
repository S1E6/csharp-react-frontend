import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { ClientProvider } from '../context/ClientProvider'
import { VoitureProvider } from '../context/VoitureProvider'
import { AchatProvider } from '../context/AchatProvider'
import { MarqueProvider } from '../context/MarqueProvider'
import { CategorieProvider } from '../context/CategorieProvider'

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AchatProvider>
            <MarqueProvider>
              <CategorieProvider>
                <ClientProvider>
                  <VoitureProvider>
                    <AppContent />
                  </VoitureProvider>
                </ClientProvider>
              </CategorieProvider>
            </MarqueProvider>
          </AchatProvider>
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
