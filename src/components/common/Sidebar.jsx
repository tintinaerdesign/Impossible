import { useState } from "react";
import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  Briefcase,
  ListOrdered,
  Star,
  Bell,
  Newspaper,
  GraduationCap,
  Calculator,
} from "lucide-react";

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      key: "dashboard",
      path: "/dashboard",
    },
    {
      name: "Portfolio",
      icon: Briefcase,
      key: "portfolio",
      path: "/portfolio",
    },
    {
      name: "Coin List",
      icon: ListOrdered,
      key: "coinlist",
      path: "/coinlist",
    },
    {
      name: "Watchlist",
      icon: Star,
      key: "watchlist",
      path: "/watchlist",
    },
    {
      name: "Price Alert",
      icon: Bell,
      key: "pricealert",
      path: "/pricealert",
    },
    {
      name: "News",
      icon: Newspaper,
      key: "news",
      path: "/news",
    },
    {
      name: "Learning",
      icon: GraduationCap,
      key: "learning",
      path: "/learning",
    },
    {
      name: "DCA Calculator",
      icon: Calculator,
      key: "calculator",
      path: "/calculator",
    },
  ];

  return (
    <aside className="space-y-1.5">
      {menuItems.map((item) => {
        const IconComponent = item.icon;

        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setActiveMenu(item.key)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-200 border ${
              activeMenu === item.key
                ? "bg-zinc-900/60 text-pink-500 border-zinc-800"
                : "text-zinc-500 border-transparent hover:text-zinc-200 hover:bg-zinc-900/30"
            }`}
          >
            <IconComponent
              size={18}
              strokeWidth={0.5}
              className={
                activeMenu === item.key ? "text-pink-500" : "text-zinc-500"
              }
            />

            {item.name}
          </Link>
        );
      })}
    </aside>
  );
}
