import { TableBaseProps } from "../lib/definitions";

export default function ThBase({ className, children }: TableBaseProps) {
  return (
    <th scope="col" className={`px-6 py-3 z-10 ${className}`}>
      {children}
    </th>
  );
}
