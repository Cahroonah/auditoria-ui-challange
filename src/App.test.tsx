import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Invoices page", () => {
  render(<App />);
  expect(screen.getByText("Invoices")).toBeInTheDocument(); // matches your <InvoicesPage />
});