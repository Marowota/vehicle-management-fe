import classNamesConverter from "@/app/lib/utilities/class-name-converter";
import { useState } from "react";
import SvgSearch from "../svg/svg-search";

interface SearchBarProps {
  onSearch: (search: string) => void;
  inputClassName?: string;
  buttonClassName?: string;
}

export default function SearchBar({
  onSearch,
  inputClassName,
  buttonClassName,
}: SearchBarProps) {
  const [search, setSearch] = useState<string>("");

  let handleSearch = () => {
    onSearch(search);
  };

  return (
    <div className="flex">
      <input
        placeholder="Tìm kiếm"
        type="text"
        className={classNamesConverter(
          "w-96 h-10 shadow-sm p-2.5 text-sm bg-sky-50 border border-sky-300 placeholder:text-blue-300 text-blue-900 rounded-l-lg focus:border focus:ring-sky-500 focus:border-sky-900 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          inputClassName
        )}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <div
        className={classNamesConverter(
          "border h-10 px-2 py-1 cursor-pointer bg-sky-400 border-sky-500 hover:bg-sky-500 active:bg-sky-600 rounded-r-lg text-center items-center content-center shadow-sm",
          buttonClassName
        )}
        onClick={() => {
          handleSearch();
        }}
      >
        <div className="text-white text-sm drop-shadow-lg select-none">
          <SvgSearch className="stroke-white h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
