"use client";

import React, { useState } from "react";
import Link from "next/link";
import useQuery from "src/hooks/useQuery";
import CloseIcon from "src/icons/close.svg";
import PencilIcon from "src/icons/pencil.svg";

const Sidebar = ({ toggleSidebar }) => {
  const { data: tableRes, loading, error } = useQuery("/api/tables");

  const tables = tableRes?.data?.rows;
  return (
    <aside className={`sidebar px-8 pt-8 relative`}>
      <div className="mb-8">
        <Link href="/" className="flex items-center">
          Admin Dashboard
        </Link>
      </div>
      <button
        onClick={toggleSidebar}
        className="top-2 right-2 absolute text-gray-300 hover:text-white transition"
      >
        <CloseIcon className="scale-75" />
      </button>
      <Link
        href="/sql"
        className="mb-6 flex items-center text-sm border-b border-gray-600 pb-6"
      >
        <PencilIcon className="mr-2 w-4" />
        SQL
      </Link>
      <h3 className="uppercase text-xs text-gray-400 mb-4">Tables</h3>
      {loading && <div className="text-gray-300">loading...</div>}
      {error && <div className="text-red-500">{JSON.stringify(error)}</div>}
      {/* <Link href="/connections">Connections</Link> */}
      <ul className="space-y-3">
        {tables?.map((table) => (
          <li key={table.table_name}>
            <Link href={`/t/${table.table_name}`}>{table.table_name}</Link>
          </li>
        ))}
        {/* <li>
          <Link href="/">Dashboard</Link>
        </li>
        <li>
          <Link href="/">Fan Lounge</Link>
        </li>
        <li>
          <Link href="/">Journey</Link>
        </li>
        <li>
          <Link href="/">Academy</Link>
        </li> */}
      </ul>
    </aside>
  );
};

export default Sidebar;
