import React, { useState } from 'react'
import {
  CButton,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CAlert,
} from '@coreui/react'
import { useMarkContext } from '../../../context/MarqueProvider'

export const AddMarque = () => {
  const [visible, setVisible] = useState(false)
  const [formData, setFormData] = useState({
    idmarque: '',
    designmarque: '',
  })
  const [validationError, setValidationError] = useState(false) // State for showing validation error
  const { addMarque } = useMarkContext()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const saveChange = (event) => {
    if (formData.designmarque.trim() === '') {
      setValidationError(true)
    } else {
      addMarque(formData)
      setVisible(false)
    }
  }

  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>Ajouter</CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Ajouter une Marque</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {validationError && <CAlert color="danger">Le champ Marque est requis.</CAlert>}
          <CFormInput
            type="text"
            name="designmarque"
            value={formData.designmarque}
            onChange={handleInputChange}
            label="Marque"
            aria-label="default input example"
            required
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
