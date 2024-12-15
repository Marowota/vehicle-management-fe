import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import SvgLayoutControl from "./svg/svg-layout-control";
interface LayoutBtnProps {
  href: string;
  text: string;
  SvgComponent: React.ComponentType;
}

export default function LayoutBtn({
  href,
  text,
  SvgComponent,
}: LayoutBtnProps) {
  let pathname = usePathname();
  return (
    <Link
      href={href}
      className={clsx(
        "hover:bg-sky-50 rounded-md font-bold px-3 py-2 select-none cursor-pointer active:bg-sky-100 flex",
        {
          "bg-sky-200": pathname === href,
        }
      )}
    >
      <SvgComponent />
      <p className="text text-md text-blue-900 ">{text}</p>
    </Link>
  );
}
