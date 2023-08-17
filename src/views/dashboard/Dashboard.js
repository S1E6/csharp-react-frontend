import React, { useEffect, useState } from 'react'

import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

import { CChartBar, CChartPie } from '@coreui/react-chartjs'
import axios from 'axios'

const Dashboard = () => {
  const [graphBarData, setgraphBarData] = useState([])
  const [graphPieData, setgraphPieData] = useState([])

  useEffect(() => {
    axios
      .get('https://localhost:7001/api/Graph/argent-par-mois')
      .then((response) => {
        setgraphBarData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching category data:', error.message)
      })

    axios
      .get('https://localhost:7001/api/Graph/marques-sommes-voitures')
      .then((response) => {
        setgraphPieData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching marque data:', error.message)
      })
  }, [])

  return (
    <>
      <CRow>
        <CCol xs={7}>
          <CCard className="mb-4">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <CCardHeader>Chiffre d'affaires par moi en ariary</CCardHeader>
            <CCardBody>
              <CChartBar
                data={{
                  labels: graphBarData.months,
                  datasets: [
                    {
                      label: "Chiffre d 'affaire ",
                      backgroundColor: '#2676FF',
                      data: graphBarData.data,
                    },
                  ],
                }}
                labels="months"
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={5}>
          <CCard className="mb-4">
            <CCardHeader>Nombres de voiture par marque</CCardHeader>
            <CCardBody>
              <CChartPie
                data={{
                  labels: graphPieData.labels,
                  datasets: [
                    {
                      data: graphPieData.data,
                      backgroundColor: [
                        '#F51DAF',
                        '#FFA533',
                        '#7839E6',
                        '#2676FF',
                        '#F56838',
                        '#009740',
                        '#F5D038',
                      ],
                      hoverBackgroundColor: [
                        '#F51DAF',
                        '#FFA533',
                        '#7839E6',
                        '#2676FF',
                        '#F56838',
                        '#009740',
                        '#F5D038',
                      ],
                    },
                  ],
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <br />
        <br />
      </CRow>
    </>
  )
}

export default Dashboard
