import JobPage from "./components/JobPage";

type Job = {
  id: number;
  title: string;
  salary: number;
  category_name: string;
};

// サーバーサイドでデータを取得
export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/jobs', {
    cache: "no-store", // キャッシュを無効化
  });
  const data: Job[] = await res.json();

  return {
    props: {
      jobs: data, // サーバーサイドで取得したデータをpropsとして渡す
    },
  };
}

type HomeProps = {
  jobs: Job[];
};

export default function Home({ jobs }: HomeProps) {
  return (
    <div className="flex">
      <JobPage jobs={jobs} />
    </div>
  );
}