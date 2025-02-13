"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import Spinner from "./spinner";

interface CustomTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  loading: boolean;
}

const CustomTable = <T extends object>({
  data,
  loading,
  columns,
}: CustomTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="py-[44px] px-[28px] mt-[43px] bg-white">
      <div className="overflow-x-auto overflow-y-scroll h-[432px] custom-scrollbar">
        {loading ? (
          <div className="text-center py-4">
            <Spinner />
          </div>
        ) : data.length ? (
          <table className="min-w-full border-b border-[#ECECEC] bg-white  rounded-lg">
            <thead className="bg-[#F9F9FA]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border-b px-[24px] py-[15px] text-[#343434] text-left text-sm font-bold"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border-b text-sm text-[#343434] font-normal px-[24px] py-[11px]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-4">No data found.</p>
        )}
      </div>
    </div>
  );
};

export default CustomTable;
