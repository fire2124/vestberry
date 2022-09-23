import Fintech from "../assets/fintech.svg";
import Insuretech from "../assets/insuretech.svg";
import Roboadvisory from "../assets/roboadvisory.svg";
import IOT from "../assets/iot.svg";

export const getInvestmentSize = (data: any) => {
  if (data !== undefined) {
    let array = data.map((e: any) => {
      //Note: Donute graph need as key to start with UpperCase
      return {
        key: `${e.name[0].toUpperCase() + e.name.slice(1)}`,
        data: parseInt(e.investmentSize),
      };
    });
    return array;
  } else return [];
};

export const getProp = (value: any) => {
  //for sectors
  if (value !== undefined) {
    const output = value.reduce((obj: any, itm: any) => {
      obj[itm.sector] = obj[itm.sector] + 1 || 1;
      return obj;
    }, {});
    return Object.keys(output).map((e) => ({ key: e, value: output[e] }));
  } else return [];
};

export const getImage = (props: any) => {
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

export const insert = (arr: any, index: number, ...newItems: any) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted items
  ...newItems,
  // part of the array after the specified index
  ...arr.slice(index),
];

export const checkForOccurences = (companies: [], companyName: string) => {
  const booleanValue = companies.map((company: any) => {
    const value: any = Object.values(company.name);
    if (value === companyName) return true;
    else return false;
  });

  return booleanValue.filter((value: boolean) => {
    return value === false;
  }).length;
};

export const getLegend = (companies: [], colorSchema: any) => {
  return companies.map((company: any, index: number) => {
    const value =  {
      label: company.name,
      color: index % 8 === 0 ? colorSchema[index / 8] : colorSchema[index % 8],
    };
    return value
  });
};
