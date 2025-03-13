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

const transactions = [
  {
    id: 1,
    title: "ماركت الرياض",
    date: "20 يونيو 2023",
    amount: "-350 د.ج",
    category: "تسوق",
    status: "مكتملة",
  },
  {
    id: 2,
    title: "تحويل إلى محمد",
    date: "18 يونيو 2023",
    amount: "-1,200 د.ج",
    category: "تحويل",
    status: "مكتملة",
  },
  {
    id: 3,
    title: "راتب شهري",
    date: "15 يونيو 2023",
    amount: "+15,000 د.ج",
    category: "دخل",
    status: "مكتملة",
  },
  {
    id: 4,
    title: "مطعم السلام",
    date: "14 يونيو 2023",
    amount: "-220 د.ج",
    category: "مطاعم",
    status: "مكتملة",
  },
  {
    id: 5,
    title: "فاتورة الكهرباء",
    date: "10 يونيو 2023",
    amount: "-450 د.ج",
    category: "فواتير",
    status: "مكتملة",
  },
  {
    id: 6,
    title: "سوبرماركت",
    date: "08 يونيو 2023",
    amount: "-180 د.ج",
    category: "تسوق",
    status: "مكتملة",
  },
  {
    id: 7,
    title: "محطة وقود",
    date: "05 يونيو 2023",
    amount: "-120 د.ج",
    category: "وقود",
    status: "مكتملة",
  },
  {
    id: 8,
    title: "اشتراك نتفلكس",
    date: "03 يونيو 2023",
    amount: "-45 د.ج",
    category: "ترفيه",
    status: "مكتملة",
  },
  {
    id: 9,
    title: "صيدلية",
    date: "01 يونيو 2023",
    amount: "-95 د.ج",
    category: "صحة",
    status: "مكتملة",
  },
  {
    id: 10,
    title: "تحويل من خالد",
    date: "28 مايو 2023",
    amount: "+500 د.ج",
    category: "تحويل",
    status: "مكتملة",
  },
];

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
              {transactions.map((transaction) => (
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
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              عرض 1-10 من 24 معاملة
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button variant="outline" size="sm" disabled>
                السابق
              </Button>
              <Button variant="outline" size="sm">
                التالي
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
