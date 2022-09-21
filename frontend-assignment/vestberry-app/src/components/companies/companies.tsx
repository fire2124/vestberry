import styled from "styled-components";
import { PieChart, PieArcSeries } from "reaviz";
import { schemeDark2 } from "d3-scale-chromatic";
import { getInvestmentSize } from "../../services/helper";

const Background = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 70%;
  height: 355px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 10px;
  padding: 36px 30px;
  gap: 64px;
`;

const StyledDiv = styled.div`
  margin-left: -52%;
`;
const StyledH2 = styled.h2`
  font-family: "Be Vietnam Pro";
  color: #f1f4fa;
`;
const StyledP = styled.p`
  font-family: "Be Vietnam Pro";
  color: #f1f4fa;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10%;
  width: 100%;
  white-space: nowrap;
`;
const Dot = styled.div(
  ({ theme }) => `
    background: ${theme};
    width:  15px;
    height: 15px;
    border-radius:50%;
`
);
const Legend = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  width: 40%;
`;

const ChartLabelDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: white;
  margin-top: -10%;
`;
const StyledPieChart = styled.div`
  position: absolute;
`;
const StyledPGraph = styled.p`
  font-family: "Be Vietnam Pro";
  font-style: normal;
  font-weight: 700;
  font-size: 38px;
  line-height: 48px;
`;
const StyledPText = styled.p`
  margin-top: -43%;
`;
const StyledBox = styled.div`
  position: relative;
  height: 250px;
  width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const scompaniesLabel = "Companies by investment size";
const label = "Companies";

const Companies = (props: any) => {
  const data = getInvestmentSize(props.companies);
  return (
    <Background>
      <StyledDiv>
        <StyledH2>{scompaniesLabel}</StyledH2>
      </StyledDiv>
      <Flex>
        <StyledBox>
          <StyledPieChart>
            <PieChart
              width={250}
              height={350}
              data={data}
              series={
                <PieArcSeries
                  doughnut={true}
                  label={null}
                  colorScheme="Dark2"
                />
              }
            />
          </StyledPieChart>
          <ChartLabelDiv>
            <StyledPGraph>{data.length}</StyledPGraph>
            <StyledPText> {label}</StyledPText>
          </ChartLabelDiv>
        </StyledBox>
        <Legend>
          {props.companies.map((company: any, i: number) => {
            //Note: color are valid for max 8 colors, because of the Dark2 Color pallet
            return (
              <Item key={i}>
                <Dot theme={schemeDark2[i]}></Dot>
                <StyledP>{company.name}</StyledP>
              </Item>
            );
          })}
        </Legend>
      </Flex>
    </Background>
  );
};

export default Companies;
