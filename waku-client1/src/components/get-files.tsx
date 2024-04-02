"use client";

import { useState } from "react";

export const GetFiles = () => {
  const [file, fileSet] = useState([]);

  const handleFiles = async () => {
    const res = await fetch("http://localhost:3333/files");
    const j = await res.json();
    fileSet(j);
  };

  return (
    <section className="border-blue-400 -mx-4 mt-4 rounded border border-dashed p-4 flex flex-col">
      <button onClick={handleFiles} className="border rounded-md py-1">
        Get Files
      </button>
      <code>
        <pre>{JSON.stringify(file, null, 2)}</pre>
      </code>
    </section>
  );
};
