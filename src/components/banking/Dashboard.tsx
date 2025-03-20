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
  const [showAddCurrency, setShowAddCurrency] = useState(false);
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
    <div className="space-y-4 md:space-y-6 pb-20 px-3 md:px-6">
      {/* رأس الصفحة */}

      {/* بطاقة الرصيد الرئيسية */}
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-white overflow-hidden relative w-full max-w-none mx-auto shadow-lg rounded-xl border-2 border-primary-foreground/10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8 blur-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=50')] bg-no-repeat bg-cover opacity-10 mix-blend-overlay"></div>

        <CardHeader className="p-3 md:p-6 relative z-10">
          <div className="flex justify-center items-center">
            <CardTitle className="text-xl md:text-2xl font-bold">
              الرصيد الإجمالي
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-3 md:p-6 pt-0 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="w-full md:w-1/2 bg-white/10 p-4 rounded-lg backdrop-blur-sm mb-2 text-center md:text-right">
              <p className="text-sm text-primary-foreground/80 mb-1">
                الرصيد الكلي
              </p>
              <p className="text-3xl md:text-4xl font-bold tracking-tight">
                {formatBalance(customer.balance)} د.ج
              </p>
              <div className="flex items-center justify-center md:justify-end text-xs md:text-sm text-primary-foreground/80 bg-green-500/20 rounded-full py-1 px-3 backdrop-blur-sm mt-2 inline-block">
                <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                <span>+2.4% من الشهر الماضي</span>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative">
              <div
                className="overflow-x-auto pb-2 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <div
                  className="flex gap-2 min-w-max"
                  id="currency-scroll-container"
                >
                  <div
                    className={`bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 p-2 rounded-lg backdrop-blur-sm shadow-md border border-white/10 hover:border-white/30 transition-all text-center min-w-[90px] cursor-pointer ${selectedCurrency === "دولار أمريكي" ? "scale-110 border-yellow-300 shadow-lg z-10" : ""}`}
                    onClick={() => setSelectedCurrency("دولار أمريكي")}
                  >
                    <div className="p-1.5 bg-yellow-500/20 rounded-full mx-auto mb-1 flex items-center justify-center">
                      <span className="text-yellow-300 font-bold text-sm md:text-base">
                        $
                      </span>
                    </div>
                    <p className="text-xs font-medium mb-1">الدولار</p>
                    <p
                      className={`${selectedCurrency === "دولار أمريكي" ? "text-base md:text-lg" : "text-sm md:text-base"} font-bold`}
                    >
                      $ {formatBalance((customer.balance / 135.5).toFixed(2))}
                    </p>
                  </div>
                  <div
                    className={`bg-gradient-to-br from-blue-500/20 to-blue-500/5 p-2 rounded-lg backdrop-blur-sm shadow-md border border-white/10 hover:border-white/30 transition-all text-center min-w-[90px] cursor-pointer ${selectedCurrency === "يورو" ? "scale-110 border-blue-300 shadow-lg z-10" : ""}`}
                    onClick={() => setSelectedCurrency("يورو")}
                  >
                    <div className="p-1.5 bg-blue-500/30 rounded-full mx-auto mb-1 shadow-inner shadow-blue-400/20 flex items-center justify-center">
                      <span className="text-blue-400 font-bold text-sm md:text-base">
                        €
                      </span>
                    </div>
                    <p className="text-xs font-medium mb-1">اليورو</p>
                    <p
                      className={`${selectedCurrency === "يورو" ? "text-base md:text-lg" : "text-sm md:text-base"} font-bold`}
                    >
                      € {formatBalance((customer.balance / 148.2).toFixed(2))}
                    </p>
                  </div>
                  <div
                    className={`bg-gradient-to-br from-green-500/20 to-green-500/5 p-2 rounded-lg backdrop-blur-sm shadow-md border border-white/10 hover:border-white/30 transition-all text-center min-w-[90px] cursor-pointer ${selectedCurrency === "جنيه استرليني" ? "scale-110 border-green-300 shadow-lg z-10" : ""}`}
                    onClick={() => setSelectedCurrency("جنيه استرليني")}
                  >
                    <div className="p-1.5 bg-green-500/20 rounded-full mx-auto mb-1 flex items-center justify-center">
                      <span className="text-green-300 font-bold text-sm md:text-base">
                        £
                      </span>
                    </div>
                    <p className="text-xs font-medium mb-1">الجنيه</p>
                    <p
                      className={`${selectedCurrency === "جنيه استرليني" ? "text-base md:text-lg" : "text-sm md:text-base"} font-bold`}
                    >
                      £ {formatBalance((customer.balance / 170.5).toFixed(2))}
                    </p>
                  </div>
                  <div
                    className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 p-2 rounded-lg backdrop-blur-sm shadow-md border border-white/10 hover:border-white/30 transition-all text-center min-w-[90px] cursor-pointer"
                    onClick={() => setShowAddCurrency(true)}
                  >
                    <div className="p-1.5 bg-purple-500/20 rounded-full mx-auto mb-1">
                      <Plus className="h-3 w-3 md:h-4 md:w-4 text-purple-300" />
                    </div>
                    <p className="text-xs font-medium mb-1">إضافة</p>
                    <p className="text-sm md:text-base font-bold">عملة</p>
                  </div>
                </div>
              </div>
              <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-1 backdrop-blur-sm z-10 text-white shadow-md border border-white/20"
                onClick={() => {
                  const container = document.getElementById(
                    "currency-scroll-container",
                  );
                  if (container)
                    container.scrollBy({ left: 100, behavior: "smooth" });
                }}
              >
                <ArrowUpRight className="h-4 w-4 rotate-90" />
              </button>
              <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-1 backdrop-blur-sm z-10 text-white shadow-md border border-white/20"
                onClick={() => {
                  const container = document.getElementById(
                    "currency-scroll-container",
                  );
                  if (container)
                    container.scrollBy({ left: -100, behavior: "smooth" });
                }}
              >
                <ArrowUpRight className="h-4 w-4 -rotate-90" />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-3">
            <DepositFunds
              accountId={
                customer.accounts.length > 0
                  ? customer.accounts[0].id
                  : undefined
              }
              onSuccess={fetchCustomerData}
              className="bg-white/90 text-primary hover:bg-white backdrop-blur-sm shadow-md border border-white/20 hover:border-white/50 transition-all w-full md:w-auto"
            />
            <Button
              variant="solid"
              size="sm"
              className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm shadow-md border border-white/10 hover:border-white/30 transition-all w-full md:w-auto"
              onClick={() => setShowExchangeRates(!showExchangeRates)}
            >
              <LineChart className="h-4 w-4 ml-2" />
              أسعار الصرف
            </Button>
            <Button
              variant="solid"
              size="sm"
              className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm shadow-md border border-white/10 hover:border-white/30 transition-all w-full md:w-auto"
            >
              <CreditCard className="h-4 w-4 ml-2" />
              رقم الحساب
            </Button>
          </div>
        </CardContent>
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
