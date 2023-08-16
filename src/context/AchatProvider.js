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

  const deleteAchat = (achat) => {
    console.log(achat)
    const newVoiture = {
      numserie: achat.voiture.numserie || 'string',
      idcategorie: achat.voiture.idcategorie || 'string',
      idmarque: achat.voiture.idmarque || 'string',
      designvoiture: achat.voiture.designvoiture || 'string',
      prix: achat.voiture.prix || 0,
      img: achat.voiture.img || 'string',
      type: achat.voiture.type || 'string',
      boitevitesse: achat.voiture.boitevitesse || 'string',
      status: 0,
      categorie: {
        idcategorie: achat.voiture.idcategorie || 'string',
        designcat: achat.voiture.categorie?.designcat || 'string',
      },
      marque: {
        idmarque: achat.voiture.idmarque || 'string',
        designmarque: achat.voiture.marque?.designmarque || 'string',
      },
    }
    axios
      .put(`https://localhost:7001/api/Voiture/${achat.voiture.numserie}`, newVoiture)
      .then((response) => {
        console.log('Client data updated:', response.data)
        axios
          .delete(`https://localhost:7001/api/Acheters/${achat.numachat}`)
          .then((response) => {
            console.log('Achat deleted:', response.data)
            fetchAll()
            Swal.fire('Annulé', 'Achat annulé avec succès', 'success')
          })
          .catch((error) => {
            console.error('Error deleting achat data:', error.message)
          })
      })
      .catch((error) => {
        console.error('Error updating client data:', error.message)
      })
  }

  return (
    <AchatContext.Provider value={{ achatData, records, updateAchat, deleteAchat, fetchAll }}>
      {children}
    </AchatContext.Provider>
  )
}

export const useAchatContext = () => useContext(AchatContext)
