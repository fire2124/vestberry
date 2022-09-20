import React from 'react'
import {GET_COMPANIES} from './Page.queries'
import {useQuery} from '@apollo/client'
import Table from './components/table/table.js'
import Companies from './components/companies/companies.js'
import Sectors from 'components/sectors/sector.js'
import styled from 'styled-components'

const Background = styled.main`
  background-color: rgb(235,238,247);
`
const Page = () => {
  const {loading, error, data: companyData} = useQuery(GET_COMPANIES)

  if (loading) {
    return <span>Loading data...</span>
  }

  if (error) {
    return (
      <span>
        <pre>
          {JSON.stringify(error, null, 2)}
        </pre>
      </span>
    )
  }

  return (
    <Background>
      <Sectors companies={companyData.companies} />
      <Companies companies={companyData.companies} />
      <Table companies={companyData.companies} />
    </Background>

  )
}

export default Page
