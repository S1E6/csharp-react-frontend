import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const ClientContext = createContext()

// eslint-disable-next-line react/prop-types
export const ClientProvider = ({ children }) => {
  const [clientData, setClientData] = useState([])
  const [records, setRecords] = useState([])

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = () => {
    axios
      .get('https://localhost:7001/api/Clients')
      .then((response) => {
        setClientData(response.data)
        setRecords(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message)
      })
  }

  const updateClient = (editedClientId, editedValues) => {
    axios
      .put(`https://localhost:7001/api/Clients/${editedClientId}`, editedValues)
      .then((response) => {
        console.log('Client data updated:', response.data)
        fetchAll()
      })
      .catch((error) => {
        console.error('Error updating client data:', error.message)
      })
  }

  const deleteClient = (deleteID) => {
    axios
      .delete(`https://localhost:7001/api/Clients/${deleteID}`)
      .then((response) => {
        console.log('Client data updated:', response.data)
        fetchAll()
      })
      .catch((error) => {
        console.error('Error updating client data:', error.message)
      })
  }

  return (
    <ClientContext.Provider value={{ clientData, records, updateClient, deleteClient }}>
      {children}
    </ClientContext.Provider>
  )
}

export const useClientContext = () => useContext(ClientContext)
