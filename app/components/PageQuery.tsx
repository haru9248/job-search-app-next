"use client"

import { useRouter } from 'next/navigation';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  category?: string;
  salary?: number;
}

const PageQuery = ({ currentPage, totalPages, category, salary }: PaginationProps) => {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;  // 範囲外のページに遷移しないように
    const query = new URLSearchParams(window.location.search);
    query.set('page', newPage.toString());
    if (category) query.set('category', category);
    if (salary) query.set('salary', salary.toString());
    router.push(`/?${query.toString()}`);
  };

  const generatePageNumbers = () => {
    let start = Math.max(currentPage - 2, 1); // 現在のページの前2ページを表示
    let end = Math.min(currentPage + 2, totalPages); // 現在のページの後2ページを表示

    // トータルページ数に合わせて表示範囲を調整
    if (end - start < 4) {
      if (start > 1) end = Math.min(start + 4, totalPages);
      else start = Math.max(end - 4, 1);
    }

    const pageNumbers = [];
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };
  return (
    <div className="flex justify-center items-center gap-3">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ◀︎
      </button>
      {generatePageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ▶︎
      </button>
    </div>
  );
};

export default PageQuery;