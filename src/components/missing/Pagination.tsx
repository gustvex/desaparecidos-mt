import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';

interface PaginationProps {
    loading?: boolean;
    error: string | null;
    totalRecords: number;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxVisiblePages?: number;
}

const PAGE_BTN = "w-9 h-9 p-0 shrink-0";

const Pagination = ({
    loading,
    currentPage,
    totalRecords,
    error,
    totalPages,
    onPageChange,
    maxVisiblePages = 3,
}: PaginationProps) => {

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    const getVisiblePages = (): number[] => {
        if (totalPages <= maxVisiblePages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const half = Math.floor(maxVisiblePages / 2);
        let start = Math.max(1, currentPage - half);
        const end = Math.min(totalPages, start + maxVisiblePages - 1);

        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const visiblePages = getVisiblePages();
    const showStartEllipsis = visiblePages[0] > 1;
    const showEndEllipsis = visiblePages[visiblePages.length - 1] < totalPages;

    if (totalPages <= 1) return null;

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center gap-1 flex-wrap">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={loading || currentPage <= 1}
                    className="gap-1 px-3"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                </Button>

                {showStartEllipsis && (
                    <>
                        <Button
                            variant="outline"
                            className={PAGE_BTN}
                            onClick={() => handlePageChange(1)}
                        >
                            1
                        </Button>
                        {visiblePages[0] > 2 && (
                            <span className="w-9 h-9 flex items-center justify-center text-muted-foreground">
                                <MoreHorizontal className="w-4 h-4" />
                            </span>
                        )}
                    </>
                )}

                {visiblePages.map((page) => (
                    <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        className={PAGE_BTN}
                        onClick={() => handlePageChange(page)}
                        disabled={loading}
                    >
                        {page}
                    </Button>
                ))}

                {showEndEllipsis && (
                    <>
                        {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                            <span className="w-9 h-9 flex items-center justify-center text-muted-foreground">
                                <MoreHorizontal className="w-4 h-4" />
                            </span>
                        )}
                        <Button
                            variant="outline"
                            className={PAGE_BTN}
                            onClick={() => handlePageChange(totalPages)}
                        >
                            {totalPages}
                        </Button>
                    </>
                )}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={loading || currentPage >= totalPages}
                    className="gap-1 px-3"
                >
                    Próxima
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>

            {!loading && !error && totalRecords > 0 && (
                <p className="text-sm text-muted-foreground">
                    Página {currentPage} de {totalPages} — {totalRecords} registros
                </p>
            )}
        </div>
    );
};

export default Pagination;
