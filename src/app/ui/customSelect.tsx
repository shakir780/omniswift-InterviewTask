"use client";

import React from "react";
import { BiChevronDown } from "react-icons/bi";
import { Listbox } from "@headlessui/react";

interface CustomSelectProps {
  label: string;
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  selected,
  setSelected,
}) => {
  return (
    <div className="relative border rounded-lg w-[200px] lg:w-[312px]">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative w-full">
          <label className="absolute z-30 -top-2 left-4 bg-white px-3 text-sm font-medium text-[#343434]">
            {label}
          </label>
          <Listbox.Button className="relative w-full bg-white text-gray-700 px-4 py-3 text-left rounded-md flex justify-between items-center">
            <span className="text-gray-400">
              {selected || `Select ${label}`}
            </span>
            <BiChevronDown className="h-5 w-5 text-gray-500" />
          </Listbox.Button>
        </div>

        <Listbox.Options className="absolute z-50 w-full mt-1 border border-gray-300 bg-white rounded-md shadow-lg">
          {options.length > 0 ? (
            options.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                className={({ active }) =>
                  `px-4 py-2 cursor-pointer ${
                    active ? "bg-blue-500 text-white" : "text-gray-700"
                  }`
                }
              >
                {option}
              </Listbox.Option>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No options available</div>
          )}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default CustomSelect;
