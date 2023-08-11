import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

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
        Swal.fire('Modifié', 'Modification avec succès', 'success')
      })
      .catch((error) => {
        console.error('Error updating client data:', error.message)
      })
  }

  const addClient = (newClient) => {
    axios
      .post('https://localhost:7001/api/Clients', newClient)
      .then((response) => {
        console.log('New car added:', response.data)
        fetchAll()
        Swal.fire(
          'Ajouté',
          response.data.nom + response.data.prenoms + ' ajouté avec succès',
          'success',
        )
      })
      .catch((error) => {
        console.error('Error adding new car:', error.message)
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

  const buyCar = (buyData) => {
    axios
      .post('https://localhost:7001/api/Acheters', buyData)
      .then((response) => {
        console.log('New car added:', response.data)
        fetchAll()
        Swal.fire('Ajouté', 'Achat effectué avec succès', 'success')
      })
      .catch((error) => {
        console.error('Error adding new car:', error.message)
      })
  }

  return (
    <ClientContext.Provider
      value={{ clientData, records, updateClient, deleteClient, addClient, buyCar }}
    >
      {children}
    </ClientContext.Provider>
  )
}

export const useClientContext = () => useContext(ClientContext)
