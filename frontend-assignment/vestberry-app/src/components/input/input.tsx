import styled from "styled-components";
import { useState } from "react";

import "./input.css";

const StyledInput = styled.input`
  background: #141518;
  border-color: #aaaaaa;
  color: #aaaaaa;
  width: 98.5%;
  padding: 2%;
  border: 1px solid #aaaaaa;
  border-radius: 4px;
  font-family: "Be Vietnam Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 19px;
  display: flex;
  align-items: center;
`;

const StyledP = styled.p`
  position: absolute;
  color: #aaaaaa;
  border-radius: 4px;
  font-family: "Be Vietnam Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 19px;
  display: flex;
  align-items: center;
  margin-left: 2%;
`;
const StyledPEnd = styled.p`
  position: absolute;
  color: #aaaaaa;
  border-radius: 4px;
  font-family: "Be Vietnam Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 19px;
  display: flex;
  align-items: end;
  justify-content: end;
  margin-left: 81%;
`;

const Input = (props: any) => {
  const [local, setLocal] = useState(true);

  return (
    <>
      {local ? (
        <StyledP onClick={() => setLocal(false)}>{props.e.label}</StyledP>
      ) : null}
      {props.e.symbol !== undefined ? (
        <StyledPEnd>{props.e.symbol}</StyledPEnd>
      ) : null}

      <StyledInput
        type={props.e.value}
        onChange={(e) => {
          props.e.onChange(e);
        }}
        onClick={() => setLocal(false)}
      />
    </>
  );
};

export default Input;
