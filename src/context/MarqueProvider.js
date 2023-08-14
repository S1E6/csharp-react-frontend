import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const MarqueContext = createContext()

// eslint-disable-next-line react/prop-types
export const MarqueProvider = ({ children }) => {
  const [marqueData, setMarqueData] = useState([])
  const [records, setRecords] = useState([])

  useEffect(() => {
    fetchAllMark()
  }, [])

  const fetchAllMark = () => {
    axios
      .get('https://localhost:7001/api/Marques')
      .then((response) => {
        setMarqueData(response.data)
        setRecords(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message)
      })
    console.log(marqueData)
  }

  const addMarque = (addMark) => {
    axios
      .post(`https://localhost:7001/api/Marques`, addMark)
      .then((response) => {
        console.log('Client data updated:', response.data)
        fetchAllMark()
        Swal.fire('Ajouté', 'Ajout avec succès', 'success')
      })
      .catch((error) => {
        console.error('Error updating achat data:', error.message)
      })
  }

  const updateMarque = (editedMarqueId, editMarque) => {
    axios
      .put(`https://localhost:7001/api/Marques/${editedMarqueId}`, editMarque)
      .then((response) => {
        console.log('Client data updated:', response.data)
        fetchAllMark()
        Swal.fire('Modifié', 'Modification avec succès', 'success')
      })
      .catch((error) => {
        console.error('Error updating achat data:', error.message)
      })
  }

  const deleteMarque = (deleteID) => {
    axios
      .delete(`https://localhost:7001/api/Marques/${deleteID}`)
      .then((response) => {
        console.log('Achat deleted:', response.data)
        fetchAllMark()
      })
      .catch((error) => {
        console.error('Error deleting achat data:', error.message)
      })
  }

  return (
    <MarqueContext.Provider
      value={{ marqueData, records, addMarque, updateMarque, deleteMarque, fetchAllMark }}
    >
      {children}
    </MarqueContext.Provider>
  )
}

export const useMarkContext = () => useContext(MarqueContext)
