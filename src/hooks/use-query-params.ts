import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useLoadingStore } from "./use-loading-store";
import { useEffect } from "react";

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useLoadingStore();

  const setQueryParams = ({
    query,
    clearCurrentQuery,
    toggleIfSame = true,
    enableLoading = true,
  }: {
    query: Record<string, string | number>;
    clearCurrentQuery?: boolean;
    toggleIfSame?: boolean;
    enableLoading?: boolean;
  }) => {
    if (enableLoading) {
      setIsLoading(true);
    }
    const currentQuery = clearCurrentQuery
      ? {}
      : qs.parse(searchParams.toString());


    if (toggleIfSame) {
      Object.entries(query).forEach(([key, value]) => {
        const currentValue = currentQuery[key];
        if (currentValue === value) {
          delete query[key];
          delete currentQuery[key];
        }
      });
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          ...currentQuery,
          ...query,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return { setQueryParams };
};
