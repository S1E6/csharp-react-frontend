import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCart, cilPeople, cilPuzzle, cilSpeedometer } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'
import { cilCarAlt } from '@coreui/icons/js/free/cil-car-alt'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Client',
    to: '/client',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Voiture',
    to: '/voitures',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Liste voiture',
        to: '/voitures/liste',
      },
      {
        component: CNavItem,
        name: 'Catégorie',
        to: '/voitures/categorie',
      },
      {
        component: CNavItem,
        name: 'Marque',
        to: '/voitures/marque',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Achat',
    to: '/achat',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },
]

export default _nav
