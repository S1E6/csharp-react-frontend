import React, { useState } from 'react'
import { CButton, CCol, CRow, CFormInput } from '@coreui/react'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'
import { useAchatContext } from '../../context/AchatProvider'
import axios from 'axios'
import EditAchat from './EditAchat'

const Achat = () => {
  const { achatData, deleteAchat } = useAchatContext()
  const [searchTerm, setSearchTerm] = useState('')

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
          "Voulez vous vraiment annuler l'achat n°" +
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
          deleteAchat(achat)
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
      sortable: true,
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
      name: "Date d'achat",
      selector: (row) => {
        const purchaseDate = new Date(row.dateachat)
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }
        const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(purchaseDate)
        return formattedDate.replace(' ', ' à ')
      },
    },
    {
      name: 'Actions',
      width: '200px',
      cell: (row) => (
        <div>
          {/*<EditAchat*/}
          {/*  row={{*/}
          {/*    numachat: row.numachat,*/}
          {/*    idclient: row.idclient,*/}
          {/*    numserie: row.voiture.numserie,*/}
          {/*    qte: row.qte,*/}
          {/*    reste: 0,*/}
          {/*    somme: row.somme,*/}
          {/*    client: {*/}
          {/*      idclient: row.idclient,*/}
          {/*      nom: 'string',*/}
          {/*      prenoms: 'string',*/}
          {/*      adresse: 'string',*/}
          {/*      mail: 'string',*/}
          {/*    },*/}
          {/*    voiture: {*/}
          {/*      numserie: row.voiture.numserie,*/}
          {/*      idcategorie: row.voiture.idcategorie,*/}
          {/*      idmarque: row.voiture.idmarque,*/}
          {/*      designvoiture: row.voiture.designvoiture,*/}
          {/*      prix: row.voiture.prix,*/}
          {/*      img: row.voiture.img,*/}
          {/*      type: row.voiture.type,*/}
          {/*      boitevitesse: row.voiture.boitevitesse,*/}
          {/*      status: 1,*/}
          {/*      categorie: {*/}
          {/*        idcategorie: row.voiture.categorie?.idcategorie,*/}
          {/*        designcat: row.voiture.categorie?.designcat,*/}
          {/*      },*/}
          {/*      marque: {*/}
          {/*        idmarque: row.voiture.marque?.idmarque,*/}
          {/*        designmarque: row.voiture.marque?.designmarque,*/}
          {/*      },*/}
          {/*    },*/}
          {/*  }}*/}
          {/*/>*/}
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
              <path
                fill="currentColor"
                d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-3.4 14L12 13.4L8.4 17L7 15.6l3.6-3.6L7 8.4L8.4 7l3.6 3.6L15.6 7L17 8.4L13.4 12l3.6 3.6l-1.4 1.4Z"
              />
            </svg>
          </CButton>
        </div>
      ),
      ignoreRowClick: true,
    },
  ]

  const filteredAchatData = achatData.filter((achat) =>
    achat.client.idclient.toString().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <CRow>
        <CCol xs={8}>{/*<VerticallyCentered />*/}</CCol>
        <CCol xs={4}>
          <CFormInput
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par numéro client"
          />
        </CCol>
        <br />
        <br />
        <DataTable
          columns={columns}
          data={filteredAchatData}
          fixedHeader
          pagination
          dense={false}
        />
      </CRow>
    </>
  )
}
export default Achat
