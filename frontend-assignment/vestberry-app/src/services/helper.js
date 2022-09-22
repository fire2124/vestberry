import Fintech from "../assets/fintech.svg";
import Insuretech from "../assets/insuretech.svg";
import Roboadvisory from "../assets/roboadvisory.svg";
import IOT from "../assets/iot.svg";

export const getInvestmentSize = (data) => {
  let array = data.map(e => {
    return { key: e.name, data: e.investmentSize };
  });
  return array;
};

export const getProp = (value) => {
  const output = value.reduce((obj, itm) => {
    obj[itm.sector] = obj[itm.sector] + 1 || 1;
    return obj;
  }, {});
  return Object.keys(output).map(e => ({ key: e, value: output[e] }));
};

export const getImage = (props) => {
  switch (props.sector.key) {
    case "Fintech":
      return { src: Fintech, alt: "Fintech" };
    case "Insuretech":
      return { src: Insuretech, alt: "Insuretech" };
    case "Roboadvisory":
      return { src: Roboadvisory, alt: "Roboadvisory" };
    case "IOT":
      return { src: IOT, alt: "IOT" };
    default:
      return { src: IOT, alt: "IOT" };
  }
};

export const insert = (arr, index, ...newItems) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted items
  ...newItems,
  // part of the array after the specified index
  ...arr.slice(index)
]