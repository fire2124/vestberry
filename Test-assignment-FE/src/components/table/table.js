import React from 'react'
import styled from 'styled-components'

const StyledTable = styled.table`
  width:100%;
  padding: 2%;
  
`
const StyledTh = styled.th`
  padding: 2%;
  `
const StyledTr = styled.tr`
  background-color: rgb(247,249,252);
  text-align: left;
  padding: 2%;
`
const StyledTrBody = styled.tr`
  background-color: rgb(255,255,255);
  text-align: left;
  padding: 2%;
`
const StyledTd = styled.td`
  padding: 2%;
`
const StyledButton = styled.button`
  padding: 17%;
  white-space: nowrap;
  `
const StyledThead = styled.thead`
  border-bottom: 4px solid black;
`
const StyledTfootButton = styled.tfoot`
    display: flex;
    justify-content: center;
  `
const StyledTBody = styled.tbody`
  `

const buttonLabel = 'Add new company'

const Table = (props) => {
  const initiaState = {
    data: props.companies,
    mapping: {'COMPANY NAME': 'name', 'STAGE': 'stage', 'SECTOR': 'sector', 'INVESTMENT SIZE': 'investmentSize'}
  }

  return (
    <StyledTable>
      <StyledThead>
        <StyledTr>
          {Object.keys(initiaState.mapping).map((name, i) => {
            return <StyledTh key={i}>{name}</StyledTh>
          })}
        </StyledTr>
      </StyledThead>
      <StyledTBody>
        {initiaState.data.map((company, i) => (
          <StyledTrBody key={i}>
            {Object.values(initiaState.mapping).map((value, index) => {
              return <StyledTd key={index}>{company[value]}</StyledTd>
            })}
          </StyledTrBody>
        ))}

      </StyledTBody>
      <StyledTfootButton>
        <StyledTr>
          <StyledTd>
            <StyledButton>{buttonLabel} </StyledButton>
          </StyledTd>
        </StyledTr>
      </StyledTfootButton>
    </StyledTable>
  )
}

export default Table