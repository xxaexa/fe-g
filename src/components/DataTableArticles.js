"use client";

import React, { useMemo } from "react";
import { useTable } from "react-table";
import Link from "next/link";

const DataTable = ({ data }) => {
  const handleDelete = (rowNo) => {
    alert(`Delete row number ${rowNo}`);
  };

  const handleUpdate = (rowNo) => {
    alert(`Update row number ${rowNo}`);
  };

  const tableColumns = useMemo(() => {
    return [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleUpdate(row.original.id)}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Update
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={() => handleDelete(row.original.id)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ];
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: tableColumns,
      data,
    });

  return (
    <div className="overflow-x-auto">
      <table
        {...getTableProps()}
        className="min-w-full bg-white border dark:bg-gray-900 dark:text-white border-gray-200 text-black"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="border-b text-left py-2 px-4"
                  key={column.id}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="hover:bg-gray-100 hover:dark:bg-gray-800"
                key={row.id}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="border-b border-gray-200 py-2 px-4"
                    key={cell.column.id}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
