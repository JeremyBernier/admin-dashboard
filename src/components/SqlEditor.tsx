"use client";
import React, { useState } from "react";

const SqlEditor = () => {
  const [sql, setSql] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();

    if (sql === "") {
      return;
    }

    const res = await fetch(`/api/sql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql }),
    });

    const json = await res.json();
  };
  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-4xl mx-auto mt-12">
      <div>
        <h1>SQL</h1>
      </div>
      <div>
        <textarea
          className="bg-transparent border w-full h-48 py-3 px-4"
          value={sql}
          onChange={(event) => setSql(event.target.value)}
        />
      </div>
      <button type="submit" className="input text-sm">
        Run SQL Query
      </button>
    </form>
  );
};

export default SqlEditor;
