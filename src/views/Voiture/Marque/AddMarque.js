import React, { useState } from 'react'
import {
  CButton,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { useMarkContext } from '../../../context/MarqueProvider'

export const AddMarque = () => {
  const [visible, setVisible] = useState(false)
  const [formData, setFormData] = useState({
    idmarque: '',
    designmarque: '',
  })
  const { addMarque } = useMarkContext()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
  const saveChange = (event) => {
    addMarque(formData)
    setVisible(false)
  }

  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>Ajouter</CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Ajouter une voiture</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            name="designmarque"
            value={formData.designmarque}
            onChange={handleInputChange}
            label="Modéle"
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
