import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Alert, AlertDescription } from "../ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    idNumber: "",
    dob: "",
    username: "",
    password: "",
    initialDeposit: "1000",
    accountType: "جاري",
    currency: "دينار جزائري",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate a random account number
  const generateAccountNumber = () => {
    const randomPart = () => Math.floor(1000 + Math.random() * 9000);
    return `DZ59 ${randomPart()} ${randomPart()} ${randomPart()} ${randomPart()}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!acceptTerms) {
      setError("يرجى الموافقة على الشروط والأحكام");
      return;
    }

    if (
      !formData.initialDeposit ||
      isNaN(Number(formData.initialDeposit)) ||
      Number(formData.initialDeposit) <= 0
    ) {
      setError("يرجى إدخال مبلغ صحيح للإيداع الأولي");
      return;
    }

    // التحقق من الحد الأدنى للإيداع حسب نوع الحساب
    const minDeposit =
      formData.accountType === "جاري"
        ? 1000
        : formData.accountType === "توفير"
          ? 5000
          : formData.accountType === "استثمار"
            ? 10000
            : 0;

    if (Number(formData.initialDeposit) < minDeposit) {
      setError(
        `الحد الأدنى للإيداع في حساب ${formData.accountType} هو ${minDeposit} ${formData.currency === "دينار جزائري" ? "د.ج" : formData.currency === "دولار أمريكي" ? "$" : "€"}`,
      );
      return;
    }

    setIsRegistering(true);

    try {
      // 1. Create customer in Supabase
      const { data: customerData, error: customerError } = await supabase
        .from("customers")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            id_number: formData.idNumber,
            dob: formData.dob,
            username: formData.username,
            password: formData.password,
            security_level: "medium",
            transaction_limit: 50000,
            two_factor_enabled: false,
            status: "قيد التفعيل", // Changed from "نشط" to "قيد التفعيل"
            verification_status: "pending", // Added verification status
          },
        ])
        .select();

      if (customerError) {
        console.error("Error creating customer:", customerError);
        throw new Error("فشل في إنشاء حساب العميل");
      }

      if (!customerData || customerData.length === 0) {
        throw new Error("لم يتم إنشاء حساب العميل بشكل صحيح");
      }

      const customerId = customerData[0].id;
      console.log("Customer created with ID:", customerId);

      // 2. Create account for the customer
      const accountNumber = generateAccountNumber();
      const { data: accountData, error: accountError } = await supabase
        .from("accounts")
        .insert([
          {
            customer_id: customerId,
            account_number: accountNumber,
            type: formData.accountType,
            currency: formData.currency,
            balance: Number(formData.initialDeposit),
            status: "قيد التفعيل", // Changed from "نشط" to "قيد التفعيل"
          },
        ])
        .select();

      if (accountError) {
        console.error("Error creating account:", accountError);
        throw new Error("فشل في إنشاء الحساب المصرفي");
      }

      if (!accountData || accountData.length === 0) {
        throw new Error("لم يتم إنشاء الحساب المصرفي بشكل صحيح");
      }

      const accountId = accountData[0].id;
      console.log("Account created with ID:", accountId);

      // 3. Create initial deposit transaction
      const { error: transactionError } = await supabase
        .from("transactions")
        .insert([
          {
            account_id: accountId,
            type: "إيداع",
            amount: Number(formData.initialDeposit),
            description: "إيداع أولي عند فتح الحساب",
            status: "معلقة", // Changed from "مكتملة" to "معلقة"
          },
        ]);

      if (transactionError) {
        console.error("Error creating transaction:", transactionError);
        throw new Error("فشل في تسجيل معاملة الإيداع الأولي");
      }

      // Store customer in session
      sessionStorage.setItem(
        "currentCustomer",
        JSON.stringify(customerData[0]),
      );

      // Redirect to identity verification page
      navigate("/verify-identity", {
        state: { customerData: customerData[0] },
      });
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/15 via-secondary/5 to-background p-4 sm:p-6"
      dir="rtl"
    >
      <div className="w-full max-w-xl space-y-6 sm:space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">بنك الأمان</h1>
          <p className="mt-2 text-muted-foreground">فتح حساب جديد</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              إنشاء حساب جديد
            </CardTitle>
            <CardDescription className="text-center">
              أدخل بياناتك الشخصية لفتح حساب جديد
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* البيانات الشخصية */}
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="أدخل الاسم الكامل"
                      className="pr-10"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@example.com"
                      className="pr-10"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="05XXXXXXXX"
                      className="pr-10"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">العنوان</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="أدخل العنوان"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber">رقم الهوية</Label>
                  <Input
                    id="idNumber"
                    name="idNumber"
                    placeholder="أدخل رقم الهوية"
                    value={formData.idNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">تاريخ الميلاد</Label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dob"
                      name="dob"
                      type="date"
                      className="pr-10"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* بيانات الحساب */}
                <div className="space-y-2">
                  <Label htmlFor="username">اسم المستخدم</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      name="username"
                      placeholder="أدخل اسم المستخدم"
                      className="pr-10"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="أدخل كلمة المرور"
                      className="pr-10"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      className="absolute left-1 top-1 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) =>
                    setAcceptTerms(checked === true)
                  }
                />
                <Label
                  htmlFor="terms"
                  className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  أوافق على{" "}
                  <a href="#" className="text-primary underline">
                    الشروط والأحكام
                  </a>
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isRegistering}>
                {isRegistering ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent ml-2"></div>
                    جاري إنشاء الحساب...
                  </>
                ) : (
                  "إنشاء الحساب"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                لديك حساب بالفعل؟{" "}
                <Button
                  variant="link"
                  className="h-auto p-0"
                  onClick={() => navigate("/")}
                >
                  تسجيل الدخول
                </Button>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
