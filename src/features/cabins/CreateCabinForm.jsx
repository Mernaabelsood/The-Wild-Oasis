import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin, updateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

export default function CreateCabinForm({ cabinToEdit, onClose }) {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: cabinToEdit || {},
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: updateCabin,
    onSuccess: () => {
      toast.success("Cabin updated!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      onClose();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    if (cabinToEdit) {
      updateMutation.mutate({ id: cabinToEdit.id, ...data });
    } else {
      createMutation.mutate({ ...data, image: data.image[0] });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount" {...register("discount")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image")}
          type="file"
        />
      </FormRow>

      <FormRow>
        <Button type="submit">Save</Button>
        <Button variation="secondary" type="button" onClick={onClose}>
          Cancel
        </Button>
      </FormRow>
    </Form>
  );
}
