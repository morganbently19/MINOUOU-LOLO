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
    <div className="md:hidden bg-gradient-to-r from-primary to-accent w-full">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-[85%] max-w-sm p-0 border-none"
          dir="rtl"
        >
          <div className="bg-gradient-to-r from-primary to-accent text-white p-6">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-12 w-12 border-2 border-white/30 shadow-lg">
                <AvatarFallback className="bg-white/10 text-white font-medium">
                  أم
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">بنك الأمان</h2>
                <p className="text-sm opacity-80">الخدمات المصرفية الشخصية</p>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-background py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-all duration-200 my-1"
                    onClick={() => setOpen(false)}
                  >
                    <span className="bg-primary/10 text-primary p-2 rounded-lg">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border-t bg-background">
            <button
              className="flex w-full items-center gap-3 px-4 py-3 rounded-xl hover:bg-destructive/10 text-destructive transition-all duration-200"
              onClick={() => {
                setOpen(false);
                window.location.href = "/";
              }}
            >
              <span className="bg-destructive/10 p-2 rounded-lg">
                <LogOut className="h-5 w-5" />
              </span>
              <span className="font-medium">تسجيل الخروج</span>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
