"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useQuery from "src/hooks/useQuery";
import { useCreateTableRow } from "src/modules/table/table.service";

export default function Page({ params }) {
  const router = useRouter();
  const tableName = params.tablename;
  const { data: tableRes } = useQuery(`/api/tables/${tableName}`);
  const [createTableRow, { error: createTableError }] =
    useCreateTableRow(tableName);
  const tableSchema = tableRes?.data?.schema;

  const onSubmit = async (event) => {
    event.preventDefault();
    const elements = [...event.target.elements];
    const valuesObj = elements.reduce((accum, cur) => {
      if (cur?.name && cur.value !== "") {
        return {
          ...accum,
          [cur.name]: cur.value,
        };
      }
      return accum;
    }, {});
    const res = await createTableRow(valuesObj);

    if (res.status < 400) {
      router.push(`/t/${tableName}`);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-bold">{tableName}</h1>
      </div>
      {createTableError?.error && (
        <div className="text-red-500">{createTableError.error}</div>
      )}
      <form onSubmit={onSubmit}>
        <ul className="space-y-3 mb-8">
          {tableSchema?.map((col, index) => (
            <div key={index}>
              <label>
                <div>{col.column_name}</div>
                <input type="text" name={col.column_name} />
              </label>
            </div>
          ))}
        </ul>
        <button type="submit" className="border py-1 px-4">
          Submit
        </button>
      </form>
    </div>
  );
}
