import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CFormInput,
  CFormFeedback,
} from '@coreui/react'
import Swal from 'sweetalert2'
import DataTable from 'react-data-table-component'
import { useClientContext } from '../../context/ClientProvider'

const AddClient = () => {
  const [visible, setVisible] = useState(false)
  const [formData, setFormData] = useState({
    idclient: 'stringify',
    nom: '',
    prenoms: '',
    adresse: '',
    mail: '',
  })
  const [validationErrors, setValidationErrors] = useState({
    nom: false,
    adresse: false,
    mail: false,
  })
  const { addClient } = useClientContext()
  const addClientData = () => {
    const errors = {}

    if (!formData.nom.trim()) {
      errors.nom = true
    }

    if (!formData.adresse.trim()) {
      errors.adresse = true
    }

    if (!formData.mail.trim()) {
      errors.mail = true
    }

    if (Object.keys(errors).length === 0) {
      addClient(formData)
      setVisible(false)
    } else {
      setValidationErrors(errors)
    }
  }

  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>Ajouter</CButton>
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Editer un client</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            type="text"
            label="Nom"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            invalid={validationErrors.nom}
          />
          {validationErrors.nom && (
            <CFormFeedback className="d-block">Nom est requis.</CFormFeedback>
          )}
          <br />
          <CFormInput
            type="text"
            label="Prenoms"
            value={formData.prenoms}
            onChange={(e) => setFormData({ ...formData, prenoms: e.target.value })}
          />
          <br />
          <CFormInput
            type="text"
            label="Adresse"
            value={formData.adresse}
            onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
            invalid={validationErrors.adresse}
          />
          {validationErrors.adresse && (
            <CFormFeedback className="d-block">Adresse est requise.</CFormFeedback>
          )}
          <br />
          <CFormInput
            type="text"
            label="Mail"
            value={formData.mail}
            onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
            invalid={validationErrors.mail}
          />
          {validationErrors.mail && (
            <CFormFeedback className="d-block">Mail est requis.</CFormFeedback>
          )}
          <br />
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setVisible(false)}>
            Annuler
          </CButton>
          <CButton color="success" onClick={addClientData}>
            Enregistrer
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
const Client = () => {
  const { clientData, deleteClient } = useClientContext()
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [visible, setVisible] = useState(false)
  const [editedValues, setEditedValues] = useState(null)
  const { updateClient } = useClientContext()
  const [validationErrors, setValidationErrors] = useState({
    nom: false,
    adresse: false,
    mail: false,
  })

  const updateClientData = () => {
    const errors = {}

    if (!editedValues.nom.trim()) {
      errors.nom = true
    }

    if (!editedValues.adresse.trim()) {
      errors.adresse = true
    }

    if (!editedValues.mail.trim()) {
      errors.mail = true
    }

    if (Object.keys(errors).length === 0) {
      updateClient(editedValues.idclient, editedValues)
      setVisible(false)
    } else {
      setValidationErrors(errors)
    }
  }

  const handleEdit = (row) => {
    setVisible(true)
    setEditedValues(row)
  }

  const handleDelete = (client) => {
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
        text: 'Voulez vous vraiment supprimer ' + client.nom + ' ' + client.prenoms + ' ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui supprimer',
        cancelButtonText: 'Non, annuler',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire('Supprimé', 'Suppression avec succès', 'success')
          deleteClient(client.idclient)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Annulé', 'Supprission annulé :)', 'error')
        }
      })
  }

  const columns = [
    {
      name: 'Numéro Client',
      selector: (row) => row.idclient,
      sortable: true,
    },
    {
      name: 'Nom',
      selector: (row) => row.nom,
    },
    {
      name: 'Prénoms',
      selector: (row) => row.prenoms,
    },
    {
      name: 'Mail',
      selector: (row) => row.mail,
    },
    {
      name: 'Adresse',
      selector: (row) => row.adresse,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <CButton
            color="none"
            onClick={() => {
              setVisible(!visible)
              handleEdit(row)
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

  const handleSearch = (text) => {
    const filteredResults = clientData.filter(
      (client) =>
        client.idclient.toLowerCase().includes(text.toLowerCase()) ||
        client.nom.toLowerCase().includes(text.toLowerCase()) ||
        client.prenoms.toLowerCase().includes(text.toLowerCase()),
    )
    setSearchResults(filteredResults)
  }

  useEffect(() => {
    handleSearch(searchText)
  }, [clientData, searchText])

  return (
    <>
      <CRow>
        <CCol xs={8}>
          <AddClient />
        </CCol>
        <CCol xs={4}>
          <CFormInput
            type="text"
            placeholder="Rechercher"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </CCol>
      </CRow>
      <br />
      <DataTable
        columns={columns}
        data={searchText.length > 0 ? searchResults : clientData}
        fixedHeader
        pagination
        dense={false}
      />
      {editedValues && (
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Editer un client</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              label="Nom"
              value={editedValues.nom}
              onChange={(e) => setEditedValues({ ...editedValues, nom: e.target.value })}
              invalid={validationErrors.nom}
            />
            {validationErrors.nom && (
              <CFormFeedback className="d-block">Nom est requis.</CFormFeedback>
            )}
            <br />
            <CFormInput
              type="text"
              label="Prenoms"
              value={editedValues.prenoms}
              onChange={(e) => setEditedValues({ ...editedValues, prenoms: e.target.value })}
            />
            <br />
            <CFormInput
              type="text"
              label="Adresse"
              value={editedValues.adresse}
              onChange={(e) => setEditedValues({ ...editedValues, adresse: e.target.value })}
              invalid={validationErrors.adresse}
            />
            {validationErrors.adresse && (
              <CFormFeedback className="d-block">Adresse est requise.</CFormFeedback>
            )}
            <br />
            <CFormInput
              type="text"
              label="Mail"
              value={editedValues.mail}
              onChange={(e) => setEditedValues({ ...editedValues, mail: e.target.value })}
              invalid={validationErrors.mail}
            />
            {validationErrors.mail && (
              <CFormFeedback className="d-block">Mail est requis.</CFormFeedback>
            )}
            <br />
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" onClick={() => setVisible(false)}>
              Annuler
            </CButton>
            <CButton color="success" onClick={updateClientData}>
              Enregistrer
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </>
  )
}
export default Client
