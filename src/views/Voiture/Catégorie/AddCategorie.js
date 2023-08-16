import React, { useState } from 'react'
import {
  CButton,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CAlert, // Import the CAlert component
} from '@coreui/react'
import { useCategorieContext } from '../../../context/CategorieProvider'

export const AddCategorie = () => {
  const [visible, setVisible] = useState(false)
  const [formData, setFormData] = useState({
    idcategorie: '',
    designcat: '',
  })
  const [validationError, setValidationError] = useState(false) // State for validation error
  const { addCategorie } = useCategorieContext()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const saveChange = () => {
    if (!formData.designcat) {
      setValidationError(true)
    } else {
      setValidationError(false)
      addCategorie(formData)
      setVisible(false)
    }
  }

  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>Ajouter</CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Ajouter une catégorie</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {validationError && ( // Display the error message if validationError is true
            <CAlert color="danger">Le champ Catégorie est requis.</CAlert>
          )}
          <CFormInput
            type="text"
            name="designcat"
            value={formData.designcat}
            onChange={handleInputChange}
            label="Catégorie"
            aria-label="default input example"
          />
          <br />
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setVisible(false)}>
            Annuler
          </CButton>
          <CButton color="success" onClick={saveChange}>
            Enregistrer
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
