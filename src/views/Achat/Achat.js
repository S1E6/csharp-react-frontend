import React from 'react'
import { CButton, CCol, CRow, CFormInput } from '@coreui/react'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'
import { useAchatContext } from '../../context/AchatProvider'
import axios from 'axios'

const Achat = () => {
  const { achatData, deleteAchat } = useAchatContext()

  const handleDelete = (achat) => {
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
        text:
          "Voulez vous vraiment supprimer l'achat n°" +
          achat.numachat +
          ' du client : ' +
          achat.client.idclient +
          ' ' +
          achat.client.nom +
          ' ' +
          achat.client.prenoms +
          ' ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui supprimer',
        cancelButtonText: 'Non, annuler',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire('Supprimé', 'Suppression avec succès', 'success')
          deleteAchat(achat.numachat)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Annulé', 'Supprission annulé :)', 'error')
        }
      })
  }

  const handlePDFLoad = (achat) => {
    const pdfData = {
      adresseDestinataire: achat.client.adresse,
      somme: achat.somme.toString(),
      dateAchat: achat.dateachat,
      client: achat.client.nom + ' ' + achat.client.prenoms,
      voiture: achat.voiture.designvoiture,
    }

    axios
      .post('https://localhost:7001/api/Pdf/generate', pdfData)
      .then((response) => {
        Swal.fire('Généré', 'PDF généré avec succès', 'success')
        console.log('PDF généré avec succès:', response.data)
      })
      .catch((error) => {
        console.error('Erreur lors de la génération du PDF:', error.message)
      })
  }

  const columns = [
    {
      name: 'Numéro',
      selector: (row) => row.numachat,
      sortable: true,
    },
    {
      name: 'Client',
      selector: (row) => row.client.idclient + ' ' + row.client.nom + ' ' + row.client.prenoms,
    },
    {
      name: 'Voiture',
      selector: (row) => row.voiture.numserie + ' ' + row.voiture.designvoiture,
    },
    {
      name: 'Somme',
      selector: (row) => row.somme,
    },
    {
      name: 'Reste',
      selector: (row) => row.voiture.prix - row.somme,
    },
    {
      name: 'Actions',
      width: '200px',
      cell: (row) => (
        <div>
          {/*<EditModal row={row} />*/}
          {/*<BuyModal row={row} />*/}
          <CButton color="none" onClick={() => handlePDFLoad(row)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 15 15">
              <path
                fill="currentColor"
                d="M3.5 8H3V7h.5a.5.5 0 0 1 0 1ZM7 10V7h.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H7Z"
              />
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M1 1.5A1.5 1.5 0 0 1 2.5 0h8.207L14 3.293V13.5a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 1 13.5v-12ZM3.5 6H2v5h1V9h.5a1.5 1.5 0 1 0 0-3Zm4 0H6v5h1.5A1.5 1.5 0 0 0 9 9.5v-2A1.5 1.5 0 0 0 7.5 6Zm2.5 5V6h3v1h-2v1h1v1h-1v2h-1Z"
                clipRule="evenodd"
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

  return (
    <>
      <CRow>
        <CCol xs={8}>{/*<VerticallyCentered />*/}</CCol>
        <CCol xs={4}>
          <CFormInput type="text" placeholder="Rechercher" />
        </CCol>
        <br />
        <br />
        <DataTable columns={columns} data={achatData} fixedHeader pagination dense={false} />
      </CRow>
    </>
  )
}
export default Achat
