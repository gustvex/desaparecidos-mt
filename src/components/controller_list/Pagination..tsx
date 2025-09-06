// src/components/ui/Pagination.tsx
import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';



interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showFirstLast?: boolean;
    maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    showFirstLast = false,
    maxVisiblePages = 5
}) => {
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    const getVisiblePages = () => {
        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const halfVisible = Math.floor(maxVisiblePages / 2);
        let start = Math.max(1, currentPage - halfVisible);
        let end = Math.min(totalPages, start + maxVisiblePages - 1);

        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const visiblePages = getVisiblePages();
    const showStartEllipsis = visiblePages[0] > 1;
    const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="flex items-center justify-center space-x-2">
            {/* Primeira página */}
            {showFirstLast && currentPage > 1 && (
                <>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(1)}
                    >
                        Primeira
                    </Button>
                </>
            )}

            {/* Página anterior */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
            </Button>

            {/* Ellipsis do início */}
            {showStartEllipsis && (
                <>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(1)}
                    >
                        1
                    </Button>
                    {visiblePages[0] > 2 && (
                        <Button variant="ghost" size="sm" disabled>
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    )}
                </>
            )}

            {/* Páginas visíveis */}
            <div className="flex space-x-1">
                {visiblePages.map((page) => (
                    <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={page === currentPage ? "font-semibold" : ""}
                    >
                        {page}
                    </Button>
                ))}
            </div>

            {/* Ellipsis do final */}
            {showEndEllipsis && (
                <>
                    {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                        <Button variant="ghost" size="sm" disabled>
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(totalPages)}
                    >
                        {totalPages}
                    </Button>
                </>
            )}

            {/* Próxima página */}
            <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >
                Próxima
                <ChevronRight className="w-4 h-4 ml-1" />
            </Button>

            {/* Última página */}
            {showFirstLast && currentPage < totalPages && (
                <>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(totalPages)}
                    >
                        Última
                    </Button>
                </>
            )}
        </div>
    );
};

export default Pagination;