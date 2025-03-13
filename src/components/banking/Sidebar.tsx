import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
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

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 bg-primary text-primary-foreground flex-col shadow-lg">
      <div className="p-6 border-b border-primary-foreground/10">
        <h2 className="text-2xl font-bold">بنك الأمان</h2>
        <p className="text-sm opacity-70">الخدمات المصرفية الشخصية</p>
      </div>

      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors my-1"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-primary-foreground/20">
        <button
          className="flex w-full items-center gap-3 px-3 py-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
          onClick={() => (window.location.href = "/")}
        >
          <LogOut className="h-5 w-5" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
