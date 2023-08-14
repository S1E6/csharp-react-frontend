import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

const CategorieContext = createContext()

// eslint-disable-next-line react/prop-types
export const CategorieProvider = ({ children }) => {
  const [categorieData, setCategorieData] = useState([])
  const [records, setRecords] = useState([])

  useEffect(() => {
    fetchAllCat()
  }, [])

  const fetchAllCat = () => {
    axios
      .get('https://localhost:7001/api/Categorie')
      .then((response) => {
        setCategorieData(response.data)
        setRecords(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message)
      })
    console.log(categorieData)
  }

  const addCategorie = (addMark) => {
    axios
      .post(`https://localhost:7001/api/Categorie`, addMark)
      .then((response) => {
        console.log('Client data updated:', response.data)
        fetchAllCat()
        Swal.fire('Ajouté', 'Ajout avec succès', 'success')
      })
      .catch((error) => {
        console.error('Error updating achat data:', error.message)
      })
  }

  const updateCategorie = (editedMarqueId, editMarque) => {
    axios
      .put(`https://localhost:7001/api/Categorie/${editedMarqueId}`, editMarque)
      .then((response) => {
        console.log('Client data updated:', response.data)
        fetchAllCat()
        Swal.fire('Modifié', 'Modification avec succès', 'success')
      })
      .catch((error) => {
        console.error('Error updating achat data:', error.message)
      })
  }

  const deleteCategorie = (deleteID) => {
    axios
      .delete(`https://localhost:7001/api/Categorie/${deleteID}`)
      .then((response) => {
        console.log('Achat deleted:', response.data)
        fetchAllCat()
      })
      .catch((error) => {
        console.error('Error deleting achat data:', error.message)
      })
  }

  return (
    <CategorieContext.Provider
      value={{ categorieData, records, addCategorie, updateCategorie, deleteCategorie }}
    >
      {children}
    </CategorieContext.Provider>
  )
}

export const useCategorieContext = () => useContext(CategorieContext)
