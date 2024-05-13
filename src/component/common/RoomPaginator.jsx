import React from "react";

const RoomPaginator = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
        <nav className="flex justify-center" aria-label="Page navigation">
            <ul className="pagination">
                {pageNumbers.map((pageNumber) => (
                    <li
                        key={pageNumber}
                        className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
                    >
                        <button
                            onClick={() => onPageChange(pageNumber)}
                            className={`${
                                currentPage === pageNumber
                                    ? "bg-blue-500 text-white"
                                    : "bg-white text-gray-700"
                            } hover:bg-blue-200 focus:outline-none focus:bg-blue-200 border border-gray-300 rounded-md px-4 py-2`}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default RoomPaginator;
