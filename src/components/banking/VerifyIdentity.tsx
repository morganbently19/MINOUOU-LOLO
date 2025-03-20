import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import {
  AlertCircle,
  Upload,
  FileCheck,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { supabase } from "@/lib/supabase";

export default function VerifyIdentity() {
  const navigate = useNavigate();
  const location = useLocation();
  const customerData = location.state?.customerData;

  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [idType, setIdType] = useState("بطاقة التعريف");
  const [frontIdFile, setFrontIdFile] = useState(null);
  const [backIdFile, setBackIdFile] = useState(null);
  const [frontIdPreview, setFrontIdPreview] = useState("");
  const [backIdPreview, setBackIdPreview] = useState("");

  const handleFileChange = (e, side) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.includes("image/")) {
      setError("يرجى تحميل ملف صورة فقط");
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("حجم الملف كبير جدًا. الحد الأقصى هو 5 ميجابايت");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (side === "front") {
        setFrontIdFile(file);
        setFrontIdPreview(event.target.result);
      } else {
        setBackIdFile(file);
        setBackIdPreview(event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!frontIdFile || !backIdFile) {
      setError("يرجى تحميل صور الوجه الأمامي والخلفي للوثيقة");
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real application, you would upload these files to storage
      // For demo purposes, we'll simulate a successful upload

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message
      setShowSuccess(true);

      // In a real app, you would update the customer verification status in the database
      // await supabase.from("customers").update({ verification_status: "pending" }).eq("id", customerData.id);
    } catch (err) {
      console.error("Verification error:", err);
      setError(
        err.message || "حدث خطأ أثناء رفع المستندات. يرجى المحاولة مرة أخرى.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/15 via-secondary/5 to-background p-4 sm:p-6"
        dir="rtl"
      >
        <div className="w-full max-w-xl space-y-6 sm:space-y-8">
          <Card className="border-2 border-primary/20">
            <CardHeader className="pb-4">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl text-center mt-4">
                تم استلام طلبك بنجاح
              </CardTitle>
              <CardDescription className="text-center text-base">
                شكراً لإكمال عملية التسجيل
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center justify-center space-x-4 space-x-reverse">
                  <Clock className="h-6 w-6 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    سيتم مراجعة طلبك خلال 24-48 ساعة
                  </p>
                </div>
              </div>
              <p>
                سنقوم بإرسال إشعار إلى بريدك الإلكتروني عند الانتهاء من مراجعة
                طلبك. يمكنك متابعة حالة طلبك من خلال تسجيل الدخول إلى حسابك.
              </p>
              <div className="mt-6 p-4 border rounded-lg bg-blue-50 border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">رقم الطلب</h3>
                <p className="font-mono text-lg">
                  {Math.floor(Math.random() * 1000000)
                    .toString()
                    .padStart(6, "0")}
                </p>
                <p className="text-sm text-blue-600 mt-2">
                  يرجى الاحتفاظ برقم الطلب للمتابعة
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => navigate("/")}
                className="w-full"
                variant="default"
              >
                العودة إلى صفحة تسجيل الدخول
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/15 via-secondary/5 to-background p-4 sm:p-6"
      dir="rtl"
    >
      <div className="w-full max-w-xl space-y-6 sm:space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">بنك الأمان</h1>
          <p className="mt-2 text-muted-foreground">توثيق الهوية</p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">توثيق الهوية</CardTitle>
            <CardDescription className="text-center">
              يرجى تحميل صور وثيقة الهوية لإكمال عملية التسجيل
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
              <div className="space-y-2">
                <Label htmlFor="idType">نوع الوثيقة</Label>
                <Select value={idType} onValueChange={setIdType}>
                  <SelectTrigger id="idType">
                    <SelectValue placeholder="اختر نوع الوثيقة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="بطاقة التعريف">
                      بطاقة التعريف الوطنية
                    </SelectItem>
                    <SelectItem value="رخصة السياقة">رخصة السياقة</SelectItem>
                    <SelectItem value="جواز السفر">جواز السفر</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Front ID Upload */}
                <div className="space-y-2">
                  <Label htmlFor="frontId">الوجه الأمامي</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:bg-muted/50 transition-colors">
                    {frontIdPreview ? (
                      <div className="space-y-2">
                        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md">
                          <img
                            src={frontIdPreview}
                            alt="معاينة الوجه الأمامي"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            setFrontIdFile(null);
                            setFrontIdPreview("");
                          }}
                        >
                          تغيير الصورة
                        </Button>
                      </div>
                    ) : (
                      <label
                        htmlFor="frontId"
                        className="flex flex-col items-center justify-center gap-1 cursor-pointer py-4"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          انقر لتحميل الصورة
                        </span>
                        <span className="text-xs text-muted-foreground">
                          JPG, PNG أو PDF (بحد أقصى 5 ميجابايت)
                        </span>
                        <Input
                          id="frontId"
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, "front")}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Back ID Upload */}
                <div className="space-y-2">
                  <Label htmlFor="backId">الوجه الخلفي</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:bg-muted/50 transition-colors">
                    {backIdPreview ? (
                      <div className="space-y-2">
                        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md">
                          <img
                            src={backIdPreview}
                            alt="معاينة الوجه الخلفي"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            setBackIdFile(null);
                            setBackIdPreview("");
                          }}
                        >
                          تغيير الصورة
                        </Button>
                      </div>
                    ) : (
                      <label
                        htmlFor="backId"
                        className="flex flex-col items-center justify-center gap-1 cursor-pointer py-4"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          انقر لتحميل الصورة
                        </span>
                        <span className="text-xs text-muted-foreground">
                          JPG, PNG أو PDF (بحد أقصى 5 ميجابايت)
                        </span>
                        <Input
                          id="backId"
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, "back")}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-amber-50 border border-amber-100 p-4 text-amber-800">
                <div className="flex items-start space-x-2 space-x-reverse">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">ملاحظات هامة</h4>
                    <ul className="mt-1 text-sm list-disc list-inside space-y-1">
                      <li>تأكد من أن الصور واضحة وجميع المعلومات مقروءة</li>
                      <li>يجب أن تكون الوثيقة سارية المفعول</li>
                      <li>لن يتم مشاركة بياناتك مع أي طرف ثالث</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent ml-2"></div>
                    جاري إرسال البيانات...
                  </>
                ) : (
                  "مواصلة التسجيل"
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
