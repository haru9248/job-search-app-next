import JobPage from "./components/JobPage";

type Job = {
  id: number;
  title: string;
  salary: number;
  category_name: string;
}
async function fetchJobs(): Promise<Job[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/jobs`, {
    cache: "no-store",
  });
  const data = await res.json();
  console.log("GetData:", data);
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