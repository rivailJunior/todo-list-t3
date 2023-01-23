import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import ExampleText from "../components/example";

describe("Example test", () => {
  test("should render page properly", () => {
    render(<ExampleText text="teste" />);

    expect(screen.getByText(/Eu sou um texto: teste/i)).toBeInTheDocument();
  });
});
