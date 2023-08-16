import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useAchatContext } from './AchatProvider'

const VoitureContext = createContext()

// eslint-disable-next-line react/prop-types
export const VoitureProvider = ({ children }) => {
  const [voitureData, setVoitureData] = useState([])
  const [records, setRecords] = useState([])
  const { fetchAll } = useAchatContext()

  useEffect(() => {
    fetchAllCar()
  }, [])

  const fetchAllCar = () => {
    axios
      .get('https://localhost:7001/api/Voiture')
      .then((response) => {
        setVoitureData(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message)
      })
    axios
      .get('https://localhost:7001/api/Voiture/vendue')
      .then((response) => {
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
        fetchAllCar()
        Swal.fire('Ajouté', response.data.designvoiture + ' ajouté avec succès', 'success')
      })
      .catch((error) => {
        console.error('Error adding new car:', error.message)
      })
  }

  const addVoitureNewCategorie = (newVoiture) => {
    axios
      .post('https://localhost:7001/api/Categorie', newVoiture.categorie)
      .then((response) => {
        console.log('New category added:', response.data)
        newVoiture.categorie.idcategorie = response.data.idcategorie
        newVoiture.categorie.designcat = response.data.designcat

        axios
          .post('https://localhost:7001/api/Voiture', newVoiture)
          .then((response) => {
            console.log('New car added:', response.data)
            fetchAllCar()
            Swal.fire('Ajouté', response.data.designvoiture + ' ajouté avec succès', 'success')
          })
          .catch((error) => {
            console.error('Error adding new car:', error.message)
          })
      })
      .catch((error) => {
        console.error('Error adding new category:', error.message)
      })
  }

  const addVoitureNewMarque = (newVoiture) => {
    axios
      .post('https://localhost:7001/api/Marques', newVoiture.marque)
      .then((response) => {
        console.log('New category added:', response.data)
        newVoiture.marque.idmarque = response.data.idmarque
        newVoiture.marque.designmarque = response.data.designmarque

        axios
          .post('https://localhost:7001/api/Voiture', newVoiture)
          .then((response) => {
            console.log('New car added:', response.data)
            fetchAllCar()
            Swal.fire('Ajouté', response.data.designvoiture + ' ajouté avec succès', 'success')
          })
          .catch((error) => {
            console.error('Error adding new car:', error.message)
          })
      })
      .catch((error) => {
        console.error('Error adding new category:', error.message)
      })
  }

  const addVoitureNewCategorieAndMarque = (newVoiture) => {
    axios
      .post('https://localhost:7001/api/Marques', newVoiture.marque)
      .then((response) => {
        console.log('New category added:', response.data)
        newVoiture.marque.idmarque = response.data.idmarque
        newVoiture.marque.designmarque = response.data.designmarque

        axios
          .post('https://localhost:7001/api/Categorie', newVoiture.categorie)
          .then((response) => {
            console.log('New category added:', response.data)
            newVoiture.categorie.idcategorie = response.data.idcategorie
            newVoiture.categorie.designcat = response.data.designcat

            axios
              .post('https://localhost:7001/api/Voiture', newVoiture)
              .then((response) => {
                console.log('New car added:', response.data)
                fetchAllCar()
                Swal.fire('Ajouté', response.data.designvoiture + ' ajouté avec succès', 'success')
              })
              .catch((error) => {
                console.error('Error adding new car:', error.message)
              })
          })
          .catch((error) => {
            console.error('Error adding new category:', error.message)
          })
      })
      .catch((error) => {
        console.error('Error adding new category:', error.message)
      })
  }

  const updateVoiture = (editedVoitureId, editedValues) => {
    axios
      .put(`https://localhost:7001/api/Voiture/${editedVoitureId}`, editedValues)
      .then((response) => {
        console.log('Client data updated:', response.data)
        fetchAllCar()
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
        fetchAllCar()
      })
      .catch((error) => {
        console.error('Error updating client data:', error.message)
      })
  }

  const buyCar = (buyData) => {
    axios
      .get(`https://localhost:7001/api/Clients/${buyData.client.idclient}`)
      .then((response) => {
        const clientData = response.data
        axios
          .post('https://localhost:7001/api/Acheters', buyData)
          .then((response) => {
            console.log('New car added:', response.data)
            axios
              .put(
                `https://localhost:7001/api/Voiture/${buyData.voiture.numserie}`,
                buyData.voiture,
              )
              .then((response) => {
                console.log('Client data updated:', response.data)
                fetchAllCar()
                fetchAll()
                console.log('clientData', clientData)
                const emailData = {
                  adresseDestinataire: clientData[0].mail,
                  somme: buyData.somme,
                  dateAchat: buyData.dateAchat,
                  client: clientData[0].nom + ' ' + clientData[0].prenoms,
                  voiture: buyData.voiture.designvoiture,
                }
                console.log('email data', emailData)
                axios
                  .post('https://localhost:7001/api/Email/send', emailData)
                  .then((response) => {
                    console.log('Email sent:', response.data)
                    Swal.fire('Ajouté', 'Achat effectué avec succès et mail envoyé', 'success')
                  })
                  .catch((error) => {
                    console.error('Error sending email:', error.message)
                  })

                Swal.fire('Ajouté', 'Achat effectué avec succès', 'success')
              })
              .catch((error) => {
                console.error('Error updating client data:', error.message)
              })
          })
          .catch((error) => {
            console.error('Error adding new car:', error.message)
          })
      })
      .catch((error) => {
        console.error('Error fetching client data:', error.message)
      })
  }

  return (
    <VoitureContext.Provider
      value={{
        voitureData,
        records,
        updateVoiture,
        addVoiture,
        deleteVoiture,
        buyCar,
        addVoitureNewCategorie,
        addVoitureNewMarque,
        addVoitureNewCategorieAndMarque,
      }}
    >
      {children}
    </VoitureContext.Provider>
  )
}

export const useVoitureContext = () => useContext(VoitureContext)
