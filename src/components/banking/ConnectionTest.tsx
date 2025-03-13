import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { supabase } from "@/lib/supabase";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

export default function ConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState<any>(null);

  const testConnection = async () => {
    setConnectionStatus("loading");
    setErrorMessage("");
    setData(null);

    try {
      // Try to fetch a simple query from Supabase
      const { data, error } = await supabase
        .from("customers")
        .select("count")
        .limit(1);

      if (error) {
        console.error("Supabase connection error:", error);
        setConnectionStatus("error");
        setErrorMessage(error.message);
        return;
      }

      // If we get here, connection was successful
      setConnectionStatus("success");
      setData(data);
      console.log("Connection successful, data:", data);
    } catch (err) {
      console.error("Unexpected error:", err);
      setConnectionStatus("error");
      setErrorMessage(err.message || "حدث خطأ غير متوقع");
    }
  };

  // Test connection on component mount
  useEffect(() => {
    testConnection();
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>اختبار الاتصال بقاعدة البيانات</span>
          {connectionStatus === "success" && (
            <CheckCircle className="h-5 w-5 text-success" />
          )}
          {connectionStatus === "error" && (
            <AlertCircle className="h-5 w-5 text-destructive" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {connectionStatus === "loading" && (
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          </div>
        )}

        {connectionStatus === "success" && (
          <Alert className="bg-success/10 text-success border-success/20">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              تم الاتصال بقاعدة البيانات بنجاح!
            </AlertDescription>
          </Alert>
        )}

        {connectionStatus === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              فشل الاتصال بقاعدة البيانات: {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        <div className="pt-2">
          <Button
            onClick={testConnection}
            className="w-full"
            disabled={connectionStatus === "loading"}
          >
            {connectionStatus === "loading" ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent ml-2"></div>
                جاري الاختبار...
              </>
            ) : (
              "إعادة اختبار الاتصال"
            )}
          </Button>
        </div>

        {data && (
          <div className="mt-4 p-3 bg-muted rounded-md">
            <p className="text-sm font-medium">بيانات الاستجابة:</p>
            <pre className="text-xs overflow-auto mt-1">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-4 text-sm text-muted-foreground">
          <p>معلومات الاتصال:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>URL: {import.meta.env.VITE_SUPABASE_URL || "غير محدد"}</li>
            <li>
              API Key:{" "}
              {import.meta.env.VITE_SUPABASE_ANON_KEY ? "موجود" : "غير موجود"}
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
