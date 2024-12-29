import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

export const useQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setQueryParams = ({
    query,
    clearCurrentQuery,
    toggleIfSame,
  }: {
    query: Record<string, string | number>;
    clearCurrentQuery?: boolean;
    toggleIfSame?: boolean;
  }) => {

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
      { skipEmptyString: true, skipNull: true},
    );

    router.push(url);
  };

  return setQueryParams;
};
