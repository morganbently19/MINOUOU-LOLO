import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { CheckCircle2, Clock } from "lucide-react";

export default function VerificationSuccess() {
  const navigate = useNavigate();
  const requestId = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/15 via-secondary/5 to-background p-4 sm:p-6"
      dir="rtl"
    >
      <div className="w-full max-w-xl space-y-6 sm:space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">بنك الأمان</h1>
          <p className="mt-2 text-muted-foreground">حالة الطلب</p>
        </div>

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
              <p className="font-mono text-lg">{requestId}</p>
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
