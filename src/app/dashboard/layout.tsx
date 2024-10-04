// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { Sidebar, SidebarItem, TopMenu } from "@/components";
import DashboardPage from "./page";
import { WidgetItem } from "../../components/widgetItem/WidgetItem";

const items = [
  {
    itemName: "Dashboard",
    path: "/dashboard",
  },
  {
    itemName: "Categories",
    path: "/categories",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar>
        {items.map((item) => (
          <SidebarItem
            key={item.itemName}
            itemName={item.itemName}
            path={item.path}
          />
        ))}
      </Sidebar>

      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu />
        <div className="px-6 pt-6">{children}</div>
      </div>
    </>
  );
}
