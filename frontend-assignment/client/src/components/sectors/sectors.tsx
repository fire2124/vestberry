import styled from "styled-components";
import Sector from "./sector";
import { getProp } from "../../services/helper";

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

const Sectors = (props: any) => {
  return (
    <Background>
      <StyledDiv>
        <StyledH2>{sectorLabel}</StyledH2>
      </StyledDiv>
      <Flex>
        {getProp(props.companies).map((value: Object, index:number) => {
          return <Sector key={index} sector={value} />;
        })}
      </Flex>
    </Background>
  );
};

export default Sectors;
