import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '../../ui/button';

interface PaginationProps {
    loading?: boolean;
    error: string | null;
    totalRecords: number;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    showFirstLast?: boolean;
    maxVisiblePages?: number;
}

const Pagination = ({
    loading,
    currentPage,
    totalRecords,
    error,
    totalPages,
    onPageChange,
    showFirstLast = false,
    maxVisiblePages = 5
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

        const halfVisible = Math.floor(maxVisiblePages / 2);
        let start = Math.max(1, currentPage - halfVisible);
        const end = Math.min(totalPages, start + maxVisiblePages - 1);

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
        <div className='flex flex-col gap-4'>
            <div className="flex flex-wrap items-center justify-center gap-4">
                {showFirstLast && currentPage > 1 && (
                    <>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(1)}
                            className=' '
                        >
                            Primeira
                        </Button>
                    </>
                )}

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Anterior
                </Button>

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

                <div className="flex space-x-1">
                    {visiblePages.map((page: number) => (
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

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                >
                    Próxima
                    <ChevronRight className="w-4 h-4 ml-1" />
                </Button>

                {showFirstLast && currentPage < totalPages && (
                    <>
                        <Button
                            variant="outline"
                            size="sm"
                            className=' '
                            onClick={() => handlePageChange(totalPages)}
                        >
                            Última
                        </Button>
                    </>
                )}

            </div>
            <div className='flex justify-center'>
                {!loading && !error && (
                    <p className="text-sm text-muted-foreground">
                        {totalRecords > 0
                            ? `Exibindo ${totalRecords} registros (Página ${currentPage} de ${totalPages})`
                            : 'Nenhum registro encontrado'
                        }
                    </p>
                )}
            </div>
        </div>
    );
};

export default Pagination;