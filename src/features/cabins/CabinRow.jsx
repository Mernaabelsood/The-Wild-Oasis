import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { deleteCabin, updateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteMutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin deleted!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt="Cabin" />
        <div>
          <Cabin>{name}</Cabin>
        </div>
        <div>{maxCapacity} guests</div>
        <div>
          <Price>${regularPrice}</Price>
        </div>
        <div>
          <Discount>${discount}</Discount>
        </div>

        {/* Edit and Delete Buttons */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={() => setShowForm(true)}>Edit</button>
          <button onClick={() => deleteMutate(cabinId)} disabled={isDeleting}>
            Delete
          </button>
        </div>
      </TableRow>

      {/* Show Edit Form When Needed */}
      {showForm && (
        <CreateCabinForm
          cabinToEdit={cabin}
          onClose={() => setShowForm(false)}
        />
      )}
    </>
  );
}
