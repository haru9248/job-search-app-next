
// import JobPage from "./components/JobPage";

type Job = {
  id: number;
  title: string;
  salary: number;
  category_name: string;
}
async function fetchJobs(): Promise<Job[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL  || "http://localhost:3000";
  try {
    const res = await fetch(`${apiUrl}/api/jobs`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.statusText}`);
  }
  const data = await res.json();
  console.log("GetData:", data);
  return data;
} catch (error) {
  console.error("Error fetching jobs:", error);
  return [];
 }
}
export default async function Home() {
  const jobs = await fetchJobs();
  return (
    <div className="flex">
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h2>{job.title}</h2>
            <p>カテゴリ：{job.category_name}</p>
            <p>年収：{job.salary}</p>
          </li>
        ))}
      </ul>
      {/* <JobPage jobs={jobs}/> */}
    </div>
  );
}