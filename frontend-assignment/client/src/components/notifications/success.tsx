import styled from "styled-components";
import X from "../../assets/X.svg";

const StyledSuccessMessage = styled.p`
  padding-left: 10%;
`;

const CloseButton = styled.button`
  cursor: pointer;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  background: none;
  transition: all 0.25s ease;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.06);
  position: absolute;
  right: 23px;
  top: 12px;
  color: #ffffff;
  align-self: flex-end;
  margin-top: 7px;
  margin-right: 7px;
  :hover {
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
    transform: translate(-4px, 4px);
  }
`;

const Background = styled.div`
  border: 1px solid gray;
  background: #141518;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: 15%;
  position: fixed;
  top: 7.5%;
  left: 92%;
  white-space: nowrap;
  transform: translate(-50%, -50%);
  z-index: 100;
  padding: 0.5% 0 0.5% 0;
`;

const Success = (props: any) => {
  return (
    <Background>
      <StyledSuccessMessage>{props.status}</StyledSuccessMessage>
      <CloseButton onClick={() => props.function(false)}>
        <img src={X} alt={"X"} />
      </CloseButton>
    </Background>
  );
};

export default Success;
