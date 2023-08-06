import { useState } from "react";
import { useUpdateTableRow } from "src/modules/table/table.service";

const DataTableRowEdit = ({
  row,
  headings,
  toggleEdit,
  tableName,
  primaryKeys,
}) => {
  const [updateTableRow] = useUpdateTableRow(tableName);

  const [inputsAltered, setInputsAltered] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    // const elements = [...event.target.elements].filter((el) => el.name !== "");
    const elements = [...event.target.elements];
    // console.log(elements.map((el) => [el.name, el.value]));

    const elementsObj = elements.reduce((accum, el, elIndex) => {
      if (el.name === "" || elIndex >= row.length) {
        return accum;
      }
      return {
        ...accum,
        [el.name]: el.value,
      };
    }, {});

    // doesn't work because numbers and undefined get converted to string and ''
    // const changedValues = elements.reduce((accum, el, elIndex) => {
    //   if (
    //     el.name === "" ||
    //     elIndex >= row.length ||
    //     row[elIndex] === el.value
    //   ) {
    //     return accum;
    //   }
    //   return {
    //     ...accum,
    //     [el.name]: el.value,
    //   };
    // }, {});

    const changedValues = Object.keys(inputsAltered).reduce(
      (accum, name) => ({
        ...accum,
        [name]: elementsObj[name],
      }),
      {}
    );

    if (primaryKeys?.length !== 1) {
      throw "Currently only supports 1 primary key";
    }

    // would fail if multiple primary keys with same name
    const primaryKey = primaryKeys[0];
    const keyColIndex = headings.findIndex(
      (heading) => heading.column_name === primaryKey
    );

    const res = await updateTableRow({
      ...changedValues,
      where: {
        [primaryKeys]: row[keyColIndex],
      },
    });

    // should only call this if successful
    toggleEdit();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="table-row bg-white border-b dark:border-gray-700 relative"
      // style={{ backgroundColor: "hsl(0,0%,13%" }}
      style={{ background: "hsl(0,0%,9%)" }}
    >
      {row?.map((col, colIndex) => {
        const colName = headings[colIndex].column_name;

        return (
          <div
            key={colIndex}
            className="table-cell px-6 py-4 text-ellipsis whitespace-nowrap overflow-hidden"
          >
            <input
              key={colIndex}
              name={colName}
              type="text"
              defaultValue={col}
              onChange={() =>
                setInputsAltered({ ...inputsAltered, [colName]: true })
              }
            />
            {colIndex === headings?.length - 1 && (
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

export default DataTableRowEdit;
