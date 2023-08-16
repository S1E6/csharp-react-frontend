import React, { useState } from 'react'
import { useVoitureContext } from '../../context/VoitureProvider'
import { useClientContext } from '../../context/ClientProvider'
import {
  CButton,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CAlert,
} from '@coreui/react'
import PropTypes from 'prop-types'

export const BuyModal = ({ row }) => {
  const [visibleBuy, setVisibleBuy] = useState(false)
  const [buyData, setBuyData] = useState({
    numachat: 'string',
    idclient: '',
    numserie: row.voitures[0].numserie,
    qte: 1,
    reste: 0,
    somme: 0,
    client: {
      idclient: 'string',
      nom: 'string',
      prenoms: 'string',
      adresse: 'string',
      mail: 'string',
    },
    voiture: {
      numserie: row.voitures[0].numserie,
      idcategorie: row.voitures[0].idcategorie,
      idmarque: row.voitures[0].idmarque,
      designvoiture: row.voitures[0].designvoiture,
      prix: row.voitures[0].prix,
      img: row.voitures[0].img,
      type: row.voitures[0].type,
      boitevitesse: row.voitures[0].boitevitesse,
      status: 1,
      categorie: {
        idcategorie: row.voitures[0].categorie.idcategorie,
        designcat: row.voitures[0].categorie.designcat,
      },
      marque: {
        idmarque: row.voitures[0].marque.idmarque,
        designmarque: row.voitures[0].marque.designmarque,
      },
    },
  })
  const { buyCar } = useVoitureContext()
  const { clientData } = useClientContext()
  const [validationErrorBuy, setValidationErrorBuy] = useState(false)

  const save = () => {
    if (validateFormBuy()) {
      buyCar(buyData)
      console.log(buyData)
      setVisibleBuy(false)
    }
  }

  const validateFormBuy = () => {
    if (!buyData.idclient || !buyData.somme) {
      setValidationErrorBuy(true)
      return false
    }
    setValidationErrorBuy(false)
    return true
  }

  const handleInputChangeBuy = (event) => {
    const { name, value } = event.target
    setBuyData((prevData) => ({
      ...prevData,
      [name]: value,
      reste: buyData.voiture.prix * buyData.qte - parseInt(buyData.somme),
    }))
  }

  const handleCliInputChangeBuy = (event) => {
    const { name, value } = event.target
    setBuyData((prevData) => ({
      ...prevData,
      idclient: value,
      client: {
        idclient: value,
        nom: 'string',
        prenoms: 'string',
        adresse: 'string',
        mail: 'string',
      },
    }))
  }

  return (
    <>
      <CButton color="none" onClick={() => setVisibleBuy(!visibleBuy)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
          <g fill="none" stroke="currentColor" strokeWidth="4">
            <path strokeLinejoin="round" d="M6 15h36l-2 27H8L6 15Z" clipRule="evenodd" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 19V6h16v13" />
            <path strokeLinecap="round" d="M16 34h16" />
          </g>
        </svg>
      </CButton>
      <CModal alignment="center" visible={visibleBuy} onClose={() => setVisibleBuy(false)}>
        <CModalHeader>
          <CModalTitle>Acheter une voiture</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {validationErrorBuy && (
            <CAlert color="danger">Veuillez remplir tous les champs obligatoires.</CAlert>
          )}
          <CFormSelect
            name="idclient"
            value={buyData.client.idclient}
            onChange={handleCliInputChangeBuy}
            label="Client"
            aria-label="Default select example"
          >
            <option>Choisissez un client</option>
            {clientData.map((client) => (
              <option key={client.idclient} value={client.idclient}>
                {client.idclient + ' ' + client.nom + ' ' + client.prenoms}
              </option>
            ))}
          </CFormSelect>
          <br />
          <CFormInput
            type="text"
            name="designvoiture"
            value={
              buyData.voiture.designvoiture +
              ' ' +
              buyData.voiture.categorie.designcat +
              ' ' +
              buyData.voiture.marque.designmarque
            }
            onChange={handleInputChangeBuy}
            label="Modéle"
            aria-label="default input example"
          />
          <br />
          <CFormInput
            type="text"
            name="prix"
            value={buyData.voiture.prix}
            onChange={handleInputChangeBuy}
            label="Prix"
            aria-label="default input example"
          />
          <br />
          <CFormInput
            type="text"
            name="somme"
            value={buyData.somme}
            onChange={handleInputChangeBuy}
            label="Somme"
            aria-label="default input example"
          />
          <br />
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setVisibleBuy(false)}>
            Annuler
          </CButton>
          <CButton color="success" onClick={save}>
            Enregistrer
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

BuyModal.propTypes = {
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

export default BuyModal
