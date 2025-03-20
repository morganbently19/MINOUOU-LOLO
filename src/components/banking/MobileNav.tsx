import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Home,
  CreditCard,
  BarChart3,
  Send,
  PiggyBank,
  Settings,
  HelpCircle,
  LogOut,
  DollarSign,
  Menu,
  Bell,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "الرئيسية", href: "/bank" },
  { icon: CreditCard, label: "البطاقة", href: "/bank/visa" },
  { icon: CreditCard, label: "الحسابات", href: "/bank/accounts" },
  { icon: DollarSign, label: "العملات الأجنبية", href: "/bank/currencies" },
  { icon: Send, label: "التحويلات", href: "/bank/transfers" },
  { icon: BarChart3, label: "المعاملات", href: "/bank/transactions" },
  { icon: PiggyBank, label: "الادخار", href: "/bank/savings" },
  { icon: Settings, label: "الإعدادات", href: "/bank/settings" },
  { icon: HelpCircle, label: "المساعدة", href: "/bank/help" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden bg-[#0c4a6e] w-full">
      <div className="flex items-center justify-between p-4 border-b bg-[#0c4a6e] text-white shadow-sm w-full">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/10 text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85%] max-w-sm p-0" dir="rtl">
            <div className="bg-[#0c4a6e] text-white p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold">بنك الأمان</h2>
              <p className="text-sm opacity-70">الخدمات المصرفية الشخصية</p>
            </div>
            <div className="flex-1 bg-[#0c4a6e] text-white py-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors my-1"
                      onClick={() => setOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 border-t border-white/20 bg-[#0c4a6e] text-white">
              <button
                className="flex w-full items-center gap-3 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                onClick={() => {
                  setOpen(false);
                  window.location.href = "/";
                }}
              >
                <LogOut className="h-5 w-5" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          </SheetContent>
        </Sheet>

        <h1 className="text-xl font-bold text-white">بنك الأمان</h1>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 relative text-white"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <Avatar className="h-8 w-8 border border-white/20">
            <AvatarFallback className="text-xs bg-white/10 text-white font-medium">
              أم
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
