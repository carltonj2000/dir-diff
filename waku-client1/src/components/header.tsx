import { Link } from "waku";

export const Header = () => {
  return (
    <header className="flex items-center gap-4 p-6 lg:fixed lg:left-0 lg:top-0 bg-gray-300 w-full justify-between">
      <h2 className="text-lg font-bold tracking-tight">
        <Link to="/">Dir Diff</Link>
      </h2>
      <Link to="/about" className="mt-4 inline-block underline">
        About
      </Link>
    </header>
  );
};
