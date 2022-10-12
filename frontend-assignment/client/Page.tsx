import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";

import styled from "styled-components";
import {
  GET_COMPANIES,
  CompanyType,
  ADD_COMPANY,
} from "@client/src/services/graphql";

import Table from "./src/components/table/table";
import Companies from "./src/components/companies/companies";
import Sectors from "./src/components/sectors/sectors";
import Modal from "./src/components/modal/modal";
import Error from "./src/components/notifications/error";
import Success from "./src/components/notifications/success";

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
const emptyfield = "You need to fill all inputs";
const successMessage = "Successfully added book";

export function Page() {
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
  const [empty, setIsEmpty] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    loading,
    error,
    data: companyData,
  } = useQuery<{ companies: CompanyType[] }>(GET_COMPANIES);

  const [
    addCompany,
    { data: addedData, loading: loadingAddedData, error: errorAdding },
  ] = useMutation(ADD_COMPANY);

  if (loading || loadingAddedData) {
    return <StyledButton>Loading data...</StyledButton>;
  }

  if (error) {
    return (
      <Error status={error} function={setIsEmpty} />
    );
  }
  if (errorAdding) {
    return (
      <Error status={errorAdding} function={setIsEmpty} />
    );
  }

  if (addedData || companyData !== undefined) {
    const getData = () => {
      if (addedData !== undefined && companyData) {
        const array = companyData.companies.concat([addedData.addCompany]);
        return array;
      }
      if (companyData !== undefined) {
        return companyData.companies;
      }
    };
    const data = getData();

    return (
      <Background>
        {empty ? <Error status={emptyfield} function={setIsEmpty} /> : null}
        {success ? <Success status={successMessage} function={setSuccess} /> : null}
        <Sectors companies={data} />
        <Companies companies={data} />
        <Table companies={data} main={main} />
        {isOpen && (
          <Modal
            setIsOpen={setIsOpen}
            companies={data}
            addTodo={addCompany}
            setIsEmpty={setIsEmpty}
            setSuccess={setSuccess}
          />
        )}
        <StyledDivButton>
          <StyledButton onClick={() => setIsOpen(true)}>
            {buttonLabel}
          </StyledButton>
        </StyledDivButton>
      </Background>
    );
  }
  return null;
}

export default Page;
