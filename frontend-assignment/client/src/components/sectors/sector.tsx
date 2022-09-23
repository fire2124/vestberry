import styled from "styled-components";
import { getImage } from "../../services/helper";

const Background = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  padding: 36px 30px;
  gap: 64px;
  width: 235px;
  height: 138px;
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const StyledText = styled.div`
  margin-top: -10%;
`;
const Value = styled.p`
  font-family: "Be Vietnam Pro";
  font-style: normal;
  font-weight: 700;
  font-size: 38px;
  line-height: 48px;
  text-align: left;
  color: #ffffff;
`;

const Tag = styled.p`
  font-family: "Be Vietnam Pro";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  text-align: left;
  color: #aaaaaa;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: -30%;
`;

const Sector = (props: any) => {
  const image = getImage(props);
  return (
    <Background>
      <StyledText>
        <Value>{props.sector.value}</Value>
        <Tag>{props.sector.key}</Tag>
      </StyledText>
      <img src={image.src} alt={image.alt} />
    </Background>
  );
};

export default Sector;
