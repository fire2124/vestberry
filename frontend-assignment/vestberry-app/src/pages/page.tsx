import { useState, useEffect } from "react";
import {
  GET_COMPANIES,
  ADD_COMPANY,
  REMOVE_COMPANY,
} from "../services/appoloQueries";
import { useQuery, useMutation } from "@apollo/client";
import Table from "../components/table/table";
import Companies from "../components/companies/companies";
import Sectors from "../components/sectors/sectors";
import styled from "styled-components";
import Modal from "../components/modal/modal";

const Background = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const StyledDivButton = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.button`
  font-family: "Gotham";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  white-space: nowrap;
  width: 216px;
  height: 100%;
  background-color: #06ac72;
  color: #ffffff;
  border-radius: 30px;
  border: none;
  padding: 14px;
`;

const buttonLabel = "Add new company";

const Page = () => {
  let initialState = {
    data: [],
    headerAttr: {
      "COMPANY NAME": "name",
      STAGE: "stage",
      SECTOR: "sector",
      "INVESTMENT SIZE": "investmentSize",
    },
  };
  const [main, setMain] = useState(initialState as any);
  const [isOpen, setIsOpen] = useState(false);

  const { loading, error, data: companyData } = useQuery(GET_COMPANIES);

  const [
    addCompany,
    { data: addedData, loading: loadingAddedData, error: errorAdding },
  ] = useMutation(ADD_COMPANY);

  const [
    remove,
    { data: dataRemove, loading: loadingRemove, error: errorRemove },
  ] = useMutation(REMOVE_COMPANY);

  if (loading || loadingAddedData || loadingRemove) {
    console.log(loading || loadingAddedData || loadingRemove)
    return <StyledButton>Loading data...</StyledButton>;
  }

  if (error || errorRemove || errorAdding ) {
    return (
      <span>
        <pre>{JSON.stringify(error || errorRemove || errorAdding, null, 2)}</pre>
      </span>
    );
  }

  if (dataRemove || addedData || companyData) {

    const getData = ()=>{
      if(dataRemove !== undefined) {
        return dataRemove.companies
      }
      if(addedData !== undefined) {
        const array = companyData.companies.concat([addedData.addCompany] )
        return array
      }
      if(companyData !== undefined) {
        return companyData.companies
      }
    }
    const data = getData()
    if(addedData)window.location.reload();
    
    return(
      <Background>
      <Sectors companies={data} />
      <Companies companies={data} />
      <Table companies={data} main={main} />
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          companies={data}
          addTodo={addCompany}
        />
      )}
      <StyledDivButton>
        {data !== undefined && data.length >= 8 ? (
          <StyledButton
            onClick={() =>
              remove({ variables: companyData.length })
            }
          >
            {"delete"}
          </StyledButton>
        ) : null}
        <StyledButton onClick={() => setIsOpen(true)}>
          {buttonLabel}
        </StyledButton>
      </StyledDivButton>
    </Background>
    )
  }
  return null
};

export default Page;
