import styled from "styled-components";
import Sector from "./sector";
import { getProperties } from "../../services/helper";
import { useQuery } from "@apollo/client";
import { GET_SECTORS } from "@client/src/services/graphql";

const Background = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 36px 30px;
  gap: 64px;
`;

const StyledDiv = styled.div`
  margin-left: 14.5%;
`;
const StyledH2 = styled.h2`
  font-family: "Be Vietnam Pro";
  color: #f1f4fa;
`;

const sectorLabel = "Companies by sectors";

interface SectorProp {
  key: string;
  value: number;
}

const Sectors = (props: any) => {
  return (
    <Background>
      <StyledDiv>
        <StyledH2>{sectorLabel}</StyledH2>
      </StyledDiv>
      <Flex>
        {getProperties(props.companies).map((value: SectorProp, index: number) => {
          return <Sector key={index} sector={value} />;
        })}
      </Flex>
    </Background>
  );
};

export default Sectors;
