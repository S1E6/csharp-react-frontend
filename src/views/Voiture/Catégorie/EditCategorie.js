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
import PropTypes from 'prop-types'
import { useCategorieContext } from '../../../context/CategorieProvider'

export const EditCat = ({ row }) => {
  const [visible, setVisible] = useState(false)
  const [formData, setFormData] = useState({
    idcategorie: row.idcategorie,
    designcat: row.designcat,
  })
  const { updateCategorie } = useCategorieContext()

  const saveChange = () => {
    updateCategorie(formData.idcategorie, formData)
    setVisible(false)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
          <CModalTitle>Editer un marque</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            name="designcat"
            value={formData.designcat}
            onChange={handleInputChange}
            label="Marque"
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

EditCat.propTypes = {
  row: PropTypes.shape({
    idcategorie: PropTypes.string.isRequired,
    designcat: PropTypes.number.isRequired,
  }).isRequired,
}
