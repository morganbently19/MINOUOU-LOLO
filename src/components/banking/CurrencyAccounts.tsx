import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState, useEffect } from "react";
import OpenNewAccount from "./OpenNewAccount";
import {
  DollarSign,
  Euro,
  CreditCard,
  Plus,
  TrendingUp,
  TrendingDown,
  RefreshCw,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "../ui/use-toast";

export default function CurrencyAccounts() {
  const [isOpenAccountDialogOpen, setIsOpenAccountDialogOpen] = useState(false);
  const [foreignAccounts, setForeignAccounts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [customerId, setCustomerId] = useState(101); // افتراضي للعميل الحالي

  // استرجاع الحسابات بالعملات الأجنبية من قاعدة البيانات
  const fetchForeignAccounts = async () => {
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

      // استرجاع الحسابات بالعملات الأجنبية من قاعدة البيانات
      const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("customer_id", customerIdToUse)
        .in("currency", ["دولار أمريكي", "يورو"]);

      if (error) throw error;

      // استرجاع أسعار الصرف
      const { data: ratesData, error: ratesError } = await supabase
        .from("currency_rates")
        .select("*");

      if (ratesError) throw ratesError;

      // تنسيق البيانات للعرض
      const formattedAccounts = data.map((account) => {
        const currencyCode =
          account.currency === "دولار أمريكي" ? "USD" : "EUR";
        const currencySymbol = account.currency === "دولار أمريكي" ? "$" : "€";
        const currencyRate = ratesData.find(
          (rate) => rate.code === currencyCode,
        ) || { base_rate: account.currency === "دولار أمريكي" ? 135.5 : 148.2 };

        return {
          id: account.id,
          name: `حساب ${account.currency}`,
          number: account.account_number.replace(/\d(?=\d{4})/g, "*"),
          balance: `${account.balance.toLocaleString()} ${currencySymbol}`,
          currency: account.currency,
          type: account.type,
          status: account.status,
          exchangeRate: `1 ${currencySymbol} = ${currencyRate.base_rate.toFixed(1)} د.ج`,
          trend: Math.random() > 0.5 ? "up" : "down", // عشوائي للعرض
          trendPercentage: `${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 2).toFixed(1)}%`, // عشوائي للعرض
          dzEquivalent: account.balance * currencyRate.base_rate,
        };
      });

      setForeignAccounts(formattedAccounts);
    } catch (error) {
      console.error("Error fetching foreign accounts:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء استرجاع بيانات الحسابات بالعملات الأجنبية",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // استرجاع البيانات عند تحميل المكون
  useEffect(() => {
    fetchForeignAccounts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">الحسابات بالعملات الأجنبية</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={fetchForeignAccounts}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 ml-2" />
            تحديث
          </Button>
          <Button onClick={() => setIsOpenAccountDialogOpen(true)}>
            <Plus className="h-4 w-4 ml-2" />
            فتح حساب بعملة أجنبية
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-2 sm:mb-0">
          <TabsTrigger value="all">جميع العملات</TabsTrigger>
          <TabsTrigger value="usd">
            <DollarSign className="ml-2 h-4 w-4" />
            دولار أمريكي
          </TabsTrigger>
          <TabsTrigger value="eur">
            <Euro className="ml-2 h-4 w-4" />
            يورو
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {isLoading ? (
              <div className="flex justify-center items-center p-8 col-span-2">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
                  <p className="text-sm text-muted-foreground">
                    جاري تحميل البيانات...
                  </p>
                </div>
              </div>
            ) : foreignAccounts.length === 0 ? (
              <Card className="col-span-2">
                <CardContent className="p-8 text-center">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">
                    لا توجد حسابات بالعملات الأجنبية
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    لم يتم العثور على أي حسابات بالعملات الأجنبية. يمكنك فتح
                    حساب جديد.
                  </p>
                  <Button onClick={() => setIsOpenAccountDialogOpen(true)}>
                    <Plus className="h-4 w-4 ml-2" />
                    فتح حساب بعملة أجنبية
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {foreignAccounts.map((account) => (
                  <Card key={account.id}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                          {account.currency === "دولار أمريكي" ? (
                            <DollarSign className="h-6 w-6 text-primary" />
                          ) : (
                            <Euro className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div>
                          <CardTitle>{account.name}</CardTitle>
                          <CardDescription>
                            {account.type} • {account.currency}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                          {account.number}
                        </p>
                        <p className="text-2xl font-bold">{account.balance}</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                          سعر الصرف
                        </p>
                        <div className="flex items-center">
                          <p className="text-sm font-medium">
                            {account.exchangeRate}
                          </p>
                          {account.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 mr-1 text-success" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1 text-destructive" />
                          )}
                          <span
                            className={
                              account.trend === "up"
                                ? "text-success text-xs"
                                : "text-destructive text-xs"
                            }
                          >
                            {account.trendPercentage}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2 space-x-reverse pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          تحويل
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          إيداع
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          سحب
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className="flex flex-col items-center justify-center p-6 border-dashed border-2 border-muted">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">فتح حساب بعملة جديدة</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    يمكنك فتح حسابات بعملات متعددة للتعاملات الدولية
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsOpenAccountDialogOpen(true)}
                  >
                    فتح حساب جديد
                  </Button>
                </Card>
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="usd" className="space-y-4 mt-6">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
                <p className="text-sm text-muted-foreground">
                  جاري تحميل البيانات...
                </p>
              </div>
            </div>
          ) : foreignAccounts.filter((a) => a.currency === "دولار أمريكي")
              .length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <DollarSign className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">
                  لا يوجد حساب بالدولار الأمريكي
                </h3>
                <p className="text-muted-foreground mb-4">
                  لم يتم العثور على أي حساب بالدولار الأمريكي. يمكنك فتح حساب
                  جديد.
                </p>
                <Button onClick={() => setIsOpenAccountDialogOpen(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  فتح حساب بالدولار الأمريكي
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>حساب الدولار الأمريكي</CardTitle>
                <CardDescription>
                  تفاصيل حسابك بالدولار الأمريكي
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {foreignAccounts
                  .filter((account) => account.currency === "دولار أمريكي")
                  .map((account) => (
                    <div key={account.id}>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <DollarSign className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">الرصيد الحالي</h3>
                            <p className="text-sm text-muted-foreground">
                              {account.number}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-2xl">
                            {account.balance}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ما يعادل {account.dzEquivalent.toLocaleString()} د.ج
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-4">
                        <Card>
                          <CardHeader className="py-2">
                            <CardTitle className="text-sm">سعر الصرف</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center">
                              <p className="font-medium">
                                {account.exchangeRate}
                              </p>
                              {account.trend === "up" ? (
                                <TrendingUp className="h-4 w-4 mr-1 text-success" />
                              ) : (
                                <TrendingDown className="h-4 w-4 mr-1 text-destructive" />
                              )}
                              <span
                                className={
                                  account.trend === "up"
                                    ? "text-success text-xs"
                                    : "text-destructive text-xs"
                                }
                              >
                                {account.trendPercentage}
                              </span>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="py-2">
                            <CardTitle className="text-sm">آخر إيداع</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="font-medium">+1,000 $</p>
                            <p className="text-xs text-muted-foreground">
                              15 يونيو 2023
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="py-2">
                            <CardTitle className="text-sm">آخر سحب</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="font-medium">-500 $</p>
                            <p className="text-xs text-muted-foreground">
                              10 يونيو 2023
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="flex space-x-2 space-x-reverse pt-4">
                        <Button className="flex-1">تحويل من الدولار</Button>
                        <Button className="flex-1">تحويل إلى الدولار</Button>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="eur" className="space-y-4 mt-6">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
                <p className="text-sm text-muted-foreground">
                  جاري تحميل البيانات...
                </p>
              </div>
            </div>
          ) : foreignAccounts.filter((a) => a.currency === "يورو").length ===
            0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Euro className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">
                  لا يوجد حساب باليورو
                </h3>
                <p className="text-muted-foreground mb-4">
                  لم يتم العثور على أي حساب باليورو. يمكنك فتح حساب جديد.
                </p>
                <Button onClick={() => setIsOpenAccountDialogOpen(true)}>
                  <Plus className="h-4 w-4 ml-2" />
                  فتح حساب باليورو
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>حساب اليورو</CardTitle>
                <CardDescription>تفاصيل حسابك باليورو</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {foreignAccounts
                  .filter((account) => account.currency === "يورو")
                  .map((account) => (
                    <div key={account.id}>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Euro className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">الرصيد الحالي</h3>
                            <p className="text-sm text-muted-foreground">
                              {account.number}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-2xl">
                            {account.balance}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ما يعادل {account.dzEquivalent.toLocaleString()} د.ج
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-4">
                        <Card>
                          <CardHeader className="py-2">
                            <CardTitle className="text-sm">سعر الصرف</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center">
                              <p className="font-medium">
                                {account.exchangeRate}
                              </p>
                              {account.trend === "up" ? (
                                <TrendingUp className="h-4 w-4 mr-1 text-success" />
                              ) : (
                                <TrendingDown className="h-4 w-4 mr-1 text-destructive" />
                              )}
                              <span
                                className={
                                  account.trend === "up"
                                    ? "text-success text-xs"
                                    : "text-destructive text-xs"
                                }
                              >
                                {account.trendPercentage}
                              </span>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="py-2">
                            <CardTitle className="text-sm">آخر إيداع</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="font-medium">+2,000 €</p>
                            <p className="text-xs text-muted-foreground">
                              20 مايو 2023
                            </p>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="py-2">
                            <CardTitle className="text-sm">آخر سحب</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="font-medium">-300 €</p>
                            <p className="text-xs text-muted-foreground">
                              5 يونيو 2023
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="flex space-x-2 space-x-reverse pt-4">
                        <Button className="flex-1">تحويل من اليورو</Button>
                        <Button className="flex-1">تحويل إلى اليورو</Button>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* نافذة فتح حساب بعملة أجنبية */}
      <OpenNewAccount
        open={isOpenAccountDialogOpen}
        onOpenChange={setIsOpenAccountDialogOpen}
        onSuccess={() => {
          // تحديث البيانات بعد فتح الحساب بنجاح
          fetchForeignAccounts();
          toast({
            title: "تم بنجاح",
            description: "تم فتح الحساب الجديد بنجاح",
          });
        }}
        customerId={customerId} // استخدام معرف العميل الحالي
      />
    </div>
  );
}
