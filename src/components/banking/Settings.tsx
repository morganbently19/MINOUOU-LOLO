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
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  User,
  Shield,
  Bell,
  Smartphone,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Mail,
} from "lucide-react";
import { useToast } from "../ui/use-toast";

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [smsNotificationsEnabled, setSmsNotificationsEnabled] = useState(true);
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
    useState(true);
  const [accountStatus, setAccountStatus] = useState("نشط"); // نشط، معلق، مغلق
  const { toast } = useToast();

  const handleSavePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمة المرور الجديدة وتأكيدها غير متطابقين",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "خطأ",
        description: "يجب أن تكون كلمة المرور الجديدة 8 أحرف على الأقل",
        variant: "destructive",
      });
      return;
    }

    // هنا يمكن إضافة المزيد من التحقق من قوة كلمة المرور

    toast({
      title: "تم بنجاح",
      description: "تم تغيير كلمة المرور بنجاح",
    });

    // إعادة تعيين الحقول
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast({
      title: twoFactorEnabled
        ? "تم تعطيل المصادقة الثنائية"
        : "تم تفعيل المصادقة الثنائية",
      description: twoFactorEnabled
        ? "تم إلغاء تفعيل المصادقة الثنائية لحسابك"
        : "تم تفعيل المصادقة الثنائية لحسابك بنجاح",
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-6 bg-gray-50/80 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">الإعدادات</h1>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            معلومات الحساب
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            الأمان
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            الإشعارات
          </TabsTrigger>
        </TabsList>

        {/* معلومات الحساب */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>معلومات الحساب الشخصية</CardTitle>
              <CardDescription>
                يمكنك تعديل معلومات حسابك الشخصية هنا
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">الاسم الكامل</Label>
                  <Input id="fullName" defaultValue="أحمد محمد" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="ahmed@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input id="phone" defaultValue="+213 555 123 456" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">العنوان</Label>
                  <Input id="address" defaultValue="الجزائر العاصمة، الجزائر" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>حفظ التغييرات</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>حالة الحساب</CardTitle>
              <CardDescription>
                معلومات حول حالة حسابك المصرفي الحالية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">
                    حالة الحساب: {accountStatus}
                  </h3>
                  <p className="text-sm text-green-600">
                    حسابك نشط ويعمل بشكل طبيعي
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">مستوى التحقق</h3>
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-primary/10 rounded-full">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span>تم التحقق بالكامل</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">حدود المعاملات</h3>
                  <p className="text-sm">الحد اليومي: 100,000 د.ج</p>
                  <p className="text-sm">الحد الشهري: 3,000,000 د.ج</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>معلومات البطاقات</CardTitle>
              <CardDescription>
                إدارة بطاقاتك المصرفية المرتبطة بالحساب
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">بطاقة فيزا الذهبية</h3>
                    <p className="text-sm text-muted-foreground">
                      **** **** **** 4582
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    نشطة
                  </span>
                  <Button variant="outline" size="sm">
                    إدارة
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <CreditCard className="h-4 w-4 ml-2" />
                طلب بطاقة جديدة
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* الأمان */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>تغيير كلمة المرور</CardTitle>
              <CardDescription>
                قم بتغيير كلمة المرور الخاصة بك بشكل دوري للحفاظ على أمان حسابك
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  تأكيد كلمة المرور الجديدة
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePassword}>
                حفظ كلمة المرور الجديدة
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>المصادقة الثنائية</CardTitle>
              <CardDescription>
                تعزيز أمان حسابك باستخدام المصادقة الثنائية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>تفعيل المصادقة الثنائية</Label>
                  <p className="text-sm text-muted-foreground">
                    سيتم إرسال رمز تحقق إلى هاتفك عند تسجيل الدخول
                  </p>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={handleToggleTwoFactor}
                />
              </div>

              {twoFactorEnabled && (
                <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    طريقة المصادقة الحالية
                  </h3>
                  <p className="text-sm mb-4">
                    رسائل SMS على الرقم: +213 555 *** 456
                  </p>
                  <Button variant="outline" size="sm">
                    تغيير طريقة المصادقة
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>سجل تسجيل الدخول</CardTitle>
              <CardDescription>
                مراجعة آخر عمليات تسجيل الدخول إلى حسابك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">تسجيل دخول ناجح</p>
                      <p className="text-sm text-muted-foreground">
                        الجزائر العاصمة، الجزائر
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    اليوم، 10:25 ص
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">تسجيل دخول ناجح</p>
                      <p className="text-sm text-muted-foreground">
                        الجزائر العاصمة، الجزائر
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    أمس، 08:17 م
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-full">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">محاولة تسجيل دخول فاشلة</p>
                      <p className="text-sm text-muted-foreground">
                        وهران، الجزائر
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    قبل 3 أيام، 11:42 م
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">عرض كل سجلات تسجيل الدخول</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* الإشعارات */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الإشعارات</CardTitle>
              <CardDescription>
                تخصيص الإشعارات التي ترغب في تلقيها من البنك
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>تفعيل الإشعارات</Label>
                  <p className="text-sm text-muted-foreground">
                    تلقي إشعارات حول نشاط حسابك
                  </p>
                </div>
                <Switch
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">طرق الإشعارات</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <Label>رسائل SMS</Label>
                  </div>
                  <Switch
                    checked={smsNotificationsEnabled}
                    onCheckedChange={setSmsNotificationsEnabled}
                    disabled={!notificationsEnabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Label>البريد الإلكتروني</Label>
                  </div>
                  <Switch
                    checked={emailNotificationsEnabled}
                    onCheckedChange={setEmailNotificationsEnabled}
                    disabled={!notificationsEnabled}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">أنواع الإشعارات</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="transactions"
                      defaultChecked
                      disabled={!notificationsEnabled}
                    />
                    <Label htmlFor="transactions">المعاملات المالية</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="security"
                      defaultChecked
                      disabled={!notificationsEnabled}
                    />
                    <Label htmlFor="security">تنبيهات الأمان</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="promotions"
                      disabled={!notificationsEnabled}
                    />
                    <Label htmlFor="promotions">العروض والترقيات</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="account"
                      defaultChecked
                      disabled={!notificationsEnabled}
                    />
                    <Label htmlFor="account">تحديثات الحساب</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>حفظ إعدادات الإشعارات</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
