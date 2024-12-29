"use client";

import { DropDownMenu } from "@/components/dropdown-menu";
import { useQueryParams } from "@/hooks/use-query-params";
import { capitalize } from "@/lib/utils";
import { Gender } from "@prisma/client";
import { useSearchParams } from "next/navigation";

export const TableGenderHeader = () => {
  const setQueryParams = useQueryParams();
  const searchParams = useSearchParams();
  const activeGender = searchParams.get("gender")?.toUpperCase() as Gender;

  const items = Object.values(Gender).map((item) => {
    return {
      label: capitalize(item),
      active: activeGender === item,
      onClick: () => {
        setQueryParams({
          query: { gender: item.toLowerCase() },
          toggleIfSame: true,
        });
      },
    };
  });
  return (
    <DropDownMenu showArrow items={items}>
      Gender
    </DropDownMenu>
  );
};
