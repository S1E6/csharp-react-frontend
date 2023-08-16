import Swal from 'sweetalert2'
import {
  CAlert,
  CButton,
  CCol,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'
import DataTable from 'react-data-table-component'
import React, { useState } from 'react'
import { useCategorieContext } from '../../../context/CategorieProvider'
import { AddCategorie } from './AddCategorie'

const Categorie = () => {
  const { categorieData, deleteCategorie } = useCategorieContext()
  const [visible, setVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleDelete = (cat) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    })
    swalWithBootstrapButtons
      .fire({
        title: 'Etes vous sûr?',
        text: 'Voulez vous vraiment supprimer le' + cat.idcategorie + ' ' + cat.designcat + ' ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui supprimer',
        cancelButtonText: 'Non, annuler',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire('Supprimé', 'Suppression avec succès', 'success')
          deleteCategorie(cat.idcategorie)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Annulé', 'Supprission annulé :)', 'error')
        }
      })
  }

  const [formData, setFormData] = useState()
  const [validationError, setValidationError] = useState(false) // State for validation error
  const { updateCategorie } = useCategorieContext()

  const saveChange = () => {
    if (!formData.designcat) {
      setValidationError(true)
    } else {
      setValidationError(false)
      updateCategorie(formData.idcategorie, formData)
      setVisible(false)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const columns = [
    {
      name: 'Identifiant',
      selector: (row) => row.idcategorie,
      sortable: true,
    },
    {
      name: 'Catégorie',
      selector: (row) => row.designcat,
    },
    {
      name: 'Actions',
      width: '200px',
      cell: (row) => (
        <div>
          <CButton
            color="none"
            onClick={() => {
              setFormData({
                idcategorie: row.idcategorie,
                designcat: row.designcat,
              })
              setVisible(!visible)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
              <path
                fill="currentColor"
                d="M10.733 2.56a1.914 1.914 0 0 1 2.707 2.708l-.733.734l-2.708-2.708l.734-.733Zm-1.44 1.441L3.337 9.955a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.633L5.4 13.06c.243-.08.463-.217.644-.398L12 6.709L9.292 4Z"
              />
            </svg>
          </CButton>
          <CButton color="none" onClick={() => handleDelete(row)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none">
                <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                <path
                  fill="currentColor"
                  d="M20 5a1 1 0 1 1 0 2h-1l-.003.071l-.933 13.071A2 2 0 0 1 16.069 22H7.93a2 2 0 0 1-1.995-1.858l-.933-13.07A1.017 1.017 0 0 1 5 7H4a1 1 0 0 1 0-2h16Zm-6-3a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2h4Z"
                />
              </g>
            </svg>
          </CButton>
        </div>
      ),
      ignoreRowClick: true,
    },
  ]

  const filteredData = categorieData.filter((row) =>
    row.designcat.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <CRow>
        <CCol xs={8}>
          <AddCategorie />
        </CCol>
        <CCol xs={4}>
          <CFormInput
            type="text"
            placeholder="Rechercher"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </CCol>
        <br />
        <br />
        <DataTable columns={columns} data={filteredData} fixedHeader pagination dense={false} />
        {visible && (
          <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>
              <CModalTitle>Editer un marque</CModalTitle>
            </CModalHeader>
            <CModalBody>
              {validationError && ( // Display the error message if validationError is true
                <CAlert color="danger">Le champ Marque est requis.</CAlert>
              )}
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
        )}
      </CRow>
    </>
  )
}
export default Categorie
