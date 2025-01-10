import JobList from "./components/JobList";
import JobPage from "./components/JobPage";
import Sidebar from "./components/Sidebar";

type Job = {
  id: number;
  title: string;
  salary: number;
  category_name: string;
}
async function fetchJobs(): Promise<Job[]> {
  const res = await fetch('http://localhost:3000/api/jobs', {
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
