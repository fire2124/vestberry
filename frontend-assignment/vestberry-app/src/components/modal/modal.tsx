import { useState } from "react";
import styled from "styled-components";
import X from "../../assets/X.svg";
import Dropdown from "../dropdowns/dropdown";
import Input from "../input/input";

const Background = styled.div`
  background: none;
  width: 100vw;
  height: 110vh;
  z-index: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;
const Centered = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const StyledModal = styled.div`
  background: #141518;
  box-shadow: 0px 2px 25px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  width: 640px;
  height: 630px;
  color: white;
  z-index: 10;
`;

const StyledHeader = styled.div`
  background: rgba(255, 255, 255, 0.03);
  height: 125px;
  padding: 1% 0 0 5%;
  border-radius: 20px 20px 0 0;
`;

const StyledPHeader = styled.p`
  font-family: "Be Vietnam Pro";
  font-style: normal;
  font-weight: 800;
  font-size: 22px;
  line-height: 28px;
  color: #f1f4fa;
`;
const StyledP = styled.p`
  font-family: "Be Vietnam Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #aaaaaa;
  width: 85%;
`;

const CloseButton = styled.button`
  cursor: pointer;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  color: #2c3e50;
  background: none;
  transition: all 0.25s ease;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.06);
  position: absolute;
  right: 23px;
  top: 22px;
  align-self: flex-end;
  margin-top: 7px;
  margin-right: 7px;
  :hover {
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
    transform: translate(-4px, 4px);
  }
`;

const ModalContent = styled.div`
  padding-left: 5%;
  font-size: 14px;
  color: #2c3e50;
`;

const ModalContentP = styled.p`
  font-size: 14px;
  color: #f1f4fa;
`;
const ActionsContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 5%;
  gap: 3%;
  padding-top: 10%;
  width: 88%;
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  font-family: "Gotham";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #aaaaaa;
`;

const AddButton = styled.button`
  background: #06ac72;
  border-radius: 20px;
  border: none;
  font-family: "Gotham";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
  padding: 2% 5% 2% 5%;
`;
const StyledDiv = styled.div`
  width: 90%;
`;

const headerText =
  "Add new company by filling all the required fields, select from lists and be carefull, because integer is limited and not everyone can handle that";
const addButton = "Add Company";
const cancelButton = "Cancel";

const Modal = ({ setIsOpen,addTodo }: any) => {
  const [companyName, setCompanyName] = useState("");
  const [stage, setStage] = useState("");
  const [sector, setSector] = useState("");
  const [investmentSize, setInvestmentSize] = useState(0);
  const [local, setLocal] = useState(true);

  const handleName = (e: any) => {
    setCompanyName(e.target.value);
  };

  const handleStage = (e: any) => {
    setStage(e.target.value);
  };
  const handleSector = (e: any) => {
    setSector(e.target.value);
  };
  const handleInvestmentSize = (e: any) => {
    setInvestmentSize(parseInt(e.target.value));
  };

  const addCompany = () => {
    if (
      companyName.length > 0 &&
      sector.length > 0 &&
      stage.length > 0 &&
      investmentSize > 0
    ) {
      const value = {
        name: companyName,
        sector: sector,
        stage: stage,
        investmentSize: investmentSize,
      };
      addTodo({ variables: value });
      setIsOpen(false);
    }
  };

  const modalContent = [
    {
      label: "Company name",
      innerLabel: "Company name",
      type: "input",
      value: "text",
      nullValue: companyName,
      onChange: handleName,
    },
    {
      label: "Stage",
      innerLabel: "Select stage from list",
      type: "select",
      value: [
        "Prototype",
        "Idea",
        "Series C",
        "Series B",
        "Series A",
        "Seed",
      ].sort(),
      nullValue: stage,
      onChange: handleStage,
    },
    {
      label: "Sector",
      innerLabel: "Select sector from list",
      type: "select",
      value: ["Fintech", "Insuretech", "Roboadvisory", "IOT"].sort(),
      nullValue: sector,
      onChange: handleSector,
    },
    {
      label: "Investment size",
      innerLabel: "Enter amount",
      type: "input",
      value: "number",
      symbol: "EUR",
      nullValue: investmentSize,
      onChange: handleInvestmentSize,
    },
  ];

  return (
    <>
      <Background onClick={() => setIsOpen(false)} />
      <Centered>
        <StyledModal>
          <StyledHeader>
            <StyledPHeader>Dialog</StyledPHeader>
            <StyledP>{headerText}</StyledP>
          </StyledHeader>
          <CloseButton onClick={() => setIsOpen(false)}>
            <img src={X} alt={"X"} />
          </CloseButton>
          <ModalContent>
            {modalContent.map((e: any, i: number) => {
              return (
                <StyledDiv key={i}>
                  <ModalContentP>{e.label}</ModalContentP>
                  {e.type === "input" ? (
                    <Input e={e} local={local} />
                  ) : (
                    <Dropdown e={e} />
                  )}
                </StyledDiv>
              );
            })}
          </ModalContent>
          <ActionsContainer>
            <CancelButton onClick={() => setIsOpen(false)}>
              {cancelButton}
            </CancelButton>
            <AddButton onClick={addCompany}>{addButton}</AddButton>
          </ActionsContainer>
        </StyledModal>
      </Centered>
    </>
  );
};

export default Modal;
