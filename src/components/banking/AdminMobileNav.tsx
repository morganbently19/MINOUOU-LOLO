import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Home,
  Users,
  BarChart3,
  CreditCard,
  Settings,
  Shield,
  AlertTriangle,
  LogOut,
  Menu,
  Bell,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "لوحة التحكم", href: "/admin" },
  { icon: Users, label: "العملاء", href: "/admin/customers" },
  { icon: CreditCard, label: "الحسابات", href: "/admin/accounts" },
  { icon: BarChart3, label: "المعاملات", href: "/admin/transactions" },
  { icon: AlertTriangle, label: "التنبيهات", href: "/admin/alerts" },
  { icon: Shield, label: "الأمان", href: "/admin/security" },
  { icon: Settings, label: "الإعدادات", href: "/admin/settings" },
];

export default function AdminMobileNav() {
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
                  <AvatarFallback className="text-lg bg-primary-foreground/10">
                    <Shield className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">مدير النظام</h3>
                  <p className="text-sm opacity-80">مدير</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-primary-foreground/10 rounded-md p-2">
                  <p className="text-xs opacity-80">العملاء</p>
                  <p className="font-bold">1,248</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-md p-2">
                  <p className="text-xs opacity-80">المعاملات</p>
                  <p className="font-bold">342</p>
                </div>
                <div className="bg-primary-foreground/10 rounded-md p-2">
                  <p className="text-xs opacity-80">التنبيهات</p>
                  <p className="font-bold">5</p>
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

        <h1 className="text-xl font-bold text-primary">لوحة تحكم المدير</h1>

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
            <AvatarFallback className="text-xs bg-primary text-primary-foreground font-medium">
              <Shield className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
