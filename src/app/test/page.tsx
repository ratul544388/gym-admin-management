"use client";

import { useState } from "react";
import { SelectOptions, SelectValue, TestSelect } from "./test-select";

const Page = () => {
  const [value, setValue] = useState<SelectValue | undefined>([]);
  const selectOptions: SelectOptions = [
    "Apple",
    "Banana",
    "Coconut",
    "Date",
    "Eggplant",
  ];

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <TestSelect
        options={selectOptions}
        value={value}
        onChange={setValue}
        placeholder="Select a Fruit"
        className="w-[260px]"
        deselect
      />
    </div>
  );
};

export default Page;
