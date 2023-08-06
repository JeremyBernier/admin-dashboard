import React from "react";
import { useCreateTableRow } from "src/modules/table/table.service";

const RowBeingInserted = ({
  rowBeingAdded,
  headings,
  toggleEdit,
  tableName,
}) => {
  const [createTableRow] = useCreateTableRow(tableName);

  const onClickSaveNewRow = async (valuesObj) => {
    // const valuesObj = rowBeingAdded?.reduce(
    //   (accum, cur, index) => ({ ...accum, [tableHeadings[index]]: cur }),
    //   {}
    // );

    const res = await createTableRow(valuesObj);

    // should only call this if successful
    toggleEdit();
  };

  const onSubmit = (event) => {
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
    onClickSaveNewRow(valuesObj);
  };

  return (
    <form
      onSubmit={onSubmit}
      key="row-adding"
      className="table-row bg-white border-b dark:border-gray-700 relative"
      // style={{ backgroundColor: "hsl(0,0%,13%" }}
      style={{ background: "hsl(0,0%,9%)" }}
    >
      {rowBeingAdded?.map((col, colIndex) => {
        const colName = headings[colIndex].column_name;

        return (
          <div
            key={colIndex}
            className="table-cell px-6 py-4 text-ellipsis whitespace-nowrap overflow-hidden"
          >
            <input
              key={colIndex}
              name={colName}
              // value={rowBeingAdded[colName] || ""}
              // onChange={(event) =>
              //   setNewRowState({
              //     ...newRowState,
              //     [colName]: event.target.value,
              //   })
              // }
            />
            {colIndex === rowBeingAdded?.length - 1 && (
              <div className="absolute top-1/2 right-0 -translate-y-1/2">
                <button onClick={toggleEdit}>❌</button>
                <button type="submit">✔️</button>
              </div>
            )}
          </div>
        );
      })}
    </form>
  );
};

export default RowBeingInserted;
