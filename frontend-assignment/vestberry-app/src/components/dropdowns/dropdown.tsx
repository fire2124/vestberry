import styled from "styled-components";
import { useState } from "react";
import {insert} from "../../services/helper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ArrowDown = styled(KeyboardArrowDownIcon)`
  color: rgba(82, 87, 89, 1);
  font-size: 2rem;
`;
const StyledSelect = styled.select`
  background: #141518;
  /* appearance: none; */
  background-position-x: 96%;
  width: 102.7%;
  border-color: #aaaaaa;
  color: #aaaaaa;
  border: 1px solid #aaaaaa;
  border-radius: 4px;
  font-family: "Be Vietnam Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 19px;
  display: flex;
  align-items: center;
  padding: 2%;
`;

const Option = styled.option`
  padding-top: 5%;
  min-height: 200px;
  position: absolute;
  background-color: black;
  z-index: 99;
  &:after {
    padding-top: 5%;
    min-height: 200px;
  }
  &:before {
    padding-top: 5%;
    min-height: 200px;
  }
  &:focus {
    padding-top: 5%;
    min-height: 200px;
  }
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






const Dropdown = (props: any) => {
  const [local, setLocal] = useState(true);

  const result = insert(props.e.value, 0, "")
  return (
    <>
      {local ? <StyledP>{props.e.label}</StyledP> : null}
      <StyledSelect
        name={props.e.label}
        id={props.e.label}
        onChange={props.e.onChange}
        onClick={() => setLocal(false)}
      >
        {result.map((val: any, index: number) => {
          return (
            <Option key={index} value={val}>
              {val}
            </Option>
          );
        })}
      </StyledSelect>
    </>
  );
};

export default Dropdown;

// <FormControl fullWidth>
// <InputLabel id="demo-simple-select-label">{props.e.label}</InputLabel>
// <StyledSelect
//   labelId="demo-simple-select-label"
//   id="demo-simple-select"
//   value={props.e.nullValue}
//   label={props.e.label}
//   onChange={props.e.onChange}
//   IconComponent={() => <ArrowDown />}
// >
//   {props.e.value.map((val: any, index: number) => {
//     return (
//       <MenuItem key={index} value={val}>
//         {val}
//       </MenuItem>
//     );
//   })}
// </StyledSelect>
// </FormControl>
