
import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/row";





const StyledApp = styled.div`
 
  padding: 20px;
`;

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="horizontal"><Heading as ="h1">The Wild Oasis</Heading>
        <div>
          <Heading as="h2">Check In and Out</Heading>
        <Button onClick={() => alert("Check In")}>Check in</Button>
        <Button onClick={() => alert("Check Out")}>Check Out</Button>

        </div>
        </Row>
        <Row type="vertical">

          <Heading as="h3">Form</Heading>
          <form >
          <Input type="number" placeholder="Number of guests"></Input>
          <Input type="number" placeholder="Number of nights"></Input>

          </form>
        </Row>

      </StyledApp>
    </>
  );
}
