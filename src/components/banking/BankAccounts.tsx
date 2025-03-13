import { useState, useEffect } from "react";
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
  CreditCard,
  Copy,
  Check,
  AlertCircle,
  Info,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

// بيانات حسابات البنك
const bankAccounts = [
  {
    id: 1,
    name: "الحساب الرئيسي - دينار جزائري",
    number: "DZ59 0034 1234 5678 9012 3456",
    iban: "DZ59 0034 1234 5678 9012 3456 789",
    swift: "DZBAALGX",
    balance: "25,450,000 د.ج",
    currency: "دينار جزائري",
    type: "حساب رئيسي",
    status: "نشط",
    branch: "الفرع الرئيسي - الجزائر العاصمة",
    manager: "مدير الفرع الرئيسي",
  },
  {
    id: 2,
    name: "حساب الدولار الأمريكي",
    number: "DZ59 0034 1234 5678 9012 3457",
    iban: "DZ59 0034 1234 5678 9012 3457 789",
    swift: "DZBAALGX",
    balance: "185,000 $",
    currency: "دولار أمريكي",
    type: "حساب عملات أجنبية",
    status: "نشط",
    branch: "الفرع الرئيسي - الجزائر العاصمة",
    manager: "مدير قسم العملات الأجنبية",
  },
  {
    id: 3,
    name: "حساب اليورو",
    number: "DZ59 0034 1234 5678 9012 3458",
    iban: "DZ59 0034 1234 5678 9012 3458 789",
    swift: "DZBAALGX",
    balance: "150,000 €",
    currency: "يورو",
    type: "حساب عملات أجنبية",
    status: "نشط",
    branch: "الفرع الرئيسي - الجزائر العاصمة",
    manager: "مدير قسم العملات الأجنبية",
  },
  {
    id: 4,
    name: "حساب الاحتياطي - دينار جزائري",
    number: "DZ59 0034 1234 5678 9012 3459",
    iban: "DZ59 0034 1234 5678 9012 3459 789",
    swift: "DZBAALGX",
    balance: "10,000,000 د.ج",
    currency: "دينار جزائري",
    type: "حساب احتياطي",
    status: "نشط",
    branch: "الفرع الرئيسي - الجزائر العاصمة",
    manager: "المدير المالي",
  },
];

export default function BankAccounts() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDepositInstructionsOpen, setIsDepositInstructionsOpen] =
    useState(false);
  const [copiedField, setCopiedField] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("dzd");
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // استرجاع البيانات من قاعدة البيانات
    setTimeout(() => {
      // تعيين قائمة فارغة للحسابات
      setAccounts([]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleCopyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  const handleShowDetails = (account) => {
    setSelectedAccount(account);
    setIsDetailsOpen(true);
  };

  const handleShowDepositInstructions = (currency) => {
    setSelectedCurrency(currency);
    setIsDepositInstructionsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">حسابات البنك</h1>
            <p className="text-sm text-muted-foreground">
              إدارة الحسابات الرسمية للبنك
            </p>
          </div>
        </div>
        <Button onClick={() => handleShowDepositInstructions("dzd")}>
          عرض تعليمات الإيداع للعملاء
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الحسابات الرسمية للبنك</CardTitle>
          <CardDescription>
            قائمة بجميع الحسابات الرسمية للبنك بمختلف العملات
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
                <p className="text-sm text-muted-foreground">
                  جاري تحميل البيانات...
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم الحساب</TableHead>
                    <TableHead>رقم الحساب</TableHead>
                    <TableHead>العملة</TableHead>
                    <TableHead>الرصيد</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead className="text-left">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {account.currency === "دولار أمريكي" ? (
                            <DollarSign className="h-4 w-4 text-primary" />
                          ) : account.currency === "يورو" ? (
                            <Euro className="h-4 w-4 text-primary" />
                          ) : (
                            <CreditCard className="h-4 w-4 text-primary" />
                          )}
                          {account.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-mono">
                            {account.number.substring(0, 10)}...
                          </span>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() =>
                                    handleCopyToClipboard(
                                      account.number,
                                      `number-${account.id}`,
                                    )
                                  }
                                >
                                  {copiedField === `number-${account.id}` ? (
                                    <Check className="h-3 w-3 text-success" />
                                  ) : (
                                    <Copy className="h-3 w-3 text-muted-foreground" />
                                  )}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>نسخ رقم الحساب</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                      <TableCell>{account.currency}</TableCell>
                      <TableCell className="font-medium">
                        {account.balance}
                      </TableCell>
                      <TableCell>{account.type}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            account.status === "نشط" ? "success" : "destructive"
                          }
                          className="rounded-full"
                        >
                          {account.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleShowDetails(account)}
                          >
                            عرض التفاصيل
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleShowDepositInstructions(
                                account.currency === "دينار جزائري"
                                  ? "dzd"
                                  : account.currency === "دولار أمريكي"
                                    ? "usd"
                                    : "eur",
                              )
                            }
                          >
                            تعليمات الإيداع
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* نافذة تفاصيل الحساب */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        {selectedAccount && (
          <DialogContent className="max-w-3xl" dir="rtl">
            <DialogHeader>
              <DialogTitle>تفاصيل الحساب</DialogTitle>
              <DialogDescription>
                معلومات تفصيلية عن حساب {selectedAccount.name}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>اسم الحساب</Label>
                  <div className="p-2 bg-muted rounded-md">
                    {selectedAccount.name}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>العملة</Label>
                  <div className="p-2 bg-muted rounded-md">
                    {selectedAccount.currency}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>رقم الحساب</Label>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-muted rounded-md flex-1 font-mono">
                      {selectedAccount.number}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleCopyToClipboard(
                          selectedAccount.number,
                          "detail-number",
                        )
                      }
                    >
                      {copiedField === "detail-number" ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>رقم الآيبان (IBAN)</Label>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-muted rounded-md flex-1 font-mono">
                      {selectedAccount.iban}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleCopyToClipboard(
                          selectedAccount.iban,
                          "detail-iban",
                        )
                      }
                    >
                      {copiedField === "detail-iban" ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>رمز السويفت (SWIFT)</Label>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-muted rounded-md flex-1 font-mono">
                      {selectedAccount.swift}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleCopyToClipboard(
                          selectedAccount.swift,
                          "detail-swift",
                        )
                      }
                    >
                      {copiedField === "detail-swift" ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>الرصيد الحالي</Label>
                  <div className="p-2 bg-muted rounded-md font-bold">
                    {selectedAccount.balance}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>نوع الحساب</Label>
                  <div className="p-2 bg-muted rounded-md">
                    {selectedAccount.type}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>الفرع</Label>
                  <div className="p-2 bg-muted rounded-md">
                    {selectedAccount.branch}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>المدير المسؤول</Label>
                  <div className="p-2 bg-muted rounded-md">
                    {selectedAccount.manager}
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-4 rounded-md border border-primary/20">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">معلومات هامة</h3>
                    <p className="text-sm text-muted-foreground">
                      هذا الحساب مخصص للاستخدام الرسمي للبنك. يجب استخدام هذه
                      المعلومات فقط للأغراض المصرفية الرسمية وعمليات تحويل
                      الأموال المصرح بها.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={() =>
                  handleShowDepositInstructions(
                    selectedAccount.currency === "دينار جزائري"
                      ? "dzd"
                      : selectedAccount.currency === "دولار أمريكي"
                        ? "usd"
                        : "eur",
                  )
                }
              >
                عرض تعليمات الإيداع
              </Button>
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                إغلاق
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* نافذة تعليمات الإيداع */}
      <Dialog
        open={isDepositInstructionsOpen}
        onOpenChange={setIsDepositInstructionsOpen}
      >
        <DialogContent className="max-w-3xl" dir="rtl">
          <DialogHeader>
            <DialogTitle>تعليمات الإيداع للعملاء</DialogTitle>
            <DialogDescription>
              معلومات للعملاء حول كيفية إيداع الأموال في حسابات البنك
            </DialogDescription>
          </DialogHeader>

          <Tabs
            defaultValue={selectedCurrency}
            value={selectedCurrency}
            onValueChange={setSelectedCurrency}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dzd">
                <CreditCard className="ml-2 h-4 w-4" />
                الدينار الجزائري
              </TabsTrigger>
              <TabsTrigger value="usd">
                <DollarSign className="ml-2 h-4 w-4" />
                الدولار الأمريكي
              </TabsTrigger>
              <TabsTrigger value="eur">
                <Euro className="ml-2 h-4 w-4" />
                اليورو
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dzd" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-md border border-primary/20">
                  <h3 className="font-medium mb-2">
                    معلومات الحساب بالدينار الجزائري
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>اسم الحساب</Label>
                      <div className="p-2 bg-white rounded-md">
                        الحساب الرئيسي - دينار جزائري
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>رقم الحساب</Label>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-white rounded-md flex-1 font-mono">
                          DZ59 0034 1234 5678 9012 3456
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard(
                              "DZ59 0034 1234 5678 9012 3456",
                              "dzd-number",
                            )
                          }
                        >
                          {copiedField === "dzd-number" ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>رقم الآيبان (IBAN)</Label>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-white rounded-md flex-1 font-mono">
                          DZ59 0034 1234 5678 9012 3456 789
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard(
                              "DZ59 0034 1234 5678 9012 3456 789",
                              "dzd-iban",
                            )
                          }
                        >
                          {copiedField === "dzd-iban" ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>رمز السويفت (SWIFT)</Label>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-white rounded-md flex-1 font-mono">
                          DZBAALGX
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard("DZBAALGX", "dzd-swift")
                          }
                        >
                          {copiedField === "dzd-swift" ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">
                    خطوات الإيداع بالدينار الجزائري
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>
                      قم بزيارة أقرب فرع لبنك الأمان أو أي بنك آخر تتعامل معه.
                    </li>
                    <li>
                      اطلب من موظف البنك إجراء تحويل إلى الحساب المذكور أعلاه.
                    </li>
                    <li>قدم رقم الحساب أو رقم الآيبان (IBAN) المذكور أعلاه.</li>
                    <li>
                      تأكد من ذكر اسمك ورقم حسابك في بنك الأمان في تفاصيل
                      التحويل.
                    </li>
                    <li>
                      احتفظ بإيصال التحويل كدليل على العملية حتى يتم تأكيد
                      الإيداع في حسابك.
                    </li>
                  </ol>
                </div>

                <div className="bg-warning/10 p-4 rounded-md border border-warning/20 flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h3 className="font-medium text-warning">ملاحظة هامة</h3>
                    <p className="text-sm">
                      يرجى التأكد من إدخال المعلومات بشكل صحيح. قد تستغرق عملية
                      الإيداع ما بين 1-3 أيام عمل لتظهر في حسابك، اعتمادًا على
                      البنك المرسل.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="usd" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-md border border-primary/20">
                  <h3 className="font-medium mb-2">
                    معلومات الحساب بالدولار الأمريكي
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>اسم الحساب</Label>
                      <div className="p-2 bg-white rounded-md">
                        حساب الدولار الأمريكي
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>رقم الحساب</Label>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-white rounded-md flex-1 font-mono">
                          DZ59 0034 1234 5678 9012 3457
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard(
                              "DZ59 0034 1234 5678 9012 3457",
                              "usd-number",
                            )
                          }
                        >
                          {copiedField === "usd-number" ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>رقم الآيبان (IBAN)</Label>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-white rounded-md flex-1 font-mono">
                          DZ59 0034 1234 5678 9012 3457 789
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard(
                              "DZ59 0034 1234 5678 9012 3457 789",
                              "usd-iban",
                            )
                          }
                        >
                          {copiedField === "usd-iban" ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>رمز السويفت (SWIFT)</Label>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-white rounded-md flex-1 font-mono">
                          DZBAALGX
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard("DZBAALGX", "usd-swift")
                          }
                        >
                          {copiedField === "usd-swift" ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">
                    خطوات الإيداع بالدولار الأمريكي
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>
                      قم بزيارة أقرب فرع لبنك الأمان أو أي بنك آخر يتعامل
                      بالعملات الأجنبية.
                    </li>
                    <li>
                      اطلب من موظف البنك إجراء تحويل دولي بالدولار الأمريكي إلى
                      الحساب المذكور أعلاه.
                    </li>
                    <li>
                      قدم رقم الحساب ورمز السويفت (SWIFT) ورقم الآيبان (IBAN)
                      المذكورين أعلاه.
                    </li>
                    <li>
                      تأكد من ذكر اسمك ورقم حسابك في بنك الأمان في تفاصيل
                      التحويل.
                    </li>
                    <li>
                      احتفظ بإيصال التحويل كدليل على العملية حتى يتم تأكيد
                      الإيداع في حسابك.
                    </li>
                  </ol>
                </div>

                <div className="bg-warning/10 p-4 rounded-md border border-warning/20 flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h3 className="font-medium text-warning">ملاحظة هامة</h3>
                    <p className="text-sm">
                      قد تستغرق التحويلات الدولية بالدولار الأمريكي ما بين 3-5
                      أيام عمل لتظهر في حسابك. قد تطبق رسوم تحويل إضافية من قبل
                      البنك المرسل أو البنوك الوسيطة.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="eur" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-md border border-primary/20">
                  <h3 className="font-medium mb-2">معلومات الحساب باليورو</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>اسم الحساب</Label>
                      <div className="p-2 bg-white rounded-md">حساب اليورو</div>
                    </div>
                    <div className="space-y-2">
                      <Label>رقم الحساب</Label>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-white rounded-md flex-1 font-mono">
                          DZ59 0034 1234 5678 9012 3458
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard(
                              "DZ59 0034 1234 5678 9012 3458",
                              "eur-number",
                            )
                          }
                        >
                          {copiedField === "eur-number" ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>رقم الآيبان (IBAN)</Label>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-white rounded-md flex-1 font-mono">
                          DZ59 0034 1234 5678 9012 3458 789
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard(
                              "DZ59 0034 1234 5678 9012 3458 789",
                              "eur-iban",
                            )
                          }
                        >
                          {copiedField === "eur-iban" ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>رمز السويفت (SWIFT)</Label>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-white rounded-md flex-1 font-mono">
                          DZBAALGX
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard("DZBAALGX", "eur-swift")
                          }
                        >
                          {copiedField === "eur-swift" ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">خطوات الإيداع باليورو</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>
                      قم بزيارة أقرب فرع لبنك الأمان أو أي بنك آخر يتعامل
                      بالعملات الأجنبية.
                    </li>
                    <li>
                      اطلب من موظف البنك إجراء تحويل دولي باليورو إلى الحساب
                      المذكور أعلاه.
                    </li>
                    <li>
                      قدم رقم الحساب ورمز السويفت (SWIFT) ورقم الآيبان (IBAN)
                      المذكورين أعلاه.
                    </li>
                    <li>
                      تأكد من ذكر اسمك ورقم حسابك في بنك الأمان في تفاصيل
                      التحويل.
                    </li>
                    <li>
                      احتفظ بإيصال التحويل كدليل على العملية حتى يتم تأكيد
                      الإيداع في حسابك.
                    </li>
                  </ol>
                </div>

                <div className="bg-warning/10 p-4 rounded-md border border-warning/20 flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <h3 className="font-medium text-warning">ملاحظة هامة</h3>
                    <p className="text-sm">
                      قد تستغرق التحويلات الدولية باليورو ما بين 2-4 أيام عمل
                      لتظهر في حسابك. قد تطبق رسوم تحويل إضافية من قبل البنك
                      المرسل أو البنوك الوسيطة.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDepositInstructionsOpen(false)}
            >
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
