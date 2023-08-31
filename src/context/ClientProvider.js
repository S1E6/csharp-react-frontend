import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useAchatContext } from './AchatProvider'
import { useVoitureContext } from './VoitureProvider'

const ClientContext = createContext()

// eslint-disable-next-line react/prop-types
export const ClientProvider = ({ children }) => {
  const [clientData, setClientData] = useState([])
  const [records, setRecords] = useState([])

  useEffect(() => {
    fetchAllClient()
  }, [])

  const fetchAllClient = () => {
    axios
      .get('http://localhost:7001/api/Clients')
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
      .put(`http://localhost:7001/api/Clients/${editedClientId}`, editedValues)
      .then((response) => {
        console.log('Client data updated:', response.data)
        fetchAllClient()
        Swal.fire('Modifié', 'Modification avec succès', 'success')
      })
      .catch((error) => {
        console.error('Error updating client data:', error.message)
      })
  }

  const addClient = (newClient) => {
    axios
      .post('http://localhost:7001/api/Clients', newClient)
      .then((response) => {
        console.log('New car added:', response.data)
        fetchAllClient()
        Swal.fire(
          'Ajouté',
          response.data.nom + ' ' + response.data.prenoms + ' ajouté avec succès',
          'success',
        )
      })
      .catch((error) => {
        console.error('Error adding new car:', error.message)
      })
  }

  const deleteClient = (deleteID) => {
    axios
      .delete(`http://localhost:7001/api/Clients/${deleteID}`)
      .then((response) => {
        console.log('Client data updated:', response.data)
        fetchAllClient()
      })
      .catch((error) => {
        console.error('Error updating client data:', error.message)
      })
  }

  return (
    <ClientContext.Provider value={{ clientData, records, updateClient, deleteClient, addClient }}>
      {children}
    </ClientContext.Provider>
  )
}

export const useClientContext = () => useContext(ClientContext)
