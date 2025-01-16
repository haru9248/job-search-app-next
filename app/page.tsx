
import PageQuery from "./components/PageQuery";
import Sidebar from "./components/Sidebar";

type Job = {
  id: number;
  title: string;
  salary: number;
  category_name: string;
}

type fetchJobsResponse = {
  jobs: Job[];
  totalPages: number;
  totalJobs: number;
}
async function fetchJobs(category: string | null, salary: number | null, page: number): Promise<fetchJobsResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const response = await fetch(`${apiUrl}/api/jobs?category=${category}&salary=${salary}&page=${page}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }

  const data = await response.json();
  return {
    jobs: data.jobs,
    totalPages: data.totalPages,
    totalJobs: data.totalJobs,
}}
export default async function Home({ searchParams }: { searchParams: { category?: string, salary?: number, page?: string }}) {
  const { category, salary, page = '1' } = searchParams;
  const currentPage = parseInt(page, 10);
  const { jobs, totalPages, totalJobs }: fetchJobsResponse = await fetchJobs(category || '', salary || 300, currentPage);
  return (
    <div>
    <div className="flex">
      <Sidebar />
     <div className="p-4 pl-7 w-full">
      <h2 className="text-xl font-bold">求人一覧</h2>
      <p className="mb-5">該当件数：{totalJobs}件</p>
      <ul>
        {jobs.map((job) => (
          <li className="border-2 rounded-md w-full mr-4 mb-5 pb-5 p-2" key={job.id}>
            <h2 className="font-bold text-xl">{job.title}</h2>
            <p>カテゴリ：{job.category_name}</p>
            <p>年収：{job.salary}万円</p>
          </li>
        ))}
      </ul>
      <PageQuery currentPage={currentPage} totalPages={totalPages}/>
      </div>
    </div>
    </div>
  );
}