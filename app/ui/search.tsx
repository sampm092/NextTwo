"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // This function will wrap the contents of handleSearch, and only run the code after a specific time once the user has stopped typing (300ms).
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams); //take current URL parameter into params so we can edit it
    params.set('page','1'); // set page to the first page every time user search new word
    if (term) {
      params.set("query", term); // if theres any search 'words', add to URL: ?query='words'
    } else {
      params.delete("query"); // if input empty, erase parameter from url
    }
    replace(`${pathname}?${params.toString()}`); // rewrite url with pathname (/dashboard/invoices) and parameters (query='words'&page=1))
    console.log(`Searching... ${term}`);
  }, 300); //wait 300ms, then continue search process

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => { // make sure input detection done real time word per word
          handleSearch(e.target.value); // take the latest input
        }}
        defaultValue={searchParams.get("query")?.toString()} // take parameter from URL as a current input (if ?query=Book, then inside search input there'll be 'Book')
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
