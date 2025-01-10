"use client";

import React, { useState } from "react";
import JobList from "./JobList";
import Sidebar from "./Sidebar";

type Job = {
  id: number;
  title: string;
  salary: number;
  category_name: string;
};

type JobPageProps = {
  jobs: Job[];
};

const JobPage: React.FC<JobPageProps> = ({ jobs }) => {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs); // フィルタリングされた求人データ
  const [filters, setFilters] = useState<{ category: string[]; salary: number | null }>({
    category: [],
    salary: null,
  });

  // ページネーションの状態
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10); // 1ページに表示する求人件数

  // フィルター変更時に呼ばれる関数
  const handleFilterChange = (newFilters: { category: string[]; salary: number | null }) => {
    setFilters(newFilters);
    console.log(filters);

    // 新しいフィルターに基づいて求人をフィルタリング
    const filtered = jobs.filter((job) => {
      const matchesCategory = newFilters.category.length === 0 || newFilters.category.includes(job.category_name);
      const matchesSalary = newFilters.salary ? job.salary >= newFilters.salary : true;
      return matchesCategory && matchesSalary;
    });

    setFilteredJobs(filtered); // フィルタリングされた求人データを更新
  };

  // 現在のページに表示する求人を計算
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // ページネーションのボタン処理
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredJobs.length / jobsPerPage)));
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  // ページネーションボタンのレンダリング
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredJobs.length / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex w-full">
      <Sidebar onFilterChange={handleFilterChange} />
    <div className="pl-6 p-4 w-full">
    <h2 className="text-xl font-bold">求人一覧</h2>
    <p className="mb-4">該当件数：{filteredJobs.length}件</p>
      <JobList jobs={currentJobs} />
        <div className="pagination mt-4 flex justify-center items-center">
          <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 rounded-l">
            ◀︎
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className="px-4 py-2">
              {number}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={currentPage === pageNumbers.length}
            className="px-4 py-2">
                ▶︎
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPage;