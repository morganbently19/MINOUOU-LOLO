import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
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
  CreditCard,
  User,
  Phone,
  Mail,
  Calendar,
  Shield,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Plus,
  Save,
  Lock,
  Unlock,
  Key,
  Smartphone,
  TrendingDown,
  Trash2,
} from "lucide-react";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";

interface CustomerDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: {
    id: number;
    name: string;
    accountNumber: string;
    balance: string;
    status: string;
    email: string;
    phone: string;
  } | null;
}

export default function CustomerDetails({
  open,
  onOpenChange,
  customer,
}: CustomerDetailsProps) {
  const [balance, setBalance] = useState("");
  const [status, setStatus] = useState(customer?.status || "نشط");
  const [securityLevel, setSecurityLevel] = useState("medium");
  const [transactionLimit, setTransactionLimit] = useState("50000");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showAddAccountForm, setShowAddAccountForm] = useState(false);
  const [accountType, setAccountType] = useState("جاري");
  const [currency, setCurrency] = useState("دينار جزائري");
  const [initialDeposit, setInitialDeposit] = useState("");

  if (!customer) return null;

  const handleSaveChanges = () => {
    // في التطبيق الحقيقي، هنا سيتم حفظ التغييرات في قاعدة البيانات
    console.log("تم حفظ التغييرات");
    alert("تم حفظ التغييرات بنجاح");
  };

  const handleUpdateBalance = () => {
    // في التطبيق الحقيقي، هنا سيتم تحديث الرصيد في قاعدة البيانات
    console.log("تم تحديث الرصيد إلى", balance);
    alert(`تم تحديث الرصيد بنجاح إلى ${balance} د.ج`);
  };

  const handleDeposit = () => {
    if (!balance || isNaN(Number(balance))) {
      alert("الرجاء إدخال مبلغ صحيح");
      return;
    }
    // في التطبيق الحقيقي، هنا سيتم إيداع المبلغ في قاعدة البيانات
    console.log("تم إيداع مبلغ", balance);
    alert(`تم إيداع مبلغ ${balance} د.ج بنجاح`);
    setBalance("");
  };

  const handleWithdraw = () => {
    if (!balance || isNaN(Number(balance))) {
      alert("الرجاء إدخال مبلغ صحيح");
      return;
    }
    // في التطبيق الحقيقي، هنا سيتم سحب المبلغ من قاعدة البيانات
    console.log("تم سحب مبلغ", balance);
    alert(`تم سحب مبلغ ${balance} د.ج بنجاح`);
    setBalance("");
  };

  const handleUpdateStatus = () => {
    // في التطبيق الحقيقي، هنا سيتم تحديث حالة الحساب في قاعدة البيانات
    console.log("تم تحديث حالة الحساب إلى", status);
    alert(`تم تحديث حالة الحساب بنجاح إلى ${status}`);
  };

  const handleUpdateSecurity = () => {
    // في التطبيق الحقيقي، هنا سيتم تحديث إعدادات الأمان في قاعدة البيانات
    console.log("تم تحديث إعدادات الأمان");
    alert("تم تحديث إعدادات الأمان بنجاح");
  };

  const handleResetPassword = () => {
    // في التطبيق الحقيقي، هنا سيتم إرسال رابط إعادة تعيين كلمة المرور
    console.log("تم إرسال رابط إعادة تعيين كلمة المرور");
    alert("تم إرسال رابط إعادة تعيين كلمة المرور بنجاح");
  };

  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // في التطبيق الحقيقي، هنا سيتم تفعيل/تعطيل المصادقة الثنائية في قاعدة البيانات
    console.log("تم تغيير حالة المصادقة الثنائية إلى", !twoFactorEnabled);
  };

  const handleAddAccount = () => {
    if (!initialDeposit || isNaN(Number(initialDeposit))) {
      alert("الرجاء إدخال مبلغ صحيح للإيداع الأولي");
      return;
    }
    // في التطبيق الحقيقي، هنا سيتم إضافة حساب جديد في قاعدة البيانات
    console.log("تم إضافة حساب جديد", {
      accountType,
      currency,
      initialDeposit,
    });
    alert(`تم إضافة حساب ${accountType} جديد بنجاح`);
    setShowAddAccountForm(false);
    setAccountType("جاري");
    setCurrency("دينار جزائري");
    setInitialDeposit("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl" dir="rtl">
        <DialogHeader>
          <DialogTitle>تفاصيل العميل</DialogTitle>
          <DialogDescription>
            عرض وتعديل بيانات العميل {customer.name}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">
              <User className="ml-2 h-4 w-4" />
              البيانات الشخصية
            </TabsTrigger>
            <TabsTrigger value="accounts">
              <CreditCard className="ml-2 h-4 w-4" />
              الحسابات
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="ml-2 h-4 w-4" />
              الأمان
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">اسم العميل</Label>
                <div className="relative">
                  <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    defaultValue={customer.name}
                    className="pr-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    defaultValue={customer.email}
                    className="pr-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <div className="relative">
                  <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    defaultValue={customer.phone}
                    className="pr-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">تاريخ الميلاد</Label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="dob"
                    type="date"
                    defaultValue="1990-01-01"
                    className="pr-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">العنوان</Label>
                <Input id="address" defaultValue="الجزائر العاصمة" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="id-number">رقم الهوية</Label>
                <Input id="id-number" defaultValue="29384756" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSaveChanges}>
                <Save className="ml-2 h-4 w-4" />
                حفظ التغييرات
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="accounts" className="space-y-4 mt-4">
            <div className="border rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-medium">الحساب الجاري</h3>
                  <p className="text-sm text-muted-foreground">
                    {customer.accountNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">الرصيد الحالي</p>
                  <p className="font-bold text-xl">{customer.balance}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-balance">تعديل الرصيد</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <DollarSign className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="new-balance"
                        type="number"
                        placeholder="أدخل المبلغ"
                        className="pr-10"
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" onClick={handleDeposit}>
                      <Plus className="ml-2 h-4 w-4" />
                      إيداع
                    </Button>
                    <Button variant="outline" onClick={handleWithdraw}>
                      <TrendingDown className="ml-2 h-4 w-4" />
                      سحب
                    </Button>
                    <Button onClick={handleUpdateBalance}>
                      <Save className="ml-2 h-4 w-4" />
                      تحديث الرصيد
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account-status">حالة الحساب</Label>
                  <div className="flex gap-2">
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger id="account-status" className="flex-1">
                        <SelectValue placeholder="اختر حالة الحساب" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="نشط">نشط</SelectItem>
                        <SelectItem value="مجمد">مجمد</SelectItem>
                        <SelectItem value="مغلق">مغلق</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleUpdateStatus}>
                      {status === "نشط" ? (
                        <>
                          <CheckCircle className="ml-2 h-4 w-4" />
                          تفعيل
                        </>
                      ) : status === "مجمد" ? (
                        <>
                          <Lock className="ml-2 h-4 w-4" />
                          تجميد
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="ml-2 h-4 w-4" />
                          إغلاق
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {showAddAccountForm ? (
              <div className="border rounded-lg p-4 mb-4">
                <h3 className="font-medium mb-4">إضافة حساب جديد</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="account-type">نوع الحساب</Label>
                    <Select value={accountType} onValueChange={setAccountType}>
                      <SelectTrigger id="account-type">
                        <SelectValue placeholder="اختر نوع الحساب" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="جاري">جاري</SelectItem>
                        <SelectItem value="توفير">توفير</SelectItem>
                        <SelectItem value="استثمار">استثمار</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">العملة</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="اختر العملة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="دينار جزائري">
                          دينار جزائري
                        </SelectItem>
                        <SelectItem value="دولار أمريكي">
                          دولار أمريكي
                        </SelectItem>
                        <SelectItem value="يورو">يورو</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="initial-deposit">الإيداع الأولي</Label>
                    <div className="relative">
                      <DollarSign className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="initial-deposit"
                        type="number"
                        placeholder="أدخل مبلغ الإيداع الأولي"
                        className="pr-10"
                        value={initialDeposit}
                        onChange={(e) => setInitialDeposit(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddAccountForm(false)}
                    >
                      إلغاء
                    </Button>
                    <Button onClick={handleAddAccount}>إنشاء الحساب</Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border rounded-lg p-4 border-dashed">
                <div className="flex flex-col items-center justify-center py-4">
                  <CreditCard className="h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="font-medium">إضافة حساب جديد</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    يمكنك إضافة حساب جديد للعميل
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddAccountForm(true)}
                  >
                    <Plus className="ml-2 h-4 w-4" />
                    إضافة حساب
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="security" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="security-level"
                  className="flex justify-between"
                >
                  <span>مستوى الأمان</span>
                  <Badge
                    variant={
                      securityLevel === "high"
                        ? "success"
                        : securityLevel === "medium"
                          ? "default"
                          : "destructive"
                    }
                    className="rounded-full"
                  >
                    {securityLevel === "high"
                      ? "عالي"
                      : securityLevel === "medium"
                        ? "متوسط"
                        : "منخفض"}
                  </Badge>
                </Label>
                <Select value={securityLevel} onValueChange={setSecurityLevel}>
                  <SelectTrigger id="security-level">
                    <SelectValue placeholder="اختر مستوى الأمان" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">عالي</SelectItem>
                    <SelectItem value="medium">متوسط</SelectItem>
                    <SelectItem value="low">منخفض</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transaction-limit">حد المعاملات اليومي</Label>
                <div className="relative">
                  <DollarSign className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="transaction-limit"
                    type="number"
                    value={transactionLimit}
                    onChange={(e) => setTransactionLimit(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Key className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">إعادة تعيين كلمة المرور</h3>
                    <p className="text-sm text-muted-foreground">
                      إرسال رابط إعادة تعيين كلمة المرور للعميل
                    </p>
                  </div>
                </div>
                <Button variant="outline" onClick={handleResetPassword}>
                  إرسال الرابط
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">المصادقة الثنائية</h3>
                    <p className="text-sm text-muted-foreground">
                      {twoFactorEnabled
                        ? "المصادقة الثنائية مفعلة"
                        : "المصادقة الثنائية غير مفعلة"}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={handleToggleTwoFactor}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleUpdateSecurity}>
                  <Save className="ml-2 h-4 w-4" />
                  حفظ إعدادات الأمان
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between">
          <Button variant="destructive">
            <Trash2 className="ml-2 h-4 w-4" />
            حذف العميل
          </Button>
          <Button onClick={() => onOpenChange(false)}>إغلاق</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
