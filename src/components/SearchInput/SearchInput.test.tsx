import { render, screen, fireEvent, act } from "@testing-library/react";
import { SearchInput } from "./SearchInput";

jest.useFakeTimers();

describe("SearchInput", () => {
  it("renders the input with placeholder", () => {
    render(<SearchInput value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("calls onChange after debounce", () => {
    const handleChange = jest.fn();
    render(<SearchInput value="" onChange={handleChange} debounceTime={300} />);

    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "Tesla" } });

    // adding advance timers for debounce
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(handleChange).toHaveBeenCalledWith("Tesla");
  });

  it("updates input value on user typing", () => {
    render(<SearchInput value="" onChange={() => {}} />);
    const input = screen.getByPlaceholderText("Search...");
    fireEvent.change(input, { target: { value: "Meta" } });
    expect((input as HTMLInputElement).value).toBe("Meta");
  });
});