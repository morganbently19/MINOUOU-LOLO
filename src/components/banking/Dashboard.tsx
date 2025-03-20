import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Calendar,
  AlertCircle,
  PiggyBank,
  CreditCard as VisaIcon,
  Send,
  Home,
  CreditCard as CardIcon,
  Users,
  Settings,
  LineChart,
  Globe,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
} from "lucide-react";
import Bell from "./Bell";
import DepositFunds from "./DepositFunds";
import OpenNewAccount from "./OpenNewAccount";
import { supabase } from "@/lib/supabase";
import { useToast } from "../ui/use-toast";

export default function Dashboard() {
  const [isOpenAccountDialogOpen, setIsOpenAccountDialogOpen] = useState(false);
  const [customer, setCustomer] = useState({
    id: 0,
    name: "",
    balance: 0,
    accounts: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState("دينار جزائري");
  const [showExchangeRates, setShowExchangeRates] = useState(false);
  const { toast } = useToast();

  // استرجاع بيانات العميل من قاعدة البيانات
  const fetchCustomerData = async () => {
    setIsLoading(true);
    try {
      // استرجاع بيانات العميل من الجلسة
      const storedCustomer = sessionStorage.getItem("currentCustomer");
      if (!storedCustomer) {
        // إذا لم يتم العثور على بيانات العميل، استخدم بيانات افتراضية للعرض
        setCustomer({
          id: 101, // معرف افتراضي
          name: "أحمد محمد",
          balance: 0,
          accounts: [],
        });
        setIsLoading(false);
        return;
      }

      const customerData = JSON.parse(storedCustomer);

      // استرجاع حسابات العميل من قاعدة البيانات
      const { data: accounts, error: accountsError } = await supabase
        .from("accounts")
        .select("*")
        .eq("customer_id", customerData.id);

      if (accountsError) throw accountsError;

      // حساب إجمالي الرصيد من جميع الحسابات
      let totalBalance = 0;
      if (accounts && accounts.length > 0) {
        // حساب الرصيد الإجمالي بالدينار الجزائري
        accounts.forEach((account) => {
          if (account.currency === "دينار جزائري") {
            totalBalance += account.balance;
          } else if (account.currency === "دولار أمريكي") {
            // تحويل الدولار إلى دينار (سعر تقريبي)
            totalBalance += account.balance * 135.5;
          } else if (account.currency === "يورو") {
            // تحويل اليورو إلى دينار (سعر تقريبي)
            totalBalance += account.balance * 148.2;
          }
        });
      }

      setCustomer({
        ...customerData,
        balance: totalBalance,
        accounts: accounts || [],
      });
    } catch (error) {
      console.error("Error fetching customer data:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء استرجاع بيانات العميل",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // تنسيق الرصيد
  const formatBalance = (balance) => {
    return balance.toLocaleString();
  };

  // استرجاع البيانات عند تحميل المكون
  useEffect(() => {
    fetchCustomerData();
  }, []);

  // أسعار الصرف
  const exchangeRates = [
    {
      from: "دينار جزائري",
      to: "دولار أمريكي",
      rate: 0.00738,
      change: -0.0002,
    },
    { from: "دينار جزائري", to: "يورو", rate: 0.00675, change: 0.0001 },
    { from: "دولار أمريكي", to: "يورو", rate: 0.91, change: 0.002 },
    { from: "دولار أمريكي", to: "جنيه استرليني", rate: 0.78, change: -0.001 },
  ];

  // الحسابات المتاحة
  const availableAccounts = [
    { currency: "دينار جزائري", icon: "🇩🇿", code: "DZD" },
    { currency: "دولار أمريكي", icon: "🇺🇸", code: "USD" },
    { currency: "يورو", icon: "🇪🇺", code: "EUR" },
    { currency: "جنيه استرليني", icon: "🇬🇧", code: "GBP" },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* رأس الصفحة */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">مرحباً، {customer.name}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* بطاقة الرصيد الرئيسية */}
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8 blur-lg"></div>

        <CardHeader>
          <CardTitle className="text-2xl">الرصيد الإجمالي</CardTitle>
          <CardDescription className="text-primary-foreground/90">
            نظرة عامة على حساباتك المصرفية
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-6">
            <p className="text-4xl font-bold mb-1">
              {formatBalance(customer.balance)} د.ج
            </p>
            <div className="flex items-center text-sm text-primary-foreground/80">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+2.4% من الشهر الماضي</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5" />
                <h3 className="font-medium">الرصيد بالدولار</h3>
              </div>
              <p className="text-2xl font-bold">
                {formatBalance(customer.balance / 135.5)} $
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5" />
                <h3 className="font-medium">الرصيد باليورو</h3>
              </div>
              <p className="text-2xl font-bold">
                {formatBalance(customer.balance / 148.2)} €
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="h-5 w-5" />
                <h3 className="font-medium">الحسابات النشطة</h3>
              </div>
              <p className="text-2xl font-bold">
                {customer.accounts.length || 0}
              </p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-white border-white/30 hover:bg-white/20 hover:text-white"
            onClick={() => setShowExchangeRates(!showExchangeRates)}
          >
            <LineChart className="h-4 w-4 ml-2" />
            أسعار الصرف
          </Button>

          <DepositFunds
            accountId={
              customer.accounts.length > 0 ? customer.accounts[0].id : undefined
            }
            onSuccess={fetchCustomerData}
          />

          <Button
            variant="outline"
            size="sm"
            className="text-white border-white/30 hover:bg-white/20 hover:text-white"
            onClick={() => setIsOpenAccountDialogOpen(true)}
          >
            <Plus className="h-4 w-4 ml-2" />
            فتح حساب جديد
          </Button>
        </CardFooter>
      </Card>

      {/* أسعار الصرف */}
      {showExchangeRates && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">أسعار الصرف</CardTitle>
            <CardDescription>أسعار الصرف المحدثة لليوم</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exchangeRates.map((rate, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <ArrowDownLeft className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {rate.from} → {rate.to}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        1 {rate.from.split(" ")[0]} = {rate.rate}{" "}
                        {rate.to.split(" ")[0]}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-sm ${rate.change > 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {rate.change > 0 ? "+" : ""}
                    {rate.change.toFixed(4)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* الحسابات المتاحة */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">الحسابات المتاحة</CardTitle>
          <CardDescription>
            اختر العملة لفتح حساب جديد أو الإيداع
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableAccounts.map((account, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all hover:border-primary hover:bg-primary/5 ${selectedCurrency === account.currency ? "border-primary bg-primary/5" : ""}`}
                onClick={() => setSelectedCurrency(account.currency)}
              >
                <div className="text-2xl">{account.icon}</div>
                <div className="flex-1">
                  <p className="font-medium">{account.currency}</p>
                  <p className="text-sm text-muted-foreground">
                    {account.code}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <ArrowDownLeft className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={() => setIsOpenAccountDialogOpen(true)}
          >
            <Plus className="h-4 w-4 ml-2" />
            فتح حساب جديد
          </Button>
        </CardFooter>
      </Card>

      {/* تعليمات الإيداع */}
      <div className="flex justify-end">
        <Button variant="outline" asChild>
          <Link to="/bank/deposit-instructions">عرض تعليمات الإيداع</Link>
        </Button>
      </div>

      {/* شريط التنقل السفلي */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-2 flex justify-around items-center md:hidden z-10">
        <Button
          variant="ghost"
          size="icon"
          className="flex flex-col items-center text-xs gap-1"
        >
          <Home className="h-5 w-5" />
          <span>الرئيسية</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex flex-col items-center text-xs gap-1"
        >
          <CardIcon className="h-5 w-5" />
          <span>الحسابات</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex flex-col items-center text-xs gap-1"
        >
          <Send className="h-5 w-5" />
          <span>التحويلات</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="flex flex-col items-center text-xs gap-1"
        >
          <Users className="h-5 w-5" />
          <span>المستفيدون</span>
        </Button>
      </div>

      {/* نافذة فتح حساب جديد */}
      <OpenNewAccount
        open={isOpenAccountDialogOpen}
        onOpenChange={setIsOpenAccountDialogOpen}
        onSuccess={() => {
          // تحديث البيانات بعد فتح الحساب بنجاح
          fetchCustomerData();
          toast({
            title: "تم بنجاح",
            description: "تم فتح الحساب الجديد بنجاح",
          });
        }}
        customerId={customer?.id || 101} // استخدام معرف العميل الحالي أو القيمة الافتراضية
      />
    </div>
  );
}
