import { render, screen } from "@testing-library/react";
import {StatusBadge} from "./StatusBadge";
import { StatusType } from "./StatusBadge.types";

describe("StatusBadge", () => {
  it("renders status text correctly", () => {
    const { rerender } = render(<StatusBadge status="pending" />);
    expect(screen.getByText("PENDING")).toBeInTheDocument();

    rerender(<StatusBadge status="complete" />);
    expect(screen.getByText("COMPLETE")).toBeInTheDocument();

    rerender(<StatusBadge status="error" />);
    expect(screen.getByText("ERROR")).toBeInTheDocument();
  });

  it("renders custom label if provided", () => {
    render(<StatusBadge status="pending" label="Custom" />);
    expect(screen.getByText("Custom")).toBeInTheDocument();
  });

  it("has correct aria-label for accessibility", () => {
    render(<StatusBadge status="complete" />);
    const badge = screen.getByRole("status");
    expect(badge).toHaveAttribute("aria-label", "Status: COMPLETE");
  });
});