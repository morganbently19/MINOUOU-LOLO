import { Bell, User, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface HeaderProps {
  isAdmin?: boolean;
}

export default function Header({ isAdmin = false }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 hidden md:flex items-center justify-between shadow-sm">
      <h1 className="text-2xl font-bold text-primary">بنك الأمان</h1>

      <div className="flex items-center space-x-4 space-x-reverse">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-primary/10 relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>

        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="text-right">
            <p className="text-sm font-medium">
              {isAdmin ? "مدير النظام" : "أحمد محمد"}
            </p>
            <p className="text-xs text-muted-foreground">
              {isAdmin ? "مدير" : "عميل مميز"}
            </p>
          </div>
          <Avatar className="border border-primary/20">
            {isAdmin ? (
              <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                <Shield className="h-4 w-4" />
              </AvatarFallback>
            ) : (
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                أم
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </div>
    </header>
  );
}
