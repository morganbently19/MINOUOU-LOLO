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
                <DollarSign className="h-5 w-5" />
                <h3 className="font-medium">الرصيد بالدولار</h3>
              </div>
              <p className="text-2xl font-bold">
                {formatBalance(customer.balance / 135.5)} $
              </p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5" />
                <h3 className="font-medium">الرصيد باليورو</h3>
              </div>
              <p className="text-2xl font-bold">
                {formatBalance(customer.balance / 148.2)} €
              </p>
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
          <CardTitle>آخر المعاملات</CardTitle>
          <CardDescription>نظرة عامة على معاملاتك الأخيرة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 text-center border rounded-lg bg-muted/20">
            <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <h3 className="font-medium">لا توجد معاملات</h3>
            <p className="text-sm text-muted-foreground mb-4">
              لم يتم العثور على أي معاملات في حسابك
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <DepositFunds
                accountId={
                  customer.accounts.length > 0
                    ? customer.accounts[0].id
                    : undefined
                }
                onSuccess={fetchCustomerData}
              />
              <Button variant="outline" asChild>
                <Link to="/bank/deposit-instructions">عرض تعليمات الإيداع</Link>
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            عرض جميع المعاملات
          </Button>
        </CardFooter>
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
