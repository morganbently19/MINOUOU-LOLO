import { CreditCard, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Eye, Download, Share2 } from "lucide-react";

interface AccountCardProps {
  name: string;
  type: string;
  currency: string;
  accountNumber: string;
  balance: number;
  currencySymbol?: string;
}

export default function AccountCard({
  name,
  type,
  currency,
  accountNumber,
  balance,
  currencySymbol = "د.إ",
}: AccountCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-2 rounded-full">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold leading-none tracking-tight">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {type} • {currency}
            </p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="ml-2 h-4 w-4" />
              عرض التفاصيل
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="ml-2 h-4 w-4" />
              تنزيل كشف الحساب
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 className="ml-2 h-4 w-4" />
              مشاركة تفاصيل الحساب
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">{accountNumber}</p>
          <p className="text-2xl font-bold">
            {balance.toLocaleString()} {currencySymbol}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
