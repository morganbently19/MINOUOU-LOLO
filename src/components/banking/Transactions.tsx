import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Calendar as CalendarIcon,
  Download,
  Filter,
  Search,
} from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const transactions = [];

export default function Transactions() {
  const [date, setDate] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">المعاملات المالية</h1>

      <Card>
        <CardHeader>
          <CardTitle>سجل المعاملات</CardTitle>
          <CardDescription>عرض وتصفية جميع معاملاتك المالية</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث عن معاملة..."
                  className="pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[240px] justify-start text-right"
                  >
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {date
                      ? format(date, "dd MMMM yyyy", { locale: ar })
                      : "اختر التاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="جميع الفئات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفئات</SelectItem>
                  <SelectItem value="shopping">تسوق</SelectItem>
                  <SelectItem value="transfer">تحويل</SelectItem>
                  <SelectItem value="income">دخل</SelectItem>
                  <SelectItem value="bills">فواتير</SelectItem>
                  <SelectItem value="food">مطاعم</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>

              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <div className="hidden md:grid grid-cols-5 bg-muted/50 p-4 font-medium">
              <div>المعاملة</div>
              <div>التاريخ</div>
              <div>الفئة</div>
              <div>الحالة</div>
              <div className="text-left">المبلغ</div>
            </div>

            <div className="divide-y">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex flex-col md:grid md:grid-cols-5 p-4 items-start md:items-center border-b md:border-b-0"
                  >
                    <div className="flex justify-between w-full md:block">
                      <div className="font-medium">{transaction.title}</div>
                      <div
                        className={`md:hidden font-medium ${transaction.amount.startsWith("+") ? "text-success" : "text-destructive"}`}
                      >
                        {transaction.amount}
                      </div>
                    </div>
                    <div className="text-muted-foreground text-sm mt-1 md:mt-0">
                      {transaction.date}
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {transaction.category}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                        {transaction.status}
                      </span>
                    </div>
                    <div className="hidden md:block"></div>
                    <div
                      className={`hidden md:block text-left font-medium ${transaction.amount.startsWith("+") ? "text-success" : "text-destructive"}`}
                    >
                      {transaction.amount}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  لا توجد معاملات مالية حالياً
                </div>
              )}
            </div>
          </div>

          {transactions.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                عرض 1-{transactions.length} من {transactions.length} معاملة
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Button variant="outline" size="sm" disabled>
                  السابق
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={transactions.length <= 10}
                >
                  التالي
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
