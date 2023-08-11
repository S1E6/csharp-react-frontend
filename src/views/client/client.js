import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover,
  CRow,
  CTooltip,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
} from '@coreui/react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import PropTypes from 'prop-types'
import { useClientContext } from '../../context/ClientProvider'
const VerticallyCentered = ({ row }) => {
  const [visible, setVisible] = useState(false)
  const [editedValues, setEditedValues] = useState({
    idclient: row.idclient,
    nom: row.nom,
    prenoms: row.prenoms,
    adresse: row.adresse,
    mail: row.mail,
  })
  const { updateClient } = useClientContext()
  const updateClientData = () => {
    updateClient(editedValues.idclient, editedValues)
  }

  return (
    <>
      <CButton color="none" onClick={() => setVisible(!visible)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
          <path
            fill="currentColor"
            d="M10.733 2.56a1.914 1.914 0 0 1 2.707 2.708l-.733.734l-2.708-2.708l.734-.733Zm-1.44 1.441L3.337 9.955a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.633L5.4 13.06c.243-.08.463-.217.644-.398L12 6.709L9.292 4Z"
          />
        </svg>
      </CButton>
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
          />
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
          />
          <br />
          <CFormInput
            type="text"
            label="Mail"
            value={editedValues.mail}
            onChange={(e) => setEditedValues({ ...editedValues, mail: e.target.value })}
          />
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
    </>
  )
}

VerticallyCentered.propTypes = {
  row: PropTypes.shape({
    idclient: PropTypes.string.isRequired,
    nom: PropTypes.string.isRequired,
    prenoms: PropTypes.string.isRequired,
    mail: PropTypes.string.isRequired,
    adresse: PropTypes.string.isRequired,
  }).isRequired,
}
const Client = () => {
  const { clientData, deleteClient } = useClientContext()

  const handleDelete = (clientId) => {
    console.log(`Delete client with ID: ${clientId}`)
  }

  const columns = [
    {
      name: 'Numéro Client',
      selector: (row) => row.idclient,
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
          <VerticallyCentered row={row} />
          <CButton color="danger" onClick={() => handleDelete(row.numClient)}>
            Delete
          </CButton>
        </div>
      ),
      ignoreRowClick: true,
    },
  ]
  return (
    <>
      <CRow>
        <CCol xs={8}></CCol>
        <CCol xs={4}>
          <CFormInput type="text" placeholder="Rechercher" />
        </CCol>
        <br />
        <br />
        <br />
        <DataTable columns={columns} data={clientData} fixedHeader pagination dense={false} />
      </CRow>
    </>
  )
}
export default Client
