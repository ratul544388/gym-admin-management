"use client";

import { useQueryParams } from "@/hooks/use-query-params";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { VIEW_PER_PAGE } from "@/constants";

interface PaginationProps {
  dataCount: number;
  className?: string;
}

export const Pagination = ({ className, dataCount }: PaginationProps) => {
  const pages = Math.ceil(dataCount / VIEW_PER_PAGE);
  const searchParams = useSearchParams();
  const { setQueryParams } = useQueryParams();

  if (pages < 2) {
    return null;
  }

  const currentPage = Number(searchParams.get("page")) || 1;

  let maxPageButtons = pages >= 5 ? 5 : pages || 1;
  let startPage = currentPage - 3 <= 0 ? 1 : currentPage - 3;
  if (currentPage >= pages) {
    startPage = currentPage - 4 <= 1 ? 1 : currentPage - 4;
  }

  const handleClick = (page: number) => {
    if (page === currentPage) return;
    setQueryParams({ query: { page } });
  };

  const showJumpAheadButton = pages > 5 && pages > currentPage + 1;
  const showJumpBackButton = pages > 5 && currentPage > 4;

  if (showJumpAheadButton && showJumpBackButton) {
    maxPageButtons = 3;
    startPage = currentPage - 1;
  }

  const handleJumpAhead = () => {
    if (currentPage + 5 > pages) {
      handleClick(pages);
    } else {
      handleClick(currentPage + 5);
    }
  };

  const handleJumpBack = () => {
    if (currentPage - 5 <= 0) {
      handleClick(1);
    } else {
      handleClick(currentPage - 5);
    }
  };

  return (
    <div
      className={cn(
        "xs:gap-2 bg-background mx-auto flex w-fit items-center gap-1.5 rounded-full px-3 py-2 shadow-md border border-dashed",
        className
      )}
    >
      <Button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        variant="ghost"
        size="icon"
        className="size-8 rounded-full"
      >
        <ChevronLeft className="size-4" />
      </Button>
      {showJumpBackButton && (
        <>
          <Button
            onClick={() => handleClick(1)}
            variant="ghost"
            size="icon"
            className="group size-8 rounded-full"
          >
            1
          </Button>
          <Button
            onClick={handleJumpBack}
            variant="ghost"
            size="icon"
            className="group size-8 rounded-full text-muted-foreground"
          >
            <MoreHorizontal className="size-4 group-hover:hidden" />
            <ChevronsLeft className="hidden size-4 group-hover:block" />
          </Button>
        </>
      )}
      {Array.from({ length: maxPageButtons }).map((_, index) => {
        const page = startPage + index;
        const isActive = currentPage === page;
        const variant = isActive ? "default" : "ghost";
        return (
          <Button
            onClick={() => handleClick(page)}
            key={index}
            variant={variant}
            size="icon"
            className="size-8 rounded-full"
          >
            {page}
          </Button>
        );
      })}
      {showJumpAheadButton && (
        <>
          <Button
            onClick={handleJumpAhead}
            variant="ghost"
            size="icon"
            className="group size-8 rounded-full text-muted-foreground"
          >
            <MoreHorizontal className="size-4 group-hover:hidden" />
            <ChevronsRight className="hidden size-4 group-hover:block" />
          </Button>
          <Button
            onClick={() => handleClick(pages)}
            variant="ghost"
            size="icon"
            className="group size-8 rounded-full"
          >
            {pages}
          </Button>
        </>
      )}
      <Button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === (pages || 1)}
        variant="ghost"
        size="icon"
        className="size-8 rounded-full"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
};
