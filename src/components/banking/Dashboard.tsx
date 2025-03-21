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
  Wallet,
  Smartphone,
} from "lucide-react";
import NavigationMenu from "./NavigationMenu";
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
  const [selectedCurrency, setSelectedCurrency] = useState("درهم اماراتي");
  const [showExchangeRates, setShowExchangeRates] = useState(false);
  const [showAddCurrency, setShowAddCurrency] = useState(false);
  const [showWallets, setShowWallets] = useState(false);
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [accountActivated, setAccountActivated] = useState(false);

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
        // حساب الرصيد الإجمالي بالدرهم الاماراتي
        accounts.forEach((account) => {
          if (account.currency === "درهم اماراتي") {
            totalBalance += account.balance;
          } else if (account.currency === "دولار أمريكي") {
            // تحويل الدولار إلى درهم (سعر تقريبي)
            totalBalance += account.balance * 3.67;
          } else if (account.currency === "يورو") {
            // تحويل اليورو إلى درهم (سعر تقريبي)
            totalBalance += account.balance * 4.02;
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
      from: "درهم اماراتي",
      to: "دولار أمريكي",
      rate: 0.2723,
      change: -0.0002,
    },
    { from: "درهم اماراتي", to: "يورو", rate: 0.2488, change: 0.0001 },
    { from: "دولار أمريكي", to: "يورو", rate: 0.91, change: 0.002 },
    { from: "دولار أمريكي", to: "جنيه استرليني", rate: 0.78, change: -0.001 },
  ];

  // الحسابات المتاحة
  const availableAccounts = [
    { currency: "درهم اماراتي", icon: "🇦🇪", code: "AED" },
    { currency: "دولار أمريكي", icon: "🇺🇸", code: "USD" },
    { currency: "يورو", icon: "🇪🇺", code: "EUR" },
    { currency: "جنيه استرليني", icon: "🇬🇧", code: "GBP" },
  ];

  // المحافظ الإلكترونية
  const electronicWallets = [
    {
      name: "محفظة Binance",
      icon: "https://www.logo.wine/a/logo/Binance/Binance-Logo.wine.svg",
      balance: 0,
      color: "bg-yellow-500",
      linked: true,
    },
    {
      name: "محفظة Revolut",
      icon: "https://i0.wp.com/www.eseibusinessschool.com/wp-content/uploads/2023/05/Revolut_logo.png?resize=1024%2C1024&ssl=1",
      balance: 0,
      color: "bg-purple-500",
      linked: false,
    },
    {
      name: "محفظة Paypal",
      icon: "https://logowik.com/content/uploads/images/paypal-new-20232814.logowik.com.webp",
      balance: 0,
      color: "bg-indigo-500",
      linked: false,
    },
    {
      name: "محفظة Wise",
      icon: "https://mms.businesswire.com/media/20230301005211/en/1726050/4/02-Wise-logo-bright-green.jpg",
      balance: 0,
      color: "bg-purple-500",
      linked: false,
    },
    {
      name: "محفظة Paysera",
      icon: "https://logowik.com/content/uploads/images/paysera-new9014.logowik.com.webp",
      balance: 0,
      color: "bg-yellow-500",
      linked: false,
    },
    {
      name: "محفظة RedotPay",
      icon: "https://www.fintechfutures.com/files/2025/03/RedotPay-fintech-news-280x280.png",
      balance: 0,
      color: "bg-red-500",
      linked: false,
    },
  ];

  return (
    <div className="space-y-4 md:space-y-6 pb-32 px-3 md:px-6 min-h-screen bg-white flex flex-col items-center pt-4">
      {/* رأس الصفحة */}

      {/* بطاقة الرصيد الرئيسية */}
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-white overflow-hidden relative w-full max-w-3xl shadow-xl rounded-xl border border-primary-foreground/5 backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8 blur-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/5 to-primary/10 opacity-10 mix-blend-overlay"></div>

        <CardHeader className="p-3 md:p-6 relative z-10">
          <div className="flex justify-center items-center">
            <CardTitle className="text-xl md:text-2xl font-bold">
              الرصيد الإجمالي
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-3 md:p-6 pt-0 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="w-full md:w-1/2 bg-white/10 p-4 rounded-lg mb-2 text-center md:text-right">
              <p className="text-3xl md:text-4xl font-bold tracking-tight">
                {formatBalance(customer.balance)} د.إ
              </p>
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
                    className={`bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 p-2 rounded-lg shadow-md border border-white/10 hover:border-white/30 transition-all text-center min-w-[90px] cursor-pointer ${selectedCurrency === "دولار أمريكي" ? "scale-110 border-yellow-300 shadow-lg z-10" : ""}`}
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
                      $ {formatBalance((customer.balance / 3.67).toFixed(2))}
                    </p>
                  </div>
                  <div
                    className={`bg-gradient-to-br from-blue-500/20 to-blue-500/5 p-2 rounded-lg shadow-md border border-white/10 hover:border-white/30 transition-all text-center min-w-[90px] cursor-pointer ${selectedCurrency === "يورو" ? "scale-110 border-blue-300 shadow-lg z-10" : ""}`}
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
                      € {formatBalance((customer.balance / 4.02).toFixed(2))}
                    </p>
                  </div>
                  <div
                    className={`bg-gradient-to-br from-green-500/20 to-green-500/5 p-2 rounded-lg shadow-md border border-white/10 hover:border-white/30 transition-all text-center min-w-[90px] cursor-pointer ${selectedCurrency === "جنيه استرليني" ? "scale-110 border-green-300 shadow-lg z-10" : ""}`}
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
                      £ {formatBalance((customer.balance / 4.65).toFixed(2))}
                    </p>
                  </div>
                  <div
                    className="bg-gradient-to-br from-purple-500/20 to-purple-500/5 p-2 rounded-lg shadow-md border border-white/10 hover:border-white/30 transition-all text-center min-w-[90px] cursor-pointer"
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
            </div>
          </div>

          {/* أزرار الإجراءات */}
          <div className="mt-4 mb-4">
            <div className="flex flex-col md:flex-row justify-center gap-3">
              <Button
                variant="solid"
                size="sm"
                className="bg-white/90 text-primary hover:bg-white shadow-md border border-white/20 hover:border-white/50 transition-all w-full md:w-auto rounded-full"
                onClick={() =>
                  (window.location.href = "/bank/deposit-instructions")
                }
              >
                <DollarSign className="h-4 w-4 ml-2" />
                إيداع رصيد
              </Button>
              <Button
                variant="solid"
                size="sm"
                className="bg-white/20 text-white hover:bg-white/30 shadow-md border border-white/10 hover:border-white/30 transition-all w-full md:w-auto rounded-full"
                asChild
              >
                <Link to="/bank/deposit-instructions">
                  <LineChart className="h-4 w-4 ml-2" />
                  تعليمات الإيداع
                </Link>
              </Button>
              <Button
                variant="solid"
                size="sm"
                className="bg-white/20 text-white hover:bg-white/30 shadow-md border border-white/10 hover:border-white/30 transition-all w-full md:w-auto rounded-full"
                onClick={() => setShowExchangeRates(!showExchangeRates)}
              >
                <CreditCard className="h-4 w-4 ml-2" />
                أسعار الصرف
              </Button>
            </div>
          </div>

          {/* زر تفعيل الحساب */}
          <div className="mt-4 mb-4 flex justify-center">
            <Button
              variant="solid"
              size="sm"
              className="bg-white/50 text-primary hover:bg-white shadow-md border border-white/20 hover:border-white/50 transition-all w-full md:w-auto rounded-full"
              onClick={() => {
                setShowAccountNumber(!showAccountNumber);
                if (!accountActivated) {
                  setAccountActivated(true);
                }
              }}
            >
              <CreditCard className="h-4 w-4 ml-2" />
              {accountActivated ? "رقم الحساب" : "تفعيل الحساب"}
            </Button>
          </div>

          {/* عرض رقم الحساب */}
          {showAccountNumber && (
            <div className="mb-4 p-4 bg-white/10 rounded-lg border border-white/20">
              <h3 className="text-sm font-bold text-white/90 mb-2 text-center">
                رقم الحساب البنكي
              </h3>
              <p className="text-center font-mono text-white text-lg">
                AE59 1234 5678 9012 3456
              </p>
            </div>
          )}

          {/* المحافظ الإلكترونية داخل البطاقة الرئيسية */}
          <div className="mt-4 mb-4">
            <h3 className="text-sm font-bold text-white/90 mb-3 text-center">
              المحافظ الإلكترونية
            </h3>
            <div className="overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex gap-2 justify-center">
                {electronicWallets.slice(0, 6).map((wallet, index) => (
                  <div
                    key={index}
                    className="bg-white/10 p-2 rounded-lg shadow-md border border-white/10 hover:border-white/30 transition-all text-center min-w-[90px] cursor-pointer"
                  >
                    <div className="mx-auto w-12 h-12 overflow-hidden flex items-center justify-center bg-white/90 rounded-full p-1 shadow-inner">
                      <img
                        src={wallet.icon}
                        alt={wallet.name}
                        className="w-10 h-10 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-xs font-medium mt-2 mb-1 text-white/90">
                      {wallet.name.split(" ")[1] || wallet.name.split(" ")[0]}
                    </p>
                    <p className="text-xs font-bold text-white/80">
                      {wallet.linked ? "متصل" : "غير متصل"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* أسعار الصرف */}
      {showExchangeRates && (
        <Card className="max-w-3xl mx-auto w-full shadow-lg border-primary/10 backdrop-blur-sm bg-white/90">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
            <CardTitle className="text-xl flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              أسعار الصرف
            </CardTitle>
            <CardDescription>أسعار الصرف المحدثة لليوم</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {exchangeRates.map((rate, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 rounded-lg border hover:border-primary/30 transition-all hover:shadow-md bg-white"
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
                    className={`text-sm font-medium px-2 py-1 rounded-full ${rate.change > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
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

      {/* المحافظ الإلكترونية */}
      {showWallets && (
        <Card className="max-w-3xl mx-auto w-full shadow-lg border-primary/10">
          <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-lg">
            <CardTitle className="text-xl flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" />
              المحافظ الإلكترونية
            </CardTitle>
            <CardDescription>ربط وإدارة المحافظ الإلكترونية</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {electronicWallets.map((wallet, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 rounded-lg border hover:border-primary/50 transition-all cursor-pointer hover:shadow-md bg-white"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 ${wallet.color}/10 rounded-full flex items-center justify-center w-14 h-14 overflow-hidden border border-${wallet.color.replace("bg-", "")}/20 bg-white shadow-md`}
                    >
                      <img
                        src={wallet.icon}
                        alt={wallet.name}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{wallet.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {wallet.linked ? "متصل" : "غير متصل"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className={
                      wallet.linked
                        ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/30"
                        : "hover:bg-primary/5 hover:text-primary"
                    }
                  >
                    {wallet.linked ? "إدارة" : "ربط"}
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button
                className="w-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                variant="outline"
              >
                <Plus className="h-4 w-4 ml-2" />
                إضافة محفظة جديدة
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* شريط التنقل السفلي */}
      <NavigationMenu />

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
