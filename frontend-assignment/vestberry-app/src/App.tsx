import { ApolloProvider } from "@apollo/client";
import client from "./services/appolo";
import Page from "./pages/page";
import styled from "styled-components";

const Background = styled.div`
  background: #141518;
  height:100%;
  width:100%;
  padding-bottom: 5%;
`;
const Nav = styled.nav`
  display: flex ;
  justify-content: start;
  height: 100%;
  font-family: "Be Vietnam Pro";
  color: #ffffff;
  padding: 2% 0% 0% 2%;
  letter-spacing: 0.5em;
`;

const navLabel = "VESTBERRY"

function App() {
  return (
    <Background className="App">
      <Nav>{navLabel}</Nav>
      <ApolloProvider client={client}>
        <Page />
      </ApolloProvider>
    </Background>
  );
}

export default App;
