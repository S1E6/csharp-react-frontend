import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const AchatContext = createContext()

// eslint-disable-next-line react/prop-types
export const AchatProvider = ({ children }) => {
  const [achatData, setAchatData] = useState([])
  const [records, setRecords] = useState([])

  useEffect(() => {
    fetchAll()
  }, [])

  const fetchAll = () => {
    axios
      .get('https://localhost:7001/api/Acheters')
      .then((response) => {
        setAchatData(response.data)
        setRecords(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message)
      })
    console.log(achatData)
  }

  const updateAchat = (editedAchatId, editAchat) => {
    axios
      .put(`https://localhost:7001/api/Acheters/${editedAchatId}`, editAchat)
      .then((response) => {
        console.log('Client data updated:', response.data)
        fetchAll()
        Swal.fire('Modifié', 'Modification avec succès', 'success')
      })
      .catch((error) => {
        console.error('Error updating achat data:', error.message)
      })
  }

  const deleteAchat = (deleteID) => {
    axios
      .delete(`https://localhost:7001/api/Acheters/${deleteID}`)
      .then((response) => {
        console.log('Achat deleted:', response.data)
        fetchAll()
      })
      .catch((error) => {
        console.error('Error deleting achat data:', error.message)
      })
  }

  return (
    <AchatContext.Provider value={{ achatData, records, updateAchat, deleteAchat, fetchAll }}>
      {children}
    </AchatContext.Provider>
  )
}

export const useAchatContext = () => useContext(AchatContext)
