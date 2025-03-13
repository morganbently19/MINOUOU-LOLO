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
  User,
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
    <div className="md:hidden">
      <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85%] max-w-sm p-0" dir="rtl">
            <div className="bg-primary text-primary-foreground p-6">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-12 w-12 border-2 border-primary-foreground">
                  <AvatarFallback className="text-lg">أم</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">أحمد محمد</h3>
                  <p className="text-sm opacity-80">عميل مميز</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-primary-foreground/10 rounded-md p-2">
                  <p className="text-xs opacity-80">الرصيد الكلي</p>
                  <p className="font-bold">125,000</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-md p-2">
                  <p className="text-xs opacity-80">الدولار</p>
                  <p className="font-bold">5,200</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-md p-2">
                  <p className="text-xs opacity-80">اليورو</p>
                  <p className="font-bold">4,800</p>
                </div>
              </div>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="flex items-center gap-3 px-3 py-3 rounded-md hover:bg-muted transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <item.icon className="h-5 w-5 text-primary" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
                <li className="mt-6 pt-6 border-t">
                  <button
                    className="flex w-full items-center gap-3 px-3 py-3 rounded-md hover:bg-muted transition-colors text-destructive"
                    onClick={() => {
                      setOpen(false);
                      window.location.href = "/";
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>تسجيل الخروج</span>
                  </button>
                </li>
              </ul>
            </nav>
          </SheetContent>
        </Sheet>

        <h1 className="text-xl font-bold text-primary">بنك الأمان</h1>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10 relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          <Avatar className="h-8 w-8 border border-primary/20">
            <AvatarFallback className="text-xs bg-primary/10 text-primary font-medium">
              أم
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
