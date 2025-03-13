import { Link, useLocation } from "react-router-dom";
import {
  Home,
  CreditCard,
  BarChart3,
  Send,
  PiggyBank,
  DollarSign,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "الرئيسية", href: "/bank" },
  { icon: CreditCard, label: "البطاقة", href: "/bank/visa" },
  { icon: CreditCard, label: "الحسابات", href: "/bank/accounts" },
  { icon: DollarSign, label: "العملات", href: "/bank/currencies" },
  { icon: Send, label: "التحويلات", href: "/bank/transfers" },
  { icon: BarChart3, label: "المعاملات", href: "/bank/transactions" },
  { icon: PiggyBank, label: "الادخار", href: "/bank/savings" },
];

export default function MobileBottomNav() {
  const location = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 right-0 left-0 bg-background border-t z-50 shadow-md">
      <nav className="flex justify-between px-1">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.href ||
            (item.href !== "/bank" && location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center py-2 px-3 ${isActive ? "text-primary font-medium" : "text-muted-foreground"}`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
