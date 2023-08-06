import React, { useState } from "react";
import DataTableRow from "./DataTableRow";
import RowBeingInserted from "./RowBeingInserted";

const DataTable = ({
  rows,
  rowBeingAdded,
  schema,
  primaryKeys,
  tableName,
  onClickCancel,
}: {
  rows: any[][];
  rowBeingAdded?: any[];
  schema: any;
  primaryKeys: string[];
  tableName: any;
  onClickCancel: any;
}) => {
  const headings = schema ? Object.values(schema) : [];
  // const [newRowState, setNewRowState] = useState({});
  // console.log("newRowState", newRowState);

  return (
    <div className="relative overflow-x-auto whitespace-nowrap text-ellipsis">
      <div
        className="table w-full text-sm text-left text-gray-300"
        style={{
          maxWidth: "70vw",
          tableLayout: "fixed",
        }}
      >
        <div
          className="table-header-group text-xs text-gray-200"
          style={{
            backgroundColor: "rgb(32 28 101)",
          }}
        >
          <div className="table-row">
            {headings?.map((heading, index) => (
              <div key={index} scope="col" className="table-cell px-6 py-3">
                {heading.column_name}
                <span className="text-gray-500 text-xs ml-2">{`(${heading.data_type.substring(
                  0,
                  4
                )})`}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="table-row-group">
          {rowBeingAdded?.length && (
            <RowBeingInserted
              rowBeingAdded={rowBeingAdded}
              headings={headings}
              toggleEdit={onClickCancel}
              tableName={tableName}
            />
          )}
          {rows?.map((row, rowIndex) => (
            <DataTableRow
              key={rowIndex}
              headings={headings}
              primaryKeys={primaryKeys}
              row={row}
              rowIndex={rowIndex}
              tableName={tableName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
