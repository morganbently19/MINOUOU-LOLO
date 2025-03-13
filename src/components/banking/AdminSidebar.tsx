import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  BarChart3,
  CreditCard,
  Settings,
  Shield,
  AlertTriangle,
  LogOut,
  DollarSign,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "لوحة التحكم", href: "/admin" },
  { icon: Users, label: "العملاء", href: "/admin/customers" },
  { icon: CreditCard, label: "الحسابات", href: "/admin/accounts" },
  { icon: BarChart3, label: "المعاملات", href: "/admin/transactions" },
  { icon: DollarSign, label: "العملات", href: "/admin/currencies" },
  { icon: AlertTriangle, label: "التنبيهات", href: "/admin/alerts" },
  { icon: Shield, label: "الأمان", href: "/admin/security" },
  { icon: Settings, label: "الإعدادات", href: "/admin/settings" },
];

export default function AdminSidebar() {
  return (
    <aside className="hidden md:flex w-64 bg-primary text-primary-foreground flex-col shadow-lg">
      <div className="p-6 border-b border-primary-foreground/10">
        <h2 className="text-2xl font-bold">بنك الأمان</h2>
        <p className="text-sm opacity-70">لوحة تحكم المدير</p>
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
