import useMutation from "src/hooks/useMutation";

// export function createTableRow(tableName, valuesObj) {
//   return fetch(`/api/tables/${tableName}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(valuesObj),
//   });
// }

export function useCreateTableRow(tableName: string) {
  return useMutation(`/api/tables/${tableName}`);
}

export function useUpdateTableRow(tableName: string) {
  return useMutation(`/api/tables/${tableName}`, {
    method: "PATCH",
  });
}
