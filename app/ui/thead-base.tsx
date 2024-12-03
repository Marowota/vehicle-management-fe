import { TableBaseProps } from "../lib/definitions";
import TableSortSvg from "./table-sort-svg";

export default function TheadBase({ className, children }: TableBaseProps) {
  return (
    <thead
      className={`text-xs text-blue-700 uppercase bg-blue-50 dark:bg-gray-700 dark:text-gray-400 sticky z-10 top-0 ${children}`}
    >
      <tr>{children}</tr>
    </thead>
  );
}
