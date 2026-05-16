import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusBadge from "./StatusBadge";
import type { UltimaOcorrenciaDTO } from "@/assets/interfaces";

const ocorrenciaDesaparecida: UltimaOcorrenciaDTO = {
    dtDesaparecimento: "2024-01-01",
};

const ocorrenciaLocalizadaViva: UltimaOcorrenciaDTO = {
    dtDesaparecimento: "2024-01-01",
    dataLocalizacao: "2024-03-01",
};

const ocorrenciaLocalizadaMorta: UltimaOcorrenciaDTO = {
    dtDesaparecimento: "2024-01-01",
    dataLocalizacao: "2024-03-01",
};

describe("StatusBadge", () => {
    it("shows 'Desaparecida' when there is no dataLocalizacao", () => {
        render(<StatusBadge vivo={false} ultimaOcorrencia={ocorrenciaDesaparecida} />);
        expect(screen.getByText("Desaparecida")).toBeInTheDocument();
    });

    it("shows 'Localizada Viva' when dataLocalizacao is set and vivo is true", () => {
        render(<StatusBadge vivo={true} ultimaOcorrencia={ocorrenciaLocalizadaViva} />);
        expect(screen.getByText("Localizada Viva")).toBeInTheDocument();
    });

    it("shows 'Localizada Morta' when dataLocalizacao is set and vivo is false", () => {
        render(<StatusBadge vivo={false} ultimaOcorrencia={ocorrenciaLocalizadaMorta} />);
        expect(screen.getByText("Localizada Morta")).toBeInTheDocument();
    });

    it("shows 'Desaparecida' when ultimaOcorrencia is undefined", () => {
        render(<StatusBadge vivo={false} ultimaOcorrencia={undefined} />);
        expect(screen.getByText("Desaparecida")).toBeInTheDocument();
    });
});
