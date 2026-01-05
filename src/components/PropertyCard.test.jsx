import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import PropertyCard from "./PropertyCard";

const mockProperty = {
  id: "1",
  type: "House",
  price: 500000,
  bedrooms: 3,
  location: "London",
  picture: "house.jpg",
  description: "Test description",
};

describe("PropertyCard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the property image with correct alt text", () => {
    render(
      <BrowserRouter>
        <PropertyCard
          property={mockProperty}
          favorites={[]}
          onAddToFav={() => {}}
          onDragStart={() => {}}
        />
      </BrowserRouter>
    );

    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "house.jpg");
    expect(img).toHaveAttribute("alt", "London");
  });

  it("calls the toggle favorite function when heart is clicked", async () => {
    const toggleFavMock = vi.fn();
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <PropertyCard
          property={mockProperty}
          favorites={[]}
          onAddToFav={toggleFavMock}
          onDragStart={() => {}}
        />
      </BrowserRouter>
    );

    const buttons = screen.getAllByRole("button");
    const favButton = buttons[buttons.length - 1];

    await user.click(favButton);

    expect(toggleFavMock).toHaveBeenCalledTimes(1);
    expect(toggleFavMock).toHaveBeenCalledWith(mockProperty);
  });
});
