import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  ArrowRight,
  Users,
  Building,
  RefreshCw,
  DollarSign,
  Euro,
} from "lucide-react";

export default function Transfers() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [exchangeAmount, setExchangeAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("aed");
  const [toCurrency, setToCurrency] = useState("usd");

  // أسعار الصرف التقريبية
  const exchangeRates = {
    aed_usd: 0.2723, // 1 درهم = 0.2723 دولار
    aed_eur: 0.2488, // 1 درهم = 0.2488 يورو
    usd_aed: 3.67, // 1 دولار = 3.67 درهم
    eur_aed: 4.02, // 1 يورو = 4.02 درهم
    usd_eur: 0.91, // 1 دولار = 0.91 يورو
    eur_usd: 1.1, // 1 يورو = 1.10 دولار
  };

  // حساب المبلغ المحول
  const calculateExchange = () => {
    if (!exchangeAmount) return "0";

    const amount = parseFloat(exchangeAmount);
    const rate = exchangeRates[`${fromCurrency}_${toCurrency}`];

    if (!rate) return "0";

    return (amount * rate).toFixed(2);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">التحويلات المالية</h1>

      <Tabs defaultValue="local">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-2 sm:mb-0 overflow-x-auto">
          <TabsTrigger value="local">
            <Users className="ml-2 h-4 w-4" />
            تحويل محلي
          </TabsTrigger>
          <TabsTrigger value="bank">
            <Building className="ml-2 h-4 w-4" />
            بين الحسابات
          </TabsTrigger>
          <TabsTrigger value="exchange">
            <RefreshCw className="ml-2 h-4 w-4" />
            تغيير العملة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="local" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>تحويل محلي</CardTitle>
              <CardDescription>
                قم بتحويل الأموال إلى حسابات محلية أخرى
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from-account">من حساب</Label>
                <Select value={fromAccount} onValueChange={setFromAccount}>
                  <SelectTrigger id="from-account">
                    <SelectValue placeholder="اختر الحساب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">
                      الحساب الجاري (**** 4832)
                    </SelectItem>
                    <SelectItem value="savings">
                      حساب التوفير (**** 7621)
                    </SelectItem>
                    <SelectItem value="investment">
                      حساب الاستثمار (**** 9354)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient">المستلم</Label>
                <Input
                  id="recipient"
                  placeholder="رقم الحساب أو رقم الآيبان"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient-name">اسم المستلم</Label>
                <Input id="recipient-name" placeholder="اسم المستلم" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">المبلغ (د.إ)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="أدخل المبلغ"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">الغرض من التحويل</Label>
                <Select>
                  <SelectTrigger id="purpose">
                    <SelectValue placeholder="اختر الغرض" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="family">دعم عائلي</SelectItem>
                    <SelectItem value="personal">مصاريف شخصية</SelectItem>
                    <SelectItem value="business">أعمال تجارية</SelectItem>
                    <SelectItem value="deposit">إيداع في الحساب</SelectItem>
                    <SelectItem value="other">أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    (window.location.href = "/bank/deposit-instructions")
                  }
                >
                  عرض تعليمات الإيداع في حسابات البنك
                </Button>
              </div>

              <div className="pt-4">
                <Button className="w-full">
                  <ArrowRight className="ml-2 h-4 w-4" />
                  إتمام التحويل
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>المستفيدون المحفوظون</CardTitle>
              <CardDescription>
                اختر من قائمة المستفيدين المحفوظين لديك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-center text-muted-foreground">
                  لا يوجد مستفيدون محفوظون حالياً
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>التحويل بين الحسابات</CardTitle>
              <CardDescription>
                قم بتحويل الأموال بين حساباتك الشخصية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from-account-internal">من حساب</Label>
                <Select>
                  <SelectTrigger id="from-account-internal">
                    <SelectValue placeholder="اختر الحساب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">
                      الحساب الجاري (**** 4832)
                    </SelectItem>
                    <SelectItem value="savings">
                      حساب التوفير (**** 7621)
                    </SelectItem>
                    <SelectItem value="investment">
                      حساب الاستثمار (**** 9354)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="to-account-internal">إلى حساب</Label>
                <Select>
                  <SelectTrigger id="to-account-internal">
                    <SelectValue placeholder="اختر الحساب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">
                      الحساب الجاري (**** 4832)
                    </SelectItem>
                    <SelectItem value="savings">
                      حساب التوفير (**** 7621)
                    </SelectItem>
                    <SelectItem value="investment">
                      حساب الاستثمار (**** 9354)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount-internal">المبلغ (د.إ)</Label>
                <Input
                  id="amount-internal"
                  type="number"
                  placeholder="أدخل المبلغ"
                />
              </div>

              <div className="pt-4">
                <Button className="w-full">
                  <ArrowRight className="ml-2 h-4 w-4" />
                  إتمام التحويل
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exchange" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>تغيير العملة</CardTitle>
              <CardDescription>
                قم بتحويل الأموال بين العملات المختلفة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from-account-exchange">من حساب</Label>
                <Select>
                  <SelectTrigger id="from-account-exchange">
                    <SelectValue placeholder="اختر الحساب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">
                      الحساب الجاري - درهم (**** 4832)
                    </SelectItem>
                    <SelectItem value="dollar">
                      حساب الدولار (**** 5421)
                    </SelectItem>
                    <SelectItem value="euro">
                      حساب اليورو (**** 6832)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="to-account-exchange">إلى حساب</Label>
                <Select>
                  <SelectTrigger id="to-account-exchange">
                    <SelectValue placeholder="اختر الحساب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">
                      الحساب الجاري - درهم (**** 4832)
                    </SelectItem>
                    <SelectItem value="dollar">
                      حساب الدولار (**** 5421)
                    </SelectItem>
                    <SelectItem value="euro">
                      حساب اليورو (**** 6832)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>العملات</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Select
                      value={fromCurrency}
                      onValueChange={setFromCurrency}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="من" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aed">
                          <div className="flex items-center">
                            درهم اماراتي (د.إ)
                          </div>
                        </SelectItem>
                        <SelectItem value="usd">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 ml-1" />
                            دولار أمريكي ($)
                          </div>
                        </SelectItem>
                        <SelectItem value="eur">
                          <div className="flex items-center">
                            <Euro className="h-4 w-4 ml-1" />
                            يورو (€)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="إلى" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aed">
                          <div className="flex items-center">
                            درهم اماراتي (د.إ)
                          </div>
                        </SelectItem>
                        <SelectItem value="usd">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 ml-1" />
                            دولار أمريكي ($)
                          </div>
                        </SelectItem>
                        <SelectItem value="eur">
                          <div className="flex items-center">
                            <Euro className="h-4 w-4 ml-1" />
                            يورو (€)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount-exchange">المبلغ</Label>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {fromCurrency === "aed"
                          ? "درهم اماراتي"
                          : fromCurrency === "usd"
                            ? "دولار أمريكي"
                            : "يورو"}
                      </span>
                      <span className="text-sm font-medium">
                        سعر الصرف:{" "}
                        {fromCurrency !== toCurrency
                          ? exchangeRates[`${fromCurrency}_${toCurrency}`]
                          : 1}
                      </span>
                    </div>
                    <Input
                      id="amount-exchange"
                      type="number"
                      placeholder="أدخل المبلغ"
                      value={exchangeAmount}
                      onChange={(e) => setExchangeAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg mt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      المبلغ المحول
                    </p>
                    <p className="text-xl font-bold">
                      {calculateExchange()}{" "}
                      {toCurrency === "aed"
                        ? "د.إ"
                        : toCurrency === "usd"
                          ? "$"
                          : "€"}
                    </p>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-full">
                    <RefreshCw className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full">
                  <ArrowRight className="ml-2 h-4 w-4" />
                  إتمام تغيير العملة
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col text-sm text-muted-foreground">
              <p>ملاحظة: أسعار الصرف تخضع للتغيير وفقاً لأسعار السوق.</p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
