import React, { useEffect, useState } from 'react'
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
import { useAchatContext } from '../../context/AchatProvider'

export const EditAchat = ({ row }) => {
  const [visibleBuy, setVisibleBuy] = useState(false)
  const [buyData, setBuyData] = useState()
  const { buyCar } = useVoitureContext()
  const { updateAchat } = useAchatContext()
  const { clientData } = useClientContext()
  const [validationErrorBuy, setValidationErrorBuy] = useState(false)

  const save = () => {
    if (validateFormBuy()) {
      updateAchat(row)
      console.log(row)
      setVisibleBuy(false)
    }
  }

  const validateFormBuy = () => {
    if (!row.idclient || !row.somme) {
      setValidationErrorBuy(true)
      return false
    }
    setValidationErrorBuy(false)
    return true
  }

  const handleInputChangeBuy = (event) => {
    const { name, value } = event.target
    row[name] = value
    row.reste = row.voiture.prix * row.qte - parseInt(row.somme)
  }

  const handleCliInputChangeBuy = (event) => {
    const { name, value } = event.target
    row.idclient = value
    row.client = {
      idclient: value,
      nom: 'string',
      prenoms: 'string',
      adresse: 'string',
      mail: 'string',
    }
  }

  useEffect(() => {
    setBuyData({
      numachat: row.numachat,
      idclient: row.idclient,
      numserie: row.voiture.numserie,
      qte: row.qte,
      reste: 0,
      somme: row.somme,
      client: {
        idclient: row.idclient,
        nom: 'string',
        prenoms: 'string',
        adresse: 'string',
        mail: 'string',
      },
      voiture: {
        numserie: row.voiture.numserie,
        idcategorie: row.voiture.idcategorie,
        idmarque: row.voiture.idmarque,
        designvoiture: row.voiture.designvoiture,
        prix: row.voiture.prix,
        img: row.voiture.img,
        type: row.voiture.type,
        boitevitesse: row.voiture.boitevitesse,
        status: 1,
        categorie: {
          idcategorie: row.voiture.categorie?.idcategorie || 'string',
          designcat: row.voiture.categorie?.designcat || 'string',
        },
        marque: {
          idmarque: row.voiture.marque?.idmarque || 'string',
          designmarque: row.voiture.marque?.designmarque || 'string',
        },
      },
    })
  }, [])
  return (
    <>
      <CButton color="none" onClick={() => setVisibleBuy(!visibleBuy)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
          <path
            fill="currentColor"
            d="M10.733 2.56a1.914 1.914 0 0 1 2.707 2.708l-.733.734l-2.708-2.708l.734-.733Zm-1.44 1.441L3.337 9.955a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.633L5.4 13.06c.243-.08.463-.217.644-.398L12 6.709L9.292 4Z"
          />
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

EditAchat.propTypes = {
  row: PropTypes.shape({
    numachat: PropTypes.string.isRequired,
    idclient: PropTypes.string.isRequired,
    somme: PropTypes.number.isRequired,
    reste: PropTypes.number.isRequired,
    qte: PropTypes.number.isRequired,
    client: PropTypes.shape({
      idclient: PropTypes.string.isRequired,
      nom: PropTypes.string.isRequired,
      prenoms: PropTypes.string.isRequired,
      adresse: PropTypes.string.isRequired,
      mail: PropTypes.string.isRequired,
    }).isRequired,
    voiture: PropTypes.shape({
      numserie: PropTypes.string.isRequired,
      idcategorie: PropTypes.string.isRequired,
      idmarque: PropTypes.string.isRequired,
      designvoiture: PropTypes.string.isRequired,
      prix: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      boitevitesse: PropTypes.string.isRequired,
      status: PropTypes.number.isRequired,
      categorie: PropTypes.shape({
        idcategorie: PropTypes.string.isRequired,
        designcat: PropTypes.string.isRequired,
      }).isRequired,
      marque: PropTypes.shape({
        idmarque: PropTypes.string.isRequired,
        designmarque: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default EditAchat
