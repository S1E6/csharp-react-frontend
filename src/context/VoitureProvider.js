import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const VoitureContext = createContext()

// eslint-disable-next-line react/prop-types
export const VoitureProvider = ({ children }) => {
  const [voitureData, setVoitureData] = useState([])
  const [records, setRecords] = useState([])

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = () => {
    axios
      .get('https://localhost:7001/api/Voiture')
      .then((response) => {
        setVoitureData(response.data)
        setRecords(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message)
      })
  }

  const addVoiture = (newVoiture) => {
    axios
      .post('https://localhost:7001/api/Voiture', newVoiture)
      .then((response) => {
        console.log('New car added:', response.data)
        fetchAll()
        Swal.fire('Ajouté', response.data.designvoiture + ' ajouté avec succès', 'success')
      })
      .catch((error) => {
        console.error('Error adding new car:', error.message)
      })
  }

  const updateVoiture = (editedVoitureId, editedValues) => {
    axios
      .put(`https://localhost:7001/api/Voiture/${editedVoitureId}`, editedValues)
      .then((response) => {
        console.log('Client data updated:', response.data)
        fetchAll()
        Swal.fire('Modifié', 'Modification avec succès', 'success')
      })
      .catch((error) => {
        console.error('Error updating client data:', error.message)
      })
  }

  const deleteVoiture = (deleteId) => {
    axios
      .delete(`https://localhost:7001/api/Voiture/${deleteId}`)
      .then((response) => {
        console.log('Client data updated:', response.data)
        fetchAll()
      })
      .catch((error) => {
        console.error('Error updating client data:', error.message)
      })
  }

  return (
    <VoitureContext.Provider
      value={{ voitureData, records, updateVoiture, addVoiture, deleteVoiture }}
    >
      {children}
    </VoitureContext.Provider>
  )
}

export const useVoitureContext = () => useContext(VoitureContext)
