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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  CreditCard,
  DollarSign,
  Euro,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Label } from "../ui/label";

// بيانات حسابات البنك للإيداع
const bankAccounts = [
  {
    currency: "dzd",
    name: "الحساب الرئيسي - دينار جزائري",
    number: "DZ59 0034 1234 5678 9012 3456",
    iban: "DZ59 0034 1234 5678 9012 3456 789",
    swift: "DZBAALGX",
  },
  {
    currency: "usd",
    name: "حساب الدولار الأمريكي",
    number: "DZ59 0034 1234 5678 9012 3457",
    iban: "DZ59 0034 1234 5678 9012 3457 789",
    swift: "DZBAALGX",
  },
  {
    currency: "eur",
    name: "حساب اليورو",
    number: "DZ59 0034 1234 5678 9012 3458",
    iban: "DZ59 0034 1234 5678 9012 3458 789",
    swift: "DZBAALGX",
  },
];

export default function CustomerDepositInstructions() {
  const [selectedCurrency, setSelectedCurrency] = useState("dzd");
  const [copiedField, setCopiedField] = useState("");

  const handleCopyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  const getAccountByCurrency = (currency) => {
    return bankAccounts.find((account) => account.currency === currency);
  };

  const currentAccount = getAccountByCurrency(selectedCurrency);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">تعليمات الإيداع</h1>
            <p className="text-sm text-muted-foreground">
              كيفية إيداع الأموال في حسابك
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>إيداع الأموال في حسابك</CardTitle>
          <CardDescription>
            اتبع التعليمات أدناه لإيداع الأموال في حسابك لدى بنك الأمان
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-primary/5 p-4 rounded-md border border-primary/20">
            <p className="text-sm">
              لإيداع الأموال في حسابك، يجب عليك تحويل المبلغ إلى أحد حسابات
              البنك الرسمية المذكورة أدناه. يرجى التأكد من ذكر اسمك الكامل ورقم
              حسابك في تفاصيل التحويل لضمان إضافة المبلغ إلى حسابك بشكل صحيح.
            </p>
          </div>

          <Tabs
            defaultValue="dzd"
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
                <div className="bg-muted/30 p-4 rounded-md">
                  <h3 className="font-medium mb-2">
                    معلومات الحساب بالدينار الجزائري
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>اسم الحساب</Label>
                      <div className="p-2 bg-white rounded-md">
                        {currentAccount.name}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>رقم الحساب</Label>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-white rounded-md flex-1 font-mono">
                          {currentAccount.number}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard(
                              currentAccount.number,
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
                          {currentAccount.iban}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard(
                              currentAccount.iban,
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
                          {currentAccount.swift}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard(
                              currentAccount.swift,
                              "dzd-swift",
                            )
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
                      <strong>
                        تأكد من ذكر اسمك الكامل ورقم حسابك في بنك الأمان في
                        تفاصيل التحويل.
                      </strong>
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
                <div className="bg-muted/30 p-4 rounded-md">
                  <h3 className="font-medium mb-2">
                    معلومات الحساب بالدولار الأمريكي
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>اسم الحساب</Label>
                      <div className="p-2 bg-white rounded-md">
                        {currentAccount.name}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>رقم الحساب</Label>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-white rounded-md flex-1 font-mono">
                          {currentAccount.number}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard(
                              currentAccount.number,
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
                          {currentAccount.iban}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard(
                              currentAccount.iban,
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
                          {currentAccount.swift}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard(
                              currentAccount.swift,
                              "usd-swift",
                            )
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
                      <strong>
                        تأكد من ذكر اسمك الكامل ورقم حسابك في بنك الأمان في
                        تفاصيل التحويل.
                      </strong>
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
                <div className="bg-muted/30 p-4 rounded-md">
                  <h3 className="font-medium mb-2">معلومات الحساب باليورو</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>اسم الحساب</Label>
                      <div className="p-2 bg-white rounded-md">
                        {currentAccount.name}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>رقم الحساب</Label>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-white rounded-md flex-1 font-mono">
                          {currentAccount.number}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard(
                              currentAccount.number,
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
                          {currentAccount.iban}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard(
                              currentAccount.iban,
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
                          {currentAccount.swift}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleCopyToClipboard(
                              currentAccount.swift,
                              "eur-swift",
                            )
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
                      <strong>
                        تأكد من ذكر اسمك الكامل ورقم حسابك في بنك الأمان في
                        تفاصيل التحويل.
                      </strong>
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
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.print()}>
            طباعة التعليمات
          </Button>
          <Button>
            <ExternalLink className="ml-2 h-4 w-4" />
            الاتصال بالدعم
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
