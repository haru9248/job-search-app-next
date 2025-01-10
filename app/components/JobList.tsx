interface Job {
  id: number;
  title: string;
  salary: number;
  category_name: string;
}

interface JobListProps {
  jobs: Job[];
}

const JobList: React.FC<JobListProps> = ({ jobs }) => {
  return (
    <div className="w-full">
      <ul>
        {jobs.map((job) => (
          <li key={job.id} className="mb-4 border-2 rounded-md w-4/5 p-2">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p>カテゴリ：{job.category_name}</p>
            <p className="mb-10">年収：{job.salary}万円</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobList;