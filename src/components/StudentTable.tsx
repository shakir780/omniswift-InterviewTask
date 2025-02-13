"use client";

import { useMemo } from "react";
import { downloadResult } from "@/app/services/api";
import { Student, StudentsTableProps } from "@/app/types";
import CustomTable from "@/app/ui/customTable";
import { Row } from "@tanstack/react-table";

const StudentsTable: React.FC<StudentsTableProps> = ({ data, loading }) => {
  const columns = useMemo(
    () => [
      { header: "S/N", accessorKey: "id" },
      { header: "Surname", accessorKey: "surname" },
      { header: "First Name", accessorKey: "firstname" },
      { header: "Age", accessorKey: "age" },
      { header: "Gender", accessorKey: "gender" },
      { header: "Level", accessorKey: "level" },
      { header: "State", accessorKey: "state" },
      {
        header: "Action",
        id: "action",
        cell: ({ row }: { row: Row<Student> }) => (
          <button
            onClick={() => downloadResult(row.original.id)}
            className="bg-green-500 text-white px-4 py-3"
          >
            Download Result
          </button>
        ),
      },
    ],
    []
  );

  return <CustomTable data={data} columns={columns} loading={loading} />;
};

export default StudentsTable;
