import { render, screen, fireEvent } from "@testing-library/react";
import { DataTable } from "./DataTable";
import { Column } from "./DataTable.types";

type TestRow = { name: string; age: number };
const columns: Column<TestRow>[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "age", label: "Age", sortable: true },
  ];
  
  const rows: TestRow[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
  ];


describe("DataTable", () => {
  it("renders rows", () => {
    render(<DataTable<TestRow>
        columns={columns} rows={rows} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("calls onRowClick when row is clicked", () => {
    const handleClick = jest.fn();
    render(<DataTable<TestRow> columns={columns} rows={rows} onRowClick={handleClick} />);
    fireEvent.click(screen.getByText("Alice"));
    expect(handleClick).toHaveBeenCalledWith(rows[0]);
  });

  it("renders loading state", () => {
    render(<DataTable columns={columns} rows={[]} loading={true} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(<DataTable columns={columns} rows={[]} loading={false} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });
});