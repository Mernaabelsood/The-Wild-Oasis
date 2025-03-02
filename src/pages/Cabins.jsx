import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
 
const [showForm, setShowForm] = useState(false);
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
    <CabinTableOperations/>
    </Row>
    <Row>
      <CabinTable/>
      <Button type="button" onClick={() => setShowForm((show)=> !show)}> Add New Cabin</Button>
      { showForm && <CreateCabinForm/> }
    </Row>
    </>
  );
}

export default Cabins;
