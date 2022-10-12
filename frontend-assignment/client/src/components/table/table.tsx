import styled from "styled-components";

const StyledTable = styled.table`
  width: 76%;
  border-collapse: collapse;
`;
const StyledTh = styled.th`
  padding: 3% 2% 3% 2%;
  text-align: left;
  white-space: nowrap;
`;
const StyledThStage = styled(StyledTh)`
  text-align: right;
  padding: 3% 10% 3% 2%;
`;
const StyledThSECTOR = styled(StyledTh)`
  text-align: right;
  padding: 3% 17% 3% 2%;
`;

const StyledThEnd = styled(StyledTh)`
  text-align: right;
`;
const StyledTrBlack = styled.tr`
  background: #141518;
  text-align: left;
  padding: 2%;
`;
const StyledTrGray = styled.tr`
  background-color: rgba(255, 255, 255, 0.05);
  font-family: "Be Vietnam Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;
  color: #f1f4fa;
  padding: 2%;
`;

const StyledTd = styled.td`
  font-family: "Be Vietnam Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  padding: 3% 2% 3% 2%;
  color: #f1f4fa;
  text-align: right;
  white-space: nowrap;
`;

const CompanyName = styled(StyledTd)`
  font-weight: 700;
  line-height: 18px;
  color: rgb(255, 255, 255);
  text-align: left;
  padding: 2%;
  width: 5%;
`;
const StyledTdSECTOR = styled(StyledTd)`
  text-align: right;
  padding: 3% 17% 3% 2%;
`;

const StyledTdDefault = styled(StyledTd)`
  text-align: right;
  padding: 3% 10% 3% 2%;
`;
const StyledThead = styled.thead``;

const StyledTBody = styled.tbody``;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2%;
`;

const StyledDiv = styled.div`
  margin-right: 60%;
`;

const StyledH2 = styled.h2`
  font-family: "Be Vietnam Pro";
  color: #f1f4fa;
`;

const tableLabel = "Companies overview";
const currency = "EUR";

const Table = (props: any) => {
  return (
    <StyledSection>
      <StyledDiv>
        <StyledH2>{tableLabel}</StyledH2>
      </StyledDiv>
      <StyledTable>
        <StyledThead>
          <StyledTrGray>
            {Object.keys(props.main.headerAttr).map((name, i) => {
              switch (name) {
                case "COMPANY NAME":
                  return <StyledTh key={i}>{name}</StyledTh>;
                case "STAGE":
                  return <StyledThStage key={i}>{name}</StyledThStage>;
                case "SECTOR":
                  return <StyledThSECTOR key={i}>{name}</StyledThSECTOR>;
                default:
                  return <StyledThEnd key={i}>{name}</StyledThEnd>;
              }
            })}
          </StyledTrGray>
        </StyledThead>
        <StyledTBody>
          {props.companies &&
            props.companies.map((row: any, i: number) => {
              if (row.id % 2 === 0)
                return (
                  <StyledTrBlack key={i}>
                    {Object.keys(props.main.headerAttr).map(
                      (e: any, index: number) => {
                        switch (e) {
                          case "COMPANY NAME":
                            return (
                              <CompanyName key={index}>
                                {row[props.main.headerAttr[e]]}
                              </CompanyName>
                            );

                          case "INVESTMENT SIZE":
                            return (
                              <StyledTd key={index}>
                                {row[props.main.headerAttr[e]].toLocaleString()}{" "}
                                {currency}
                              </StyledTd>
                            );
                          case "SECTOR":
                            return (
                              <StyledTdSECTOR key={index}>
                                {row[props.main.headerAttr[e]]}
                              </StyledTdSECTOR>
                            );
                          default:
                            return (
                              <StyledTdDefault key={index}>
                                {row[props.main.headerAttr[e]]}
                              </StyledTdDefault>
                            );
                        }
                      }
                    )}
                  </StyledTrBlack>
                );
              else
                return (
                  <StyledTrGray key={i}>
                    {Object.keys(props.main.headerAttr).map(
                      (e: any, index: number) => {
                        switch (e) {
                          case "COMPANY NAME":
                            return (
                              <CompanyName key={index}>
                                {row[props.main.headerAttr[e]]}
                              </CompanyName>
                            );

                          case "INVESTMENT SIZE":
                            return (
                              <StyledTd key={index}>
                                {row[props.main.headerAttr[e]].toLocaleString()}{" "}
                                {currency}
                              </StyledTd>
                            );
                          case "SECTOR":
                            return (
                              <StyledTdSECTOR key={index}>
                                {row[props.main.headerAttr[e]]}
                              </StyledTdSECTOR>
                            );
                          default:
                            return (
                              <StyledTdDefault key={index}>
                                {row[props.main.headerAttr[e]]}
                              </StyledTdDefault>
                            );
                        }
                      }
                    )}
                  </StyledTrGray>
                );
            })}
        </StyledTBody>
      </StyledTable>
    </StyledSection>
  );
};

export default Table;
