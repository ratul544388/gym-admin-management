"use client";

import { DropDownMenu } from "@/components/dropdown-menu";
import { useQueryString } from "@/hooks/use-query-string";
import { capitalize } from "@/lib/utils";
import { Gender } from "@prisma/client";
import { useSearchParams } from "next/navigation";

export const TableGenderHeader = () => {
  const { push } = useQueryString();
  const searchParams = useSearchParams();
  const activeGender = searchParams
    .get("gender")
    ?.toUpperCase() as Gender;

  const items = Object.values(Gender).map((item) => {
    return {
      label: capitalize(item),
      active: activeGender === item,
      onClick: () => {
        console.log({activeGender, item})
        if (activeGender === item) {
          push({ gender: "" });
        } else {
          push({ gender: item });
        }
      },
    };
  });
  return <DropDownMenu showArrow items={items}>Gender</DropDownMenu>;
};
