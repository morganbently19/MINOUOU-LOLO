import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileNav from "./MobileNav";
import MobileBottomNav from "./MobileBottomNav";
import FloatingActionButton from "./FloatingActionButton";
import NavigationMenu from "./NavigationMenu";

export default function BankLayout() {
  return (
    <div className="flex h-screen bg-gray-50 text-right" dir="rtl">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <MobileNav />
        <main className="flex-1 p-4 pb-20 md:pb-4 bg-gray-50/80 overflow-hidden">
          <Outlet />
        </main>
        <FloatingActionButton />
        <NavigationMenu />
      </div>
    </div>
  );
}
