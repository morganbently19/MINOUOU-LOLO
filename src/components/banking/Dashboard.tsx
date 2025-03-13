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
} from "lucide-react";
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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">لوحة التحكم</h1>

      <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <CardHeader>
          <CardTitle>مرحباً، {customer.name}</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            نظرة عامة على حساباتك المصرفية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5" />
                <h3 className="font-medium">الرصيد الإجمالي</h3>
              </div>
              <p className="text-2xl font-bold">
                {formatBalance(customer.balance)} د.ج
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="h-5 w-5" />
                <h3 className="font-medium">عدد الحسابات</h3>
              </div>
              <p className="text-2xl font-bold">
                {customer.accounts ? customer.accounts.length : 0}
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <PiggyBank className="h-5 w-5" />
                <h3 className="font-medium">أهداف الادخار</h3>
              </div>
              <p className="font-bold">0</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button
            variant="outline"
            size="sm"
            className="text-white border-white/30 hover:bg-white/20 hover:text-white w-full"
          >
            <TrendingUp className="h-4 w-4 ml-2" />
            عرض تفاصيل الأرصدة
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>حساباتي</CardTitle>
          <CardDescription>إدارة حساباتك المصرفية</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {customer.accounts && customer.accounts.length > 0 ? (
            customer.accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{account.type}</h3>
                    <p className="text-sm text-muted-foreground">
                      {account.account_number.substring(0, 8)}...
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    {formatBalance(account.balance)}{" "}
                    {account.currency === "دينار جزائري"
                      ? "د.ج"
                      : account.currency === "دولار أمريكي"
                        ? "$"
                        : "€"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center border rounded-lg bg-muted/20">
              <CreditCard className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-medium">لا توجد حسابات نشطة</h3>
              <p className="text-sm text-muted-foreground mb-4">
                لم يتم العثور على أي حسابات مصرفية نشطة في حسابك
              </p>
              <Button
                variant="outline"
                onClick={() => setIsOpenAccountDialogOpen(true)}
              >
                فتح حساب جديد
              </Button>
            </div>
          )}

          {customer.balance === 0 && (
            <Alert className="mt-4 bg-warning/10 text-warning border-warning/20">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                رصيد حسابك صفر. يمكنك إيداع الأموال باستخدام{" "}
                <Link
                  to="/bank/deposit-instructions"
                  className="underline font-bold"
                >
                  تعليمات الإيداع
                </Link>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>آخر المعاملات</CardTitle>
          <CardDescription>نظرة عامة على معاملاتك الأخيرة</CardDescription>
        </CardHeader>
        <CardContent>
          {customer.balance === 0 ? (
            <div className="p-8 text-center border rounded-lg bg-muted/20">
              <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-medium">لا توجد معاملات</h3>
              <p className="text-sm text-muted-foreground mb-4">
                لم يتم العثور على أي معاملات في حسابك
              </p>
              <Button variant="outline" asChild>
                <Link to="/bank/deposit-instructions">عرض تعليمات الإيداع</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {[
                {
                  id: 1,
                  title: "ماركت الرياض",
                  date: "٢٠ يونيو",
                  amount: "-350 د.ج",
                  category: "تسوق",
                },
                {
                  id: 2,
                  title: "تحويل إلى محمد",
                  date: "١٨ يونيو",
                  amount: "-1,200 د.ج",
                  category: "تحويل",
                },
                {
                  id: 3,
                  title: "راتب شهري",
                  date: "١٥ يونيو",
                  amount: "+15,000 د.ج",
                  category: "دخل",
                },
                {
                  id: 4,
                  title: "مطعم السلام",
                  date: "١٤ يونيو",
                  amount: "-220 د.ج",
                  category: "مطاعم",
                },
                {
                  id: 5,
                  title: "فاتورة الكهرباء",
                  date: "١٠ يونيو",
                  amount: "-450 د.ج",
                  category: "فواتير",
                },
              ].map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{transaction.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {transaction.category} • {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold ${transaction.amount.startsWith("+") ? "text-success" : "text-destructive"}`}
                    >
                      {transaction.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        {customer.balance > 0 && (
          <CardFooter>
            <Button variant="outline" className="w-full">
              عرض جميع المعاملات
            </Button>
          </CardFooter>
        )}
      </Card>

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
