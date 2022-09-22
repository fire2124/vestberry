import { useState, useEffect } from "react";
import {
  GET_COMPANIES,
  ADD_COMPANY,
  REMOVE_COMPANY,
} from "../services/appoloQueries";
import Mutation from 'graphql-tag'
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

  // useEffect(() => {
  //   try {
  //     if (companyData !== undefined) {
  //       setMain({ ...initialState, data: companyData.companies });
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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

  if (loadingRemove) {
    console.log("Deleting...");
    return <span>Deleting...</span>;
  }
  if (errorRemove) console.log(`Submission error! ${errorRemove.message}`);
  if (dataRemove) console.log(dataRemove);

  if (loadingAddedData) {
    return <span>Submitting...</span>;
  }
  if (errorAdding) console.log(`Submission error! ${errorAdding.message}`);
  if (addedData && addedData.addCompany) {
    // const value = [...main.data,addedData.addCompany]
    console.log(addedData);
    // setMain({ ...initialState, data: addedData.addCompany });
  }

  return (
    // <Mutation
    //   mutation={ADD_COMPANY}
    //   update={(cache:any, { data: { addCompany }}:any) => {
    //     const { companies } = cache.readQuery({ query: GET_COMPANIES });
    //     cache.writeQuery({
    //       query: GET_COMPANIES,
    //       data: { companies: companies.concat([addCompany]) },
    //     });
    //   }}
    // >
      <Background>
        <Sectors companies={companyData.companies} />
        <Companies companies={companyData.companies} />
        <Table companies={companyData.companies} main={main} />
        {isOpen && (
          <Modal
            setIsOpen={setIsOpen}
            companies={companyData.companies}
            addTodo={addCompany}
          />
        )}
        <StyledDivButton>
          {companyData.companies.length >= 0 ? (
            <StyledButton
              onClick={() =>
                remove({ variables: companyData.length })
              }
            >
              {"delete"}{" "}
            </StyledButton>
          ) : null}
          <StyledButton onClick={() => setIsOpen(true)}>
            {buttonLabel}{" "}
          </StyledButton>
        </StyledDivButton>
      </Background>
    // </Mutation>
  );
};

export default Page;
