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
import { Eye, EyeOff, Lock, User, Shield, AlertCircle } from "lucide-react";
import { customerService } from "@/lib/customers";
import { supabase } from "@/lib/supabase";
import { Alert, AlertDescription } from "../ui/alert";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);

    try {
      // التحقق من اسم المستخدم وكلمة المرور للمدير
      if (username.toLowerCase() === "patron" && password) {
        // توجيه المدير إلى لوحة التحكم
        navigate("/admin");
        return;
      }

      // محاولة التحقق من اسم المستخدم وكلمة المرور من Supabase
      const { data, error } = await supabase
        .from("customers")
        .select("*")
        .eq("username", username)
        .single();

      if (error) {
        console.error("Supabase error:", error);
        // إذا لم يتم العثور على المستخدم في Supabase، نستخدم البيانات المحلية
        const customer = customerService.authenticateCustomer(
          username,
          password,
        );
        if (customer) {
          // تخزين معلومات العميل في الجلسة
          sessionStorage.setItem("currentCustomer", JSON.stringify(customer));
          // توجيه المستخدم العادي إلى الصفحة الرئيسية
          navigate("/bank");
        } else {
          setError("اسم المستخدم أو كلمة المرور غير صحيحة");
        }
      } else {
        // التحقق من كلمة المرور
        if (data.password === password) {
          // تخزين معلومات العميل في الجلسة
          sessionStorage.setItem("currentCustomer", JSON.stringify(data));
          // توجيه المستخدم العادي إلى الصفحة الرئيسية
          navigate("/bank");
        } else {
          setError("اسم المستخدم أو كلمة المرور غير صحيحة");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/15 via-secondary/5 to-background p-4 sm:p-6"
      dir="rtl"
    >
      <div className="w-full max-w-md space-y-6 sm:space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">بنك الأمان</h1>
          <p className="mt-2 text-muted-foreground">الخدمات المصرفية الشخصية</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">تسجيل الدخول</CardTitle>
            <CardDescription className="text-center">
              أدخل بيانات الدخول للوصول إلى حسابك
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">اسم المستخدم</Label>
                <div className="relative">
                  <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="أدخل اسم المستخدم"
                    className="pr-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs"
                    type="button"
                  >
                    نسيت كلمة المرور؟
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور"
                    className="pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">
                  تذكرني
                </Label>
              </div>
              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent ml-2"></div>
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  "تسجيل الدخول"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  أو تسجيل الدخول باستخدام
                </span>
              </div>
            </div>
            <div className="flex gap-2 flex-col sm:flex-row">
              <Button variant="outline" className="w-full">
                بصمة الوجه
              </Button>
              <Button variant="outline" className="w-full">
                بصمة الإصبع
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="text-center text-sm">
          <p className="text-muted-foreground">
            ليس لديك حساب؟{" "}
            <Button
              variant="link"
              className="h-auto p-0"
              onClick={() => navigate("/register")}
            >
              فتح حساب جديد
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
