import {Button} from "../Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxVisiblePages?: number;
}

export function Pagination({
                               currentPage,
                               totalPages,
                               onPageChange,
                               maxVisiblePages = 5,
                           }: PaginationProps) {
    const getPageRange = () => {
        const half = Math.floor(maxVisiblePages / 2);
        let start = Math.max(currentPage - half, 1);
        let end = Math.min(start + maxVisiblePages - 1, totalPages);

        if (end - start + 1 < maxVisiblePages) {
            start = Math.max(end - maxVisiblePages + 1, 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    const pages = getPageRange();

    return (
        <div className="flex items-center justify-between gap-2 mt-8 mb-10 px-16">
            <Button
                variant="ghost"
                size="ghost"
                className="text-black hover:bg-transparent hover:text-ghoukie-light-green gap-1"
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
            >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Предыдущая</span>
            </Button>

            <div className="flex items-center gap-1">
                {pages[0] > 1 && (
                    <>
                        <PageButton
                            page={1}
                            currentPage={currentPage}
                            onClick={onPageChange}
                        />
                        {pages[0] > 2 && <span className="px-2">...</span>}
                    </>
                )}

                {pages.map((page) => (
                    <PageButton
                        key={page}
                        page={page}
                        currentPage={currentPage}
                        onClick={onPageChange}
                    />
                ))}

                {pages[pages.length - 1] < totalPages && (
                    <>
                        {pages[pages.length - 1] < totalPages - 1 && (
                            <span className="px-2">...</span>
                        )}
                        <PageButton
                            page={totalPages}
                            currentPage={currentPage}
                            onClick={onPageChange}
                        />
                    </>
                )}
            </div>

            <Button
                variant="ghost"
                size="ghost"
                className="text-black hover:bg-transparent hover:text-ghoukie-light-green gap-1"
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
            >
                <span className="hidden sm:inline">Следующая</span>
                <ChevronRight className="w-5 h-5" />
            </Button>
        </div>
    );
}

interface PageButtonProps {
    page: number;
    currentPage: number;
    onClick: (page: number) => void;
}

function PageButton({ page, currentPage, onClick }: PageButtonProps) {
    const isActive = page === currentPage;

    return (
        <button
            onClick={() => onClick(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors
        ${
                isActive
                    ? "bg-ghoukie-green text-ghoukie-black font-medium"
                    : "bg-ghoukie-black text-ghoukie-white hover:bg-ghoukie-dark-gray"
            }`}
        >
            {page}
        </button>
    );
}