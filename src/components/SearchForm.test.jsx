import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchForm from "./SearchForm";

describe("SearchForm Component", () => {
  it("renders the search inputs correctly", () => {
    render(<SearchForm onSearch={() => {}} />);
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. BR1/i)).toBeInTheDocument();
  });

  it("updates the postcode input when user types", async () => {
    const user = userEvent.setup();
    render(<SearchForm onSearch={() => {}} />);

    const input = screen.getByPlaceholderText(/e.g. BR1/i);
    await user.type(input, "SW1");

    expect(input).toHaveValue("SW1");
  });

  it("calls onSearch with correct data when button is clicked", async () => {
    const handleSearchMock = vi.fn();
    const user = userEvent.setup();

    render(<SearchForm onSearch={handleSearchMock} />);

    await user.type(screen.getByPlaceholderText(/e.g. BR1/i), "NW1");

    await user.click(screen.getByRole("button", { name: /search/i }));

    expect(handleSearchMock).toHaveBeenCalled();
    expect(handleSearchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        postcode: "NW1",
      })
    );
  });
});
