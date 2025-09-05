import React from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ totalPages, currentPage, onPageChange }) => {
    // Função para gerar os números de página a serem exibidos
    const getPageNumbers = () => {
        const delta = 2; // Número de páginas para mostrar ao redor da página atual
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(0, currentPage - delta); i <= Math.min(currentPage + delta, totalPages - 1); i++) {
            range.push(i);
        }

        // Adicionar a primeira página se necessário
        if (range[0] > 0) {
            rangeWithDots.push(0);
            if (range[0] > 1) {
                rangeWithDots.push(-1); // -1 representa as reticências
            }
        }

        // Adicionar as páginas do range
        rangeWithDots.push(...range);

        // Adicionar a última página se necessário
        if (range[range.length - 1] < totalPages - 1) {
            if (range[range.length - 1] < totalPages - 2) {
                rangeWithDots.push(-1); // -1 representa as reticências
            }
            rangeWithDots.push(totalPages - 1);
        }

        return rangeWithDots;
    };

    return (
        <div className="flex justify-center mt-8">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage > 0) onPageChange(currentPage - 1);
                            }}
                            className={currentPage === 0 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {getPageNumbers().map((page, index) => (
                        <PaginationItem key={index}>
                            {page === -1 ? (
                                <PaginationEllipsis />
                            ) : (
                                <PaginationLink
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onPageChange(page);
                                    }}
                                    isActive={currentPage === page}
                                >
                                    {page + 1}
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                if (currentPage < totalPages - 1) onPageChange(currentPage + 1);
                            }}
                            className={currentPage === totalPages - 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default PaginationComponent;
