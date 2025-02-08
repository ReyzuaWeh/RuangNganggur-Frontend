interface ParamsJobType {
    role: string;
    company: string | number;
    location?: string | null;
    salary?: number | null;
    description?: string | null;
    onDetailClick: () => void;
}
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
export type { PaginationProps, ParamsJobType };
