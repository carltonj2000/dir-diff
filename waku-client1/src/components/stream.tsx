"use client";

import { useState } from "react";

export const Streams = () => {
  const [stream, streamSet] = useState("Nothing Yet");

  const handleStream = async () => {
    const res = await fetch("http://localhost:3333/source");
    const reader = res.body?.getReader();
    let done, value;
    while (reader && !done) {
      ({ value, done } = await reader.read());
      if (done) break;
      const data = new TextDecoder().decode(value);
      const items = data
        .split("\n")
        .filter((l) => l.length)
        .map((w) => w.split(" "))
        .flat();
      const j = await JSON.parse(items[items.length - 1]!);
      const r = { ...j, id: items[1] };
      if (data) streamSet(r);
    }
  };

  return (
    <section className="border-blue-400 -mx-4 mt-4 rounded border border-dashed p-4 flex flex-col">
      <button onClick={handleStream} className="border rounded-md py-1">
        Get Stream
      </button>
      <code>{JSON.stringify(stream, null, 2)}</code>
    </section>
  );
};
