import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CRow,
  CFormInput,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormSelect,
  CModalFooter,
  CModal,
  CFormCheck,
  CAlert,
} from '@coreui/react'
import { useVoitureContext } from '../../context/VoitureProvider'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'
import { BuyModal } from './BuyModal'
import { VerticallyCentered } from './VerticallyCentered'
import axios from 'axios'

const Voiture = () => {
  const { voitureData, deleteVoiture } = useVoitureContext()
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [visible, setVisible] = useState(false)
  const [categories, setCategories] = useState([])
  const [marques, setMarques] = useState([])
  const [formData, setFormData] = useState()
  const [isNewCategory, setIsNewCategory] = useState(false)
  const [isNewMarque, setIsNewMarque] = useState(false)
  const [validationError, setValidationError] = useState(false)
  const { updateVoiture } = useVoitureContext()
  const handleEdit = (row) => {
    setVisible(true)
    setFormData(row)
  }

  const handleDelete = (voiture) => {
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
          'Voulez vous vraiment supprimer le' +
          voiture.categorie.designcat +
          ' ' +
          voiture.marque.designmarque +
          ' ' +
          voiture.designvoiture +
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
          deleteVoiture(voiture.numserie)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire('Annulé', 'Supprission annulé :)', 'error')
        }
      })
  }

  const columns = [
    {
      name: 'Numéro',
      selector: (row) => row.voitures[0].numserie,
      sortable: true,
    },
    {
      name: 'Modèle',
      selector: (row) => row.designation,
    },
    {
      name: 'Catégorie',
      selector: (row) => row.voitures[0].categorie.designcat,
    },
    {
      name: 'Marque',
      selector: (row) => row.voitures[0].marque.designmarque,
    },
    {
      name: 'Type',
      selector: (row) => row.voitures[0].type,
    },
    {
      name: 'Boîte',
      selector: (row) => row.voitures[0].boitevitesse,
    },
    {
      name: 'Prix',
      selector: (row) => row.voitures[0].prix.toLocaleString('fr-FR', { minimumFractionDigits: 0 }),
    },
    {
      name: 'Actions',
      width: '200px',
      cell: (row) => (
        <div>
          <CButton
            color="none"
            onClick={() => {
              setVisible(!visible)
              handleEdit(row.voitures[0])
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16">
              <path
                fill="currentColor"
                d="M10.733 2.56a1.914 1.914 0 0 1 2.707 2.708l-.733.734l-2.708-2.708l.734-.733Zm-1.44 1.441L3.337 9.955a1.65 1.65 0 0 0-.398.644l-.914 2.743a.5.5 0 0 0 .632.633L5.4 13.06c.243-.08.463-.217.644-.398L12 6.709L9.292 4Z"
              />
            </svg>
          </CButton>
          <BuyModal row={row} />
          <CButton color="none" onClick={() => handleDelete(row.voitures[0])}>
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
    const filteredResults = voitureData.filter(
      (voiture) =>
        voiture.voitures[0].numserie.toLowerCase().includes(text.toLowerCase()) ||
        voiture.designation.toLowerCase().includes(text.toLowerCase()),
    )
    setSearchResults(filteredResults)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCatInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      idcategorie: value,
      categorie: {
        idcategorie: value,
        designcat: '',
      },
    }))
  }

  const handleMarInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      idmarque: value,
      marque: {
        idmarque: value,
        designmarque: '',
      },
    }))
  }

  const saveCar = () => {
    if (validateForm()) {
      updateVoiture(formData.numserie, formData)
      setVisible(false)
      resetForm()
    }
  }

  const validateForm = () => {
    if (!formData.designvoiture || !formData.prix) {
      setValidationError(true)
      return false
    }
    if (isNewCategory) {
      if (!formData.categorie.designcat) {
        setValidationError(true)
        return false
      }
    } else {
      if (!formData.idcategorie) {
        setValidationError(true)
        return false
      }
    }
    if (isNewMarque) {
      if (!formData.marque.designmarque) {
        setValidationError(true)
        return false
      }
    } else {
      if (!formData.idmarque) {
        setValidationError(true)
        return false
      }
    }
    setValidationError(false)
    return true
  }

  const resetForm = () => {
    setFormData({
      numserie: 'string',
      idcategorie: '',
      idmarque: '',
      designvoiture: '',
      prix: 0,
      img: 'string',
      type: 'Essence',
      boitevitesse: 'Manuelle',
      status: 0,
      categorie: {
        idcategorie: '',
        designcat: '',
      },
      marque: {
        idmarque: '',
        designmarque: '',
      },
    })
  }

  useEffect(() => {
    handleSearch(searchText)
    axios
      .get('https://localhost:7001/api/Categorie')
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => {
        console.error('Error fetching category data:', error.message)
      })

    axios
      .get('https://localhost:7001/api/Marques')
      .then((response) => {
        setMarques(response.data)
      })
      .catch((error) => {
        console.error('Error fetching marque data:', error.message)
      })
  }, [voitureData, searchText])

  return (
    <>
      <CRow>
        <CCol xs={8}>
          <VerticallyCentered />
        </CCol>
        <CCol xs={4}>
          <CFormInput
            type="text"
            placeholder="Rechercher"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </CCol>
        <br />
      </CRow>
      <br />
      <DataTable
        columns={columns}
        data={searchText.length > 0 ? searchResults : voitureData}
        fixedHeader
        pagination
        dense={false}
      />
      {visible && (
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Ajouter une voiture</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CFormInput
              type="text"
              name="designvoiture"
              value={formData.designvoiture}
              onChange={handleInputChange}
              label="Modéle"
              aria-label="default input example"
            />
            <br />
            <CFormCheck
              label="Nouvelle catégorie"
              checked={isNewCategory}
              onChange={() => setIsNewCategory(!isNewCategory)}
            />
            {isNewCategory ? (
              <CFormInput
                type="text"
                name="idcategorie"
                value={formData.categorie.designcat}
                onChange={handleCatInputChange}
                label="Catégorie"
                aria-label="default input example"
              />
            ) : (
              <CFormSelect
                name="idcategorie"
                value={formData.idcategorie}
                onChange={handleCatInputChange}
                label="Catégorie"
                aria-label="Default select example"
              >
                <option value="choose">Choisissez une catégorie</option>
                {categories.map((category) => (
                  <option key={category.idcategorie} value={category.idcategorie}>
                    {category.designcat}
                  </option>
                ))}
              </CFormSelect>
            )}
            <br />
            <CFormCheck
              label="Nouvelle marque"
              checked={isNewMarque}
              onChange={() => setIsNewMarque(!isNewMarque)}
            />
            {isNewMarque ? (
              <CFormInput
                type="text"
                name="idmarque"
                value={formData.marque.designmarque}
                onChange={handleMarInputChange}
                label="Marque"
                aria-label="default input example"
              />
            ) : (
              <CFormSelect
                name="idmarque"
                value={formData.idmarque}
                onChange={handleMarInputChange}
                label="Marque"
                aria-label="Default select example"
              >
                <option>Choisissez une marque</option>
                {marques.map((marque) => (
                  <option key={marque.idmarque} value={marque.idmarque}>
                    {marque.designmarque}
                  </option>
                ))}
              </CFormSelect>
            )}
            <br />
            <CFormSelect
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              label="Type"
              aria-label="Default select example"
            >
              <option value="Essence">Essence</option>
              <option value="Diesel">Diesel</option>
              <option value="Electrique">Electrique</option>
            </CFormSelect>
            <br />
            <CFormSelect
              name="boitevitesse"
              value={formData.boitevitesse}
              onChange={handleInputChange}
              label="Boîte"
              aria-label="Default select example"
            >
              <option value="Manuelle">Manuelle</option>
              <option value="Automatique">Automatique</option>
            </CFormSelect>
            <br />
            <CFormInput
              type="text"
              name="prix"
              value={formData.prix}
              onChange={handleInputChange}
              label="Prix"
              aria-label="default input example"
            />
            <br />
            {validationError && (
              <CAlert color="danger">Veuillez remplir tous les champs obligatoires.</CAlert>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" onClick={() => setVisible(false)}>
              Annuler
            </CButton>
            <CButton color="success" onClick={saveCar}>
              Enregistrer
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </>
  )
}
export default Voiture
