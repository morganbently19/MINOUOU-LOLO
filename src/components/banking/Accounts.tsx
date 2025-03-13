import {
  CreditCard,
  Plus,
  MoreVertical,
  Eye,
  EyeOff,
  Download,
  Share2,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState, useEffect } from "react";
import OpenNewAccount from "./OpenNewAccount";
import { supabase } from "@/lib/supabase";
import { useToast } from "../ui/use-toast";

export default function Accounts() {
  const [isOpenAccountDialogOpen, setIsOpenAccountDialogOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [customerId, setCustomerId] = useState(101); // افتراضي للعميل الحالي

  // استرجاع الحسابات من قاعدة البيانات
  const fetchAccounts = async () => {
    setIsLoading(true);
    try {
      // استرجاع بيانات العميل من الجلسة
      const storedCustomer = sessionStorage.getItem("currentCustomer");
      let customerIdToUse = customerId;

      if (storedCustomer) {
        const customer = JSON.parse(storedCustomer);
        customerIdToUse = customer.id;
        setCustomerId(customer.id);
      }

      // استرجاع الحسابات من قاعدة البيانات
      const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("customer_id", customerIdToUse);

      if (error) throw error;

      // تنسيق البيانات للعرض
      const formattedAccounts = data.map((account) => ({
        id: account.id,
        name:
          account.type === "جاري"
            ? "الحساب الجاري"
            : account.type === "توفير"
              ? "حساب التوفير"
              : "حساب الاستثمار",
        number: account.account_number.replace(/\d(?=\d{4})/g, "*"),
        balance: `${account.balance.toLocaleString()} ${account.currency === "دينار جزائري" ? "د.ج" : account.currency === "دولار أمريكي" ? "$" : "€"}`,
        currency: account.currency,
        type: account.type,
        status: account.status,
      }));

      setAccounts(formattedAccounts);

      // في الوقت الحالي، نستخدم بيانات البطاقات الثابتة
      // يمكن تعديل هذا لاحقًا لاسترجاع البطاقات من قاعدة البيانات
      setCards([
        {
          id: 1,
          name: "بطاقة الخصم المباشر",
          number: "**** **** **** 5678",
          expiryDate: "06/25",
          type: "فيزا",
          status: "نشطة",
        },
        {
          id: 2,
          name: "بطاقة الائتمان الذهبية",
          number: "**** **** **** 9012",
          expiryDate: "09/26",
          type: "ماستركارد",
          status: "نشطة",
        },
      ]);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء استرجاع بيانات الحسابات",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // استرجاع البيانات عند تحميل المكون
  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">الحسابات والبطاقات</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={fetchAccounts}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 ml-2" />
            تحديث
          </Button>
          <Button onClick={() => setIsOpenAccountDialogOpen(true)}>
            <Plus className="h-4 w-4 ml-2" />
            إضافة حساب جديد
          </Button>
        </div>
      </div>

      <Tabs defaultValue="accounts">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-2 sm:mb-0">
          <TabsTrigger value="accounts">الحسابات</TabsTrigger>
          <TabsTrigger value="cards">البطاقات</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="space-y-4 mt-6">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
                <p className="text-sm text-muted-foreground">
                  جاري تحميل البيانات...
                </p>
              </div>
            </div>
          ) : accounts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CreditCard className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">لا توجد حسابات</h3>
                <p className="text-muted-foreground mb-4">
                  لم يتم العثور على أي حسابات مصرفية. يمكنك إضافة حساب جديد.
                </p>
                <Button onClick={() => setIsOpenAccountDialogOpen(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة حساب جديد
                </Button>
              </CardContent>
            </Card>
          ) : (
            accounts.map((account) => (
              <Card key={account.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{account.name}</CardTitle>
                      <CardDescription>
                        {account.type} • {account.currency}
                      </CardDescription>
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
                <CardContent>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {account.number}
                    </p>
                    <p className="text-2xl font-bold">{account.balance}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="cards" className="space-y-4 mt-6">
          <div className="flex justify-end mb-4">
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              طلب بطاقة جديدة
            </Button>
          </div>

          {cards.map((card) => (
            <Card key={card.id} className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary-foreground/70 p-6 text-primary-foreground">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold">بنك الأمان</h3>
                  <span className="text-lg font-semibold">{card.type}</span>
                </div>

                <div className="mb-6">
                  <p className="text-sm opacity-80 mb-1">رقم البطاقة</p>
                  <p className="text-xl tracking-wider">{card.number}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm opacity-80 mb-1">صاحب البطاقة</p>
                    <p>أحمد محمد</p>
                  </div>
                  <div>
                    <p className="text-sm opacity-80 mb-1">تاريخ الانتهاء</p>
                    <p>{card.expiryDate}</p>
                  </div>
                </div>
              </div>

              <CardContent className="pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{card.name}</CardTitle>
                    <CardDescription>الحالة: {card.status}</CardDescription>
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
                        <EyeOff className="ml-2 h-4 w-4" />
                        تجميد البطاقة
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="ml-2 h-4 w-4" />
                        تنزيل كشف البطاقة
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* نافذة فتح حساب جديد */}
      <OpenNewAccount
        open={isOpenAccountDialogOpen}
        onOpenChange={setIsOpenAccountDialogOpen}
        onSuccess={() => {
          // تحديث البيانات بعد فتح الحساب بنجاح
          fetchAccounts();
          toast({
            title: "تم بنجاح",
            description: "تم فتح الحساب الجديد بنجاح",
          });
        }}
        customerId={customerId || 101} // استخدام معرف العميل الحالي أو القيمة الافتراضية
      />
    </div>
  );
}
