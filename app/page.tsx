import JobPage from "./components/JobPage";

type Job = {
  id: number;
  title: string;
  salary: number;
  category_name: string;
}
async function fetchJobs(): Promise<Job[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  const res = await fetch(`${apiUrl}/jobs`, {
    cache: "no-store",
  });
  const data = await res.json();
  console.log(data);
  return data;
}
export default async function Home() {
  const jobs = await fetchJobs();
  return (
    <div className="flex">
      <JobPage jobs={jobs}/>
    </div>
  );
}