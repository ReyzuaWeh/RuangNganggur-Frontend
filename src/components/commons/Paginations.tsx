import { PaginationProps } from "@/dataType/params";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    return (
        <div className="flex justify-center items-center gap-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary'} text-white`}
            >
                <FaChevronLeft />
            </button>

            <p className="text-gray-600">
                {currentPage}
            </p>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary'} text-white`}
            >
                <FaChevronRight />
            </button>
        </div>
    );
};

export default Pagination;
