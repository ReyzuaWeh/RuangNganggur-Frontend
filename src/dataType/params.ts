import { DataOutJob } from "./fetch";
interface ParamsJobType {
    role: string;
    company: string | number;
    location?: string | null;
    salary: string;
    description?: string | null;
    onDetailClick: (job: DataOutJob) => void;
}
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
export type { PaginationProps, ParamsJobType };
