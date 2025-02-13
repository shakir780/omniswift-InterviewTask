"use client";

import FiltersForm from "@/components/filtersForm";
import StudentsTable from "@/components/StudentTable";
import { useEffect, useState } from "react";
import { fetchAllData, filterData } from "./services/api";
import { FilterParams, Student } from "./types";

export default function Page() {
  const [filteredData, setFilteredData] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetchAllData();
        setFilteredData(response?.data?.students || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const handleFilter = async (filters: FilterParams): Promise<void> => {
    setLoading(true);
    try {
      const response: Student[] = await filterData(filters);
      setFilteredData(response || []);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <FiltersForm onFilter={handleFilter} />
      <StudentsTable data={filteredData} loading={loading} />
    </>
  );
}
