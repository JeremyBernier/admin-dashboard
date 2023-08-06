"use client";

import useQuery from "src/hooks/useQuery";
import { useRouter } from "next/router";
import DataTable from "src/components/DataTable/DataTable";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCreateTableRow } from "src/modules/table/table.service";

export default function Page({ params }: { params: { tablename: string } }) {
  const tableName = params.tablename;

  const [isAddingRow, setIsAddingRow] = useState(false);

  const onClickAddingRow = (event) => {
    event.preventDefault();
    setIsAddingRow(!isAddingRow);
  };

  const {
    data: tableRes,
    loading,
    error,
  } = useQuery(`/api/tables/${tableName}`);
  const {
    rows: tableRows,
    schema: tableSchema,
    primaryKeys,
  } = tableRes?.data || {};
  const tableHeadings = tableSchema
    ? Object.values(tableSchema).map((val) => val.column_name)
    : [];
  const tableRowsArrRows = tableRows?.map((row) => Object.values(row));
  // const prependRow = isAddingRow ? [] : null;

  const rowBeingAdded = isAddingRow
    ? [...Array(tableHeadings.length).keys()]
    : undefined;

  const onClickCancel = () => setIsAddingRow(false);

  // const tableRowsArrRowsFinal = useMemo(() => {
  //   if (isAddingRow) {
  //     return [
  //       [...Array(tableHeadings.length).keys()].map((x) => (
  //         <input key={x} type="text" />
  //       )),
  //       ...tableRowsArrRows,
  //     ];
  //   }
  //   return tableRowsArrRows;
  // }, [isAddingRow, tableHeadings, tableRowsArrRows]);
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">{tableName}</h1>
      <div className="mb-4">
        <div className="flex gap-4">
          <Link
            href={`/t/${tableName}/new`}
            onClick={onClickAddingRow}
            className="border border-slate-600 py-1 px-2 text-sm hover:bg-slate-800 transition"
          >
            + Add a row
          </Link>
          {isAddingRow && (
            <Link
              className="border border-slate-600 py-1 px-2 text-sm hover:bg-slate-800 transition"
              href={`/t/${tableName}/new`}
            >
              Open in new window
            </Link>
          )}
        </div>
        {/* {isAddingRow && <CreateRowComponent schema={tableSchema} />} */}
      </div>
      {loading && <div>loading...</div>}
      {!loading && !error && (
        <>
          {tableHeadings?.length > 0 ? (
            <>
              <DataTable
                schema={tableSchema}
                rows={tableRowsArrRows}
                primaryKeys={primaryKeys?.map((key) => key?.attname)}
                tableName={tableName}
                rowBeingAdded={rowBeingAdded}
                onClickCancel={onClickCancel}
              />
              {tableRows?.length <= 0 && (
                <div className="mt-4">Table is empty</div>
              )}
            </>
          ) : (
            <div>No data</div>
          )}
        </>
      )}
      {/* {tableColumns?.map((column, index) => (
          <div>{column.column_name}</div>
        ))} */}
    </div>
  );
}
