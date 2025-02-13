import Image from "next/image";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingSharp,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { SidebarItem } from "../sidebarItem/SidebarItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { LogOutButton } from "./LogOutButton";

const menuItems = [
  {
    icon: <IoCalendarOutline />,
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <IoCheckboxOutline />,
    title: "Rest TODOS",
    path: "/dashboard/rest-todos",
  },
  {
    icon: <IoListOutline />,
    title: "Server Actions",
    path: "/dashboard/server-todos",
  },
  {
    icon: <IoCodeWorkingSharp />,
    title: "Cookies",
    path: "/dashboard/cookies",
  },
  {
    icon: <IoBasketOutline />,
    title: "Products",
    path: "/dashboard/products",
  },
  {
    icon: <IoPersonOutline />,
    title: "Profile",
    path: "/dashboard/profile",
  }
];

export const Sidebar = async() => {

  const session = await getServerSession(authOptions) ;

  const avatarURL = (session?.user?.image)  ? session.user.image : "/images/image.png" ;
  const username = session?.user?.name || "No name";
 const userRole = session?.user?.roles || ["client"] ;


  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          {/* TODO: Next/Link hacia dashboard */}
          <Link href="/dashboard" title="Dashboard">
            {/* Next/Image */}
            <Image
              src="/images/next.svg"
              className="w-32"
              alt="tailus logo"
              width={150}
              height={150}
              priority={true}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          {/* Next/Image */}
          <Image
            src={avatarURL}
            alt=""
            width={150}
            height={150}
            priority={true}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {username}
          </h5>
          <span className="hidden text-gray-400 lg:block capitalize">{userRole.join(", ")}</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {/* TODO: src/components <SidebarItem /> */}
          {/* Active className: text-white bg-gradient-to-r from-sky-600 to-cyan-400 */}

          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogOutButton />
      </div>
    </aside>
  );
};
