import { useState } from "react";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { supabase } from "@/lib/supabase";

export function DebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("غير معروف");
  const [debugInfo, setDebugInfo] = useState<Record<string, any>>({});

  const checkConnection = async () => {
    try {
      const { data, error } = await supabase
        .from("accounts")
        .select("count")
        .limit(1);
      if (error) {
        setConnectionStatus("فشل الاتصال");
        setDebugInfo({
          error: error.message,
          details: error,
          supabaseUrl: import.meta.env.VITE_SUPABASE_URL || "غير محدد",
          supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY
            ? "موجود"
            : "غير موجود",
        });
      } else {
        setConnectionStatus("متصل");
        setDebugInfo({
          status: "متصل بنجاح",
          data,
          supabaseUrl: import.meta.env.VITE_SUPABASE_URL || "غير محدد",
          supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY
            ? "موجود"
            : "غير موجود",
        });
      }
    } catch (err) {
      setConnectionStatus("خطأ");
      setDebugInfo({
        error: err.message,
        details: err,
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL || "غير محدد",
        supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY
          ? "موجود"
          : "غير موجود",
      });
    }
  };

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-4 left-4 z-50 opacity-70 hover:opacity-100"
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        فحص الاتصال
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 left-4 z-50 w-80 opacity-90 hover:opacity-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex justify-between items-center">
          <span>حالة الاتصال بقاعدة البيانات</span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={() => setIsOpen(false)}
          >
            ×
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span>الحالة:</span>
          <span
            className={`font-medium ${connectionStatus === "متصل" ? "text-success" : "text-destructive"}`}
          >
            {connectionStatus}
          </span>
        </div>

        {Object.entries(debugInfo).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span>{key}:</span>
            <span className="font-mono">
              {typeof value === "object"
                ? JSON.stringify(value).substring(0, 20) + "..."
                : String(value)}
            </span>
          </div>
        ))}

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-2"
          onClick={checkConnection}
        >
          فحص الاتصال
        </Button>
      </CardContent>
    </Card>
  );
}
