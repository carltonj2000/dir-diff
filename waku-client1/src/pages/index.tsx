import { GetFiles } from "../components/get-files.js";
import { Streams } from "../components/stream.js";

export default async function HomePage() {
  const data = await getData();

  return (
    <div>
      <title>{data.title}</title>
      <h1 className="text-4xl font-bold tracking-tight">{data.headline}</h1>
      <p>{data.body}</p>
      <p>{data.version}</p>
      <Streams />
      <GetFiles />
    </div>
  );
}

const getData = async () => {
  const data = {
    title: "Dir Diff",
    headline: "Dir Diff",
    body: "Carlton's Diff Program!",
  };

  const res = await fetch("http://localhost:3333/version");
  const version = await res.json();
  return { ...data, ...version };
};

export const getConfig = async () => {
  return {
    render: "static",
  };
};
