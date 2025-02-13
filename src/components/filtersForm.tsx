"use client";

import React, { useEffect, useState } from "react";
import {
  fetchAges,
  fetchGenders,
  fetchLevels,
  fetchStates,
} from "@/app/services/api";
import CustomSelect from "@/app/ui/customSelect";
import { FiltersFormProps } from "@/app/types";

const FiltersForm: React.FC<FiltersFormProps> = ({ onFilter }) => {
  const [ages, setAges] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);

  const [selectedAge, setSelectedAge] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const ageResponse = await fetchAges();
        const stateResponse = await fetchStates();
        const levelResponse = await fetchLevels();
        const genderResponse = await fetchGenders();

        setAges(
          ageResponse.data.map((item: { age: number }) => String(item.age))
        );
        setStates(
          stateResponse.data.map((item: { name: string }) => item.name)
        );
        setLevels(
          levelResponse.data.map((item: { level: string }) => item.level)
        );
        setGenders(
          genderResponse.data.map((item: { gender: string }) => item.gender)
        );
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  const handleSearch = () => {
    onFilter({
      age: selectedAge,
      state: selectedState,
      level: selectedLevel,
      gender: selectedGender,
    });
  };

  return (
    <div className="py-[44px] px-[28px] bg-white">
      <span className="text-[#616161] font-normal text-2xl">
        Filter Student Table By:
      </span>
      <div className="flex lg:justify-start">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-[56px] gap-[48px]">
          <CustomSelect
            label="Age"
            options={ages}
            selected={selectedAge}
            setSelected={setSelectedAge}
          />
          <CustomSelect
            label="State"
            options={states}
            selected={selectedState}
            setSelected={setSelectedState}
          />
          <CustomSelect
            label="Level"
            options={levels}
            selected={selectedLevel}
            setSelected={setSelectedLevel}
          />
          <CustomSelect
            label="Gender"
            options={genders}
            selected={selectedGender}
            setSelected={setSelectedGender}
          />

          <button
            onClick={handleSearch}
            className="bg-[#46C35F] rounded-[4px]  w-[200px] lg:w-[312px] h-[50px] text-white"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersForm;
