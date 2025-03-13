import { useState } from "react";
import { Switch } from "../ui/switch";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DollarSign,
  Euro,
  TrendingUp,
  TrendingDown,
  Save,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "../ui/badge";

// بيانات أسعار الصرف الافتراضية
const defaultCurrencyRates = [
  {
    id: 1,
    code: "DZD",
    name: "دينار جزائري",
    symbol: "د.ج",
    baseRate: 1,
    buyRate: 1,
    sellRate: 1,
    lastUpdated: "2023-06-20T10:00:00",
    trend: "stable",
    trendPercentage: "0%",
    isBase: true,
  },
  {
    id: 2,
    code: "USD",
    name: "دولار أمريكي",
    symbol: "$",
    baseRate: 135.5,
    buyRate: 134.8,
    sellRate: 136.2,
    lastUpdated: "2023-06-20T10:00:00",
    trend: "up",
    trendPercentage: "+1.2%",
    isBase: false,
  },
  {
    id: 3,
    code: "EUR",
    name: "يورو",
    symbol: "€",
    baseRate: 148.2,
    buyRate: 147.5,
    sellRate: 149.0,
    lastUpdated: "2023-06-20T10:00:00",
    trend: "down",
    trendPercentage: "-0.5%",
    isBase: false,
  },
  {
    id: 4,
    code: "GBP",
    name: "جنيه إسترليني",
    symbol: "£",
    baseRate: 172.3,
    buyRate: 171.5,
    sellRate: 173.1,
    lastUpdated: "2023-06-20T10:00:00",
    trend: "up",
    trendPercentage: "+0.8%",
    isBase: false,
  },
  {
    id: 5,
    code: "CAD",
    name: "دولار كندي",
    symbol: "C$",
    baseRate: 101.2,
    buyRate: 100.5,
    sellRate: 102.0,
    lastUpdated: "2023-06-20T10:00:00",
    trend: "down",
    trendPercentage: "-0.3%",
    isBase: false,
  },
];

export default function BankCurrencySettings() {
  const [currencyRates, setCurrencyRates] = useState(defaultCurrencyRates);
  const [editingCurrency, setEditingCurrency] = useState(null);
  const [buyRate, setBuyRate] = useState("");
  const [sellRate, setSellRate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEditCurrency = (currency) => {
    setEditingCurrency(currency);
    setBuyRate(currency.buyRate.toString());
    setSellRate(currency.sellRate.toString());
  };

  const handleSaveRates = () => {
    if (!editingCurrency) return;

    // التحقق من صحة القيم المدخلة
    if (isNaN(Number(buyRate)) || isNaN(Number(sellRate))) {
      alert("الرجاء إدخال قيم صحيحة");
      return;
    }

    // محاكاة عملية الحفظ في قاعدة البيانات
    setIsLoading(true);

    setTimeout(() => {
      // تحديث أسعار الصرف
      const updatedRates = currencyRates.map((currency) => {
        if (currency.id === editingCurrency.id) {
          const newBuyRate = parseFloat(buyRate);
          const newSellRate = parseFloat(sellRate);
          const oldBaseRate = currency.baseRate;
          const newBaseRate = (newBuyRate + newSellRate) / 2;
          const trendDirection =
            newBaseRate > oldBaseRate
              ? "up"
              : newBaseRate < oldBaseRate
                ? "down"
                : "stable";
          const trendPercentage =
            oldBaseRate !== 0
              ? (((newBaseRate - oldBaseRate) / oldBaseRate) * 100).toFixed(1)
              : "0";

          return {
            ...currency,
            buyRate: newBuyRate,
            sellRate: newSellRate,
            baseRate: newBaseRate,
            lastUpdated: new Date().toISOString(),
            trend: trendDirection,
            trendPercentage: `${trendDirection === "up" ? "+" : trendDirection === "down" ? "-" : ""}${Math.abs(parseFloat(trendPercentage))}%`,
          };
        }
        return currency;
      });

      setCurrencyRates(updatedRates);
      setEditingCurrency(null);
      setBuyRate("");
      setSellRate("");
      setIsLoading(false);

      // إظهار رسالة نجاح
      alert("تم تحديث أسعار الصرف بنجاح");
    }, 800);
  };

  const handleCancelEdit = () => {
    setEditingCurrency(null);
    setBuyRate("");
    setSellRate("");
  };

  const handleRefreshRates = () => {
    setIsLoading(true);

    // محاكاة طلب تحديث الأسعار من مصدر خارجي
    setTimeout(() => {
      // إنشاء تغييرات عشوائية صغيرة في الأسعار
      const updatedRates = currencyRates.map((currency) => {
        if (currency.isBase) return currency; // لا تغير العملة الأساسية

        const randomChange = (Math.random() * 2 - 1) * 0.02; // تغيير عشوائي بين -2% و +2%
        const newBaseRate = currency.baseRate * (1 + randomChange);
        const newBuyRate = newBaseRate * 0.995; // سعر الشراء أقل من السعر الأساسي بنسبة 0.5%
        const newSellRate = newBaseRate * 1.005; // سعر البيع أعلى من السعر الأساسي بنسبة 0.5%

        const trendDirection =
          randomChange > 0 ? "up" : randomChange < 0 ? "down" : "stable";
        const trendPercentage = (randomChange * 100).toFixed(1);

        return {
          ...currency,
          baseRate: parseFloat(newBaseRate.toFixed(2)),
          buyRate: parseFloat(newBuyRate.toFixed(2)),
          sellRate: parseFloat(newSellRate.toFixed(2)),
          lastUpdated: new Date().toISOString(),
          trend: trendDirection,
          trendPercentage: `${trendDirection === "up" ? "+" : trendDirection === "down" ? "-" : ""}${Math.abs(parseFloat(trendPercentage))}%`,
        };
      });

      setCurrencyRates(updatedRates);
      setIsLoading(false);
      alert("تم تحديث أسعار الصرف من المصدر الخارجي");
    }, 2000);
  };

  // تنسيق التاريخ والوقت
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("ar-DZ", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">إعدادات العملات</h1>
            <p className="text-sm text-muted-foreground">
              إدارة أسعار صرف العملات في البنك
            </p>
          </div>
        </div>
        <Button onClick={handleRefreshRates} disabled={isLoading}>
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 ml-2 animate-spin" />
              جاري التحديث...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 ml-2" />
              تحديث الأسعار
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>أسعار صرف العملات</CardTitle>
          <CardDescription>
            إدارة أسعار شراء وبيع العملات الأجنبية مقابل الدينار الجزائري
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>العملة</TableHead>
                  <TableHead>الرمز</TableHead>
                  <TableHead>سعر الشراء</TableHead>
                  <TableHead>سعر البيع</TableHead>
                  <TableHead>السعر الأساسي</TableHead>
                  <TableHead>التغير</TableHead>
                  <TableHead>آخر تحديث</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currencyRates.map((currency) => (
                  <TableRow key={currency.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {currency.code === "USD" ? (
                          <DollarSign className="h-4 w-4 text-primary" />
                        ) : currency.code === "EUR" ? (
                          <Euro className="h-4 w-4 text-primary" />
                        ) : (
                          <span className="w-4 h-4 flex items-center justify-center text-primary font-bold">
                            {currency.symbol}
                          </span>
                        )}
                        {currency.name}
                      </div>
                    </TableCell>
                    <TableCell>{currency.code}</TableCell>
                    <TableCell>
                      {currency.isBase
                        ? "-"
                        : `${currency.buyRate.toLocaleString()} ${currency.isBase ? "" : "د.ج"}`}
                    </TableCell>
                    <TableCell>
                      {currency.isBase
                        ? "-"
                        : `${currency.sellRate.toLocaleString()} ${currency.isBase ? "" : "د.ج"}`}
                    </TableCell>
                    <TableCell>
                      {currency.isBase
                        ? "-"
                        : `${currency.baseRate.toLocaleString()} ${currency.isBase ? "" : "د.ج"}`}
                    </TableCell>
                    <TableCell>
                      {currency.isBase ? (
                        "-"
                      ) : (
                        <div className="flex items-center gap-1">
                          {currency.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : currency.trend === "down" ? (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          ) : (
                            <span className="h-4 w-4">-</span>
                          )}
                          <Badge
                            variant={
                              currency.trend === "up"
                                ? "success"
                                : currency.trend === "down"
                                  ? "destructive"
                                  : "outline"
                            }
                            className="rounded-full"
                          >
                            {currency.trendPercentage}
                          </Badge>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {formatDateTime(currency.lastUpdated)}
                    </TableCell>
                    <TableCell>
                      {currency.isBase ? (
                        <Badge variant="outline">العملة الأساسية</Badge>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditCurrency(currency)}
                          disabled={editingCurrency !== null}
                        >
                          تعديل الأسعار
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {editingCurrency && (
            <div className="mt-6 p-4 border rounded-lg bg-muted/20">
              <h3 className="text-lg font-medium mb-4">
                تعديل أسعار {editingCurrency.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buy-rate">سعر الشراء (د.ج)</Label>
                  <div className="relative">
                    <DollarSign className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="buy-rate"
                      type="number"
                      step="0.01"
                      placeholder="أدخل سعر الشراء"
                      value={buyRate}
                      onChange={(e) => setBuyRate(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    سعر شراء البنك للعملة من العملاء
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sell-rate">سعر البيع (د.ج)</Label>
                  <div className="relative">
                    <DollarSign className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="sell-rate"
                      type="number"
                      step="0.01"
                      placeholder="أدخل سعر البيع"
                      value={sellRate}
                      onChange={(e) => setSellRate(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    سعر بيع البنك للعملة للعملاء
                  </p>
                </div>
              </div>

              {parseFloat(sellRate) <= parseFloat(buyRate) && (
                <div className="mt-4 p-3 bg-warning/10 text-warning rounded-md flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <p className="text-sm">
                    تنبيه: سعر البيع يجب أن يكون أعلى من سعر الشراء لضمان هامش
                    ربح للبنك
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={handleCancelEdit}>
                  إلغاء
                </Button>
                <Button onClick={handleSaveRates}>
                  <Save className="ml-2 h-4 w-4" />
                  حفظ التغييرات
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col text-sm text-muted-foreground">
          <p>
            ملاحظة: يتم تحديث أسعار الصرف تلقائياً كل يوم عمل في الساعة 10:00
            صباحاً.
          </p>
          <p>آخر تحديث شامل: {formatDateTime(new Date().toISOString())}</p>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>إعدادات عرض العملات</CardTitle>
          <CardDescription>
            تخصيص كيفية عرض أسعار العملات للعملاء
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">عرض أسعار الصرف للعملاء</h3>
                <p className="text-sm text-muted-foreground">
                  السماح للعملاء برؤية أسعار الصرف الحالية
                </p>
              </div>
              <div className="flex items-center h-5">
                <Switch
                  id="show-rates"
                  aria-describedby="show-rates-description"
                  name="show-rates"
                  defaultChecked
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">عرض نسبة التغير</h3>
                <p className="text-sm text-muted-foreground">
                  عرض نسبة التغير في أسعار الصرف للعملاء
                </p>
              </div>
              <div className="flex items-center h-5">
                <Switch
                  id="show-change"
                  aria-describedby="show-change-description"
                  name="show-change"
                  defaultChecked
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">تحديثات في الوقت الفعلي</h3>
                <p className="text-sm text-muted-foreground">
                  تحديث أسعار الصرف للعملاء في الوقت الفعلي
                </p>
              </div>
              <div className="flex items-center h-5">
                <Switch
                  id="real-time"
                  aria-describedby="real-time-description"
                  name="real-time"
                  defaultChecked
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => alert("تم حفظ إعدادات عرض العملات بنجاح")}>
            <Save className="ml-2 h-4 w-4" />
            حفظ الإعدادات
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
