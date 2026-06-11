import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

export default function DashboardLayouts() {
  return (
    <div className="min-h-screen bg-black flex text-white">
      <div className="w-[300px] h-[100px] sticky top-0 bg-pink-500"></div>
      {/*Side Bar */}
      <aside className="w-64 border-zinc-900 bg-zinc-900/60 p-6 shrink-0">
        <Sidebar />
      </aside>
      {/*Page Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
