import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  BarChart3,
  CreditCard,
  Shield,
  AlertTriangle,
  Settings,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "الرئيسية", href: "/admin" },
  { icon: Users, label: "العملاء", href: "/admin/customers" },
  { icon: CreditCard, label: "الحسابات", href: "/admin/accounts" },
  { icon: BarChart3, label: "المعاملات", href: "/admin/transactions" },
  { icon: AlertTriangle, label: "التنبيهات", href: "/admin/alerts" },
  { icon: Shield, label: "الأمان", href: "/admin/security" },
];

export default function AdminMobileBottomNav() {
  const location = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 right-0 left-0 bg-background border-t z-50 shadow-md">
      <nav className="flex justify-between px-1">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.href ||
            (item.href !== "/admin" && location.pathname.startsWith(item.href));
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
