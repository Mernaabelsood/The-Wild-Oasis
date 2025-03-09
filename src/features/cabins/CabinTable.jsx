import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const PAGE_SIZE = 5; // Limit cabins per page

export default function CabinTable() {
  const { data: cabins, isLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  if (isLoading) return <Spinner />;
  if (!cabins?.length) return <Empty resource="cabins" />;

  // 1️⃣ FILTER
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabins = cabins || [];

  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2️⃣ SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = [...filteredCabins].sort((a, b) => {
    if (!a.hasOwnProperty(field) || !b.hasOwnProperty(field)) return 0;
    if (typeof a[field] === "number" && typeof b[field] === "number")
      return (a[field] - b[field]) * modifier;
    if (typeof a[field] === "string" && typeof b[field] === "string")
      return a[field].localeCompare(b[field]) * modifier;
    return 0;
  });

  // 3️⃣ PAGINATION - Slice cabins for current page
  const totalCabins = sortedCabins.length;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedCabins = sortedCabins.slice(startIndex, endIndex);

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>

      {paginatedCabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}

      <div style={{ marginTop: "2rem", padding: "0 2.4rem" }}>
        <Pagination count={totalCabins} />
      </div>
    </Table>
  );
}
