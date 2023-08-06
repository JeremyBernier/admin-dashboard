import React, { useState } from "react";
import DataTableRowEdit from "./DataTableRowEdit";

const DataTableRowView = ({ row, headings, onClickEdit }) => {
  return (
    <div
      className="table-row bg-white border-b dark:border-gray-700 relative"
      // style={{ backgroundColor: "hsl(0,0%,13%" }}
      style={{ background: "hsl(0,0%,9%)" }}
    >
      {row?.map((col, colIndex) => (
        <div
          key={colIndex}
          className="table-cell px-6 py-4 text-ellipsis whitespace-nowrap overflow-hidden"
        >
          {String(col)}
          {colIndex === headings?.length - 1 && (
            <div className="absolute top-1/2 right-0 -translate-y-1/2">
              <button onClick={onClickEdit}>✏️</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const DataTableRow = ({
  row,
  rowIndex,
  headings,
  tableName,
  primaryKeys,
}) => {
  const [editing, setEditing] = useState(false);

  const toggleEdit = (event) => {
    setEditing(!editing);
  };

  if (editing) {
    return (
      <DataTableRowEdit
        key={rowIndex}
        row={row}
        headings={headings}
        toggleEdit={toggleEdit}
        tableName={tableName}
        primaryKeys={primaryKeys}
      />
    );
  }

  return (
    <DataTableRowView
      key={rowIndex}
      row={row}
      headings={headings}
      onClickEdit={toggleEdit}
    />
  );
};

export default DataTableRow;
