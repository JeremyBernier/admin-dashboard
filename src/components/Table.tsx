import { Hepta_Slab } from "next/font/google";
import React from "react";

// const Table = ({ headings, rows }: { headings?: string[]; rows: any[][] }) => {
//   return (
//     <table className="table-auto w-full">
//       {headings?.length && (
//         <thead className="font-bold text-left bg-black">
//           <tr>
//             {headings?.map((heading, index) => (
//               <th key={index}>{heading}</th>
//             ))}
//           </tr>
//         </thead>
//       )}
//       <tbody>
//         {rows?.map((row, rowIndex) => (
//           <tr key={rowIndex}>
//             {row?.map((col, colIndex) => (
//               <td key={colIndex}>{col}</td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// import React from "react"

const Table = ({ headings, rows }: { headings?: string[]; rows: any[][] }) => {
  return (
    <div className="relative overflow-x-auto whitespace-nowrap text-ellipsis">
      <table
        className="w-full text-sm text-left text-gray-300"
        style={{
          maxWidth: "70vw",
          tableLayout: "fixed",
        }}
      >
        <thead
          className="text-xs text-gray-200"
          style={{
            backgroundColor: "rgb(32 28 101)",
          }}
        >
          <tr>
            {headings?.map((heading, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="bg-white border-b dark:border-gray-700"
              // style={{ backgroundColor: "hsl(0,0%,13%" }}
              style={{ background: "hsl(0,0%,9%)" }}
            >
              {row?.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 text-ellipsis whitespace-nowrap overflow-hidden"
                >
                  {col}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// export default Table;

export default Table;
