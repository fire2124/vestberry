import { useState } from "react";
import { GET_COMPANIES } from "../services/appoloQueries";
import { useQuery } from "@apollo/client";
import Table from "../components/table/table";
import Companies from "../components/companies/companies";
import Sectors from "../components/sectors/sectors";
import styled from "styled-components";

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
  const [main, setMain] = useState(initialState);
  const { loading, error, data: companyData } = useQuery(GET_COMPANIES);

  if (loading) {
    return <span>Loading data...</span>;
  }

  if (error) {
    return (
      <span>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </span>
    );
  }

  return (
    <Background>
      <Sectors companies={companyData.companies} />
      <Companies companies={companyData.companies} />
      <Table companies={companyData.companies} main={main} />
      <StyledDivButton>
        <StyledButton>{buttonLabel} </StyledButton>
      </StyledDivButton>
    </Background>
  );
};

export default Page;
