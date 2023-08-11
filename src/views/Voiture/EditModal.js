import React, { useEffect, useState } from 'react'
import { useVoitureContext } from '../../context/VoitureProvider'
import axios from 'axios'
import {
  CButton,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import PropTypes from 'prop-types'

export const EditModal = ({ row }) => {
  const [visible, setVisible] = useState(false)
  const [categories, setCategories] = useState([])
  const [marques, setMarques] = useState([])
  const [formData, setFormData] = useState({
    numserie: row.voitures[0].numserie,
    idcategorie: row.voitures[0].categorie.idcategorie,
    idmarque: row.voitures[0].marque.idmarque,
    designvoiture: row.designation,
    prix: row.voitures[0].prix,
    img: row.voitures[0].img,
    type: row.voitures[0].type,
    boitevitesse: row.voitures[0].boitevitesse,
    status: row.voitures[0].status,
    categorie: {
      idcategorie: row.voitures[0].categorie.idcategorie,
      designcat: row.voitures[0].categorie.designcat,
    },
    marque: {
      idmarque: row.voitures[0].marque.idmarque,
      designmarque: row.voitures[0].marque.designmarque,
    },
  })
  const { updateVoiture } = useVoitureContext()

  useEffect(() => {
    axios
      .get('https://localhost:7001/api/Categorie')
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => {
        console.error('Error fetching category data:', error.message)
      })

    axios
      .get('https://localhost:7001/api/Marques')
      .then((response) => {
        setMarques(response.data)
      })
      .catch((error) => {
        console.error('Error fetching marque data:', error.message)
      })
  }, [])

  const saveCar = () => {
    updateVoiture(formData.numserie, formData)
    setVisible(false)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCatInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      idcategorie: value,
      categorie: {
        idcategorie: value,
        designcat: 'string',
      },
    }))
  }

  const handleMarInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      idmarque: value,
      marque: {
        idmarque: value,
        designmarque: 'string',
      },
    }))
  }

  return (
    <>
      <CButton color="none" onClick={() => setVisible(!visible)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
          <path
            fill="currentColor"
            d="M10.733 2.56a1.914 1.914 0 0 1 2.707 2.708l-.733.734l-2.708-2.708l.734-.733Zm-1.44 1.441L3.337 9.955a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.633L5.4 13.06c.243-.08.463-.217.644-.398L12 6.709L9.292 4Z"
          />
        </svg>
      </CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Ajouter une voiture</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            name="designvoiture"
            value={formData.designvoiture}
            onChange={handleInputChange}
            label="Modéle"
            aria-label="default input example"
          />
          <br />
          <CFormSelect
            name="idcategorie"
            value={formData.idcategorie}
            onChange={handleCatInputChange}
            label="Catégorie"
            aria-label="Default select example"
          >
            <option>Choisissez une catégorie</option>
            {categories.map((category) => (
              <option key={category.idcategorie} value={category.idcategorie}>
                {category.designcat}
              </option>
            ))}
          </CFormSelect>
          <br />
          <CFormSelect
            name="idmarque"
            value={formData.idmarque}
            onChange={handleMarInputChange}
            label="Marque"
            aria-label="Default select example"
          >
            <option>Choisissez une marque</option>
            {marques.map((marque) => (
              <option key={marque.idmarque} value={marque.idmarque}>
                {marque.designmarque}
              </option>
            ))}
          </CFormSelect>
          <br />
          <CFormSelect
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            label="Type"
            aria-label="Default select example"
          >
            <option value="Essence">Essence</option>
            <option value="Diesel">Diesel</option>
            <option value="Electrique">Electrique</option>
          </CFormSelect>
          <br />
          <CFormSelect
            name="boitevitesse"
            value={formData.boitevitesse}
            onChange={handleInputChange}
            label="Boîte"
            aria-label="Default select example"
          >
            <option value="Manuelle">Manuelle</option>
            <option value="Automatique">Automatique</option>
          </CFormSelect>
          <br />
          <CFormInput
            type="text"
            name="prix"
            value={formData.prix}
            onChange={handleInputChange}
            label="Prix"
            aria-label="default input example"
          />
          <br />
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setVisible(false)}>
            Annuler
          </CButton>
          <CButton color="success" onClick={saveCar}>
            Enregistrer
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

EditModal.propTypes = {
  row: PropTypes.shape({
    designation: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    voitures: [
      {
        numserie: PropTypes.string.isRequired,
        idcategorie: PropTypes.string.isRequired,
        idmarque: PropTypes.string.isRequired,
        designvoiture: PropTypes.string.isRequired,
        prix: PropTypes.number.isRequired,
        img: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        boitevitesse: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
        categorie: {
          idcategorie: PropTypes.string.isRequired,
          designcat: PropTypes.string.isRequired,
        },
        marque: {
          idmarque: PropTypes.string.isRequired,
          designmarque: PropTypes.string.isRequired,
        },
      },
    ],
  }).isRequired,
}
