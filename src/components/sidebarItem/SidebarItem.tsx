"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiBookmarkCheck } from "react-icons/ci";

interface Props {
  itemName: string;
  path: string;
}
// className: text-white bg-gradient-to-r from-sky-600 to-cyan-400

export const SidebarItem = ({ itemName, path }: Props) => {
  const currentPath = usePathname();
  return (
    <li>
      <Link
        href={path}
        className={
          // currentPath === path
          // "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
          "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
        }
      >
        <CiBookmarkCheck size={30} />
        <span className="-mr-1 font-medium">{itemName}</span>
      </Link>
    </li>
  );
};
