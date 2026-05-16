import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
    it("calls onSearch with the typed name when clicking 'Buscar'", async () => {
        const user = userEvent.setup();
        const onSearch = vi.fn();
        render(<SearchBar onSearch={onSearch} />);

        await user.type(screen.getByPlaceholderText(/buscar por nome/i), "João");
        await user.click(screen.getByRole("button", { name: /buscar/i }));

        expect(onSearch).toHaveBeenCalledWith(expect.objectContaining({ nome: "João" }));
    });

    it("triggers search when pressing Enter inside the name input", async () => {
        const user = userEvent.setup();
        const onSearch = vi.fn();
        render(<SearchBar onSearch={onSearch} />);

        const input = screen.getByPlaceholderText(/buscar por nome/i);
        await user.type(input, "Maria{Enter}");

        expect(onSearch).toHaveBeenCalledWith(expect.objectContaining({ nome: "Maria" }));
    });

    it("disables inputs and buttons when loading", () => {
        render(<SearchBar onSearch={vi.fn()} loading />);
        expect(screen.getByPlaceholderText(/buscar por nome/i)).toBeDisabled();
        expect(screen.getByRole("button", { name: /buscando/i })).toBeDisabled();
    });

    it("toggles the advanced filters card", async () => {
        const user = userEvent.setup();
        render(<SearchBar onSearch={vi.fn()} />);

        expect(screen.queryByText(/idade mínima/i)).not.toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: /filtros/i }));
        expect(screen.getByText(/idade mínima/i)).toBeInTheDocument();
    });

    it("clears all filters when clicking 'Limpar'", async () => {
        const user = userEvent.setup();
        const onSearch = vi.fn();
        render(<SearchBar onSearch={onSearch} />);

        await user.type(screen.getByPlaceholderText(/buscar por nome/i), "Pedro");
        await user.click(screen.getByRole("button", { name: /filtros/i }));
        await user.click(screen.getByRole("button", { name: /limpar/i }));

        expect(onSearch).toHaveBeenLastCalledWith({});
    });
});
