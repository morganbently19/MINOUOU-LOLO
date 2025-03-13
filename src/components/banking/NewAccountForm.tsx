import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Checkbox } from "../ui/checkbox";
import { CreditCard, DollarSign, Euro, PiggyBank, Shield } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "../ui/use-toast";

interface NewAccountFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  customerId?: number;
}

export default function NewAccountForm({
  open,
  onOpenChange,
  onSuccess,
  customerId = 1, // Default customer ID for testing
}: NewAccountFormProps) {
  const [accountType, setAccountType] = useState("جاري");
  const [currency, setCurrency] = useState("دينار جزائري");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { toast } = useToast();

  // Generate a random account number
  const generateAccountNumber = () => {
    const randomPart = () => Math.floor(1000 + Math.random() * 9000);
    return `DZ59 ${randomPart()} ${randomPart()} ${randomPart()} ${randomPart()}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      toast({
        title: "خطأ",
        description: "يرجى الموافقة على الشروط والأحكام",
        variant: "destructive",
      });
      return;
    }

    if (
      !initialDeposit ||
      isNaN(Number(initialDeposit)) ||
      Number(initialDeposit) <= 0
    ) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال مبلغ صحيح للإيداع الأولي",
        variant: "destructive",
      });
      return;
    }

    // التحقق من الحد الأدنى للإيداع حسب نوع الحساب
    const minDeposit =
      accountType === "جاري"
        ? 1000
        : accountType === "توفير"
          ? 5000
          : accountType === "استثمار"
            ? 10000
            : 0;

    if (Number(initialDeposit) < minDeposit) {
      toast({
        title: "خطأ",
        description: `الحد الأدنى للإيداع في حساب ${accountType} هو ${minDeposit} ${currency === "دينار جزائري" ? "د.ج" : currency === "دولار أمريكي" ? "$" : "€"}`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create account in Supabase
      const accountNumber = generateAccountNumber();

      // تحقق من وجود اتصال بقاعدة البيانات
      if (!supabase) {
        throw new Error("لا يمكن الاتصال بقاعدة البيانات");
      }

      console.log("Creating account with data:", {
        customer_id: customerId,
        account_number: accountNumber,
        type: accountType,
        currency: currency,
        balance: Number(initialDeposit),
        status: "نشط",
      });

      const { data, error } = await supabase
        .from("accounts")
        .insert([
          {
            customer_id: customerId,
            account_number: accountNumber,
            type: accountType,
            currency: currency,
            balance: Number(initialDeposit),
            status: "نشط",
          },
        ])
        .select();

      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }

      if (!data || data.length === 0) {
        throw new Error("لم يتم إنشاء الحساب بشكل صحيح");
      }

      console.log("Account created successfully:", data);

      // Create initial deposit transaction
      const { error: transactionError } = await supabase
        .from("transactions")
        .insert([
          {
            account_id: data[0].id,
            type: "إيداع",
            amount: Number(initialDeposit),
            description: "إيداع أولي عند فتح الحساب",
            status: "مكتملة",
          },
        ]);

      if (transactionError) {
        console.error("Transaction error:", transactionError);
        throw transactionError;
      }

      toast({
        title: "تم بنجاح",
        description: `تم فتح حساب ${accountType} جديد بعملة ${currency}`,
      });

      // Reset form
      setAccountType("جاري");
      setCurrency("دينار جزائري");
      setInitialDeposit("");
      setAcceptTerms(false);

      // Close dialog and call success callback
      onOpenChange(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error creating account:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء فتح الحساب. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle>فتح حساب جديد</DialogTitle>
          <DialogDescription>
            أدخل المعلومات المطلوبة لفتح حساب جديد في بنك الأمان
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="account-type">نوع الحساب</Label>
            <Select value={accountType} onValueChange={setAccountType}>
              <SelectTrigger id="account-type">
                <SelectValue placeholder="اختر نوع الحساب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="جاري">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>حساب جاري</span>
                  </div>
                </SelectItem>
                <SelectItem value="توفير">
                  <div className="flex items-center gap-2">
                    <PiggyBank className="h-4 w-4" />
                    <span>حساب توفير</span>
                  </div>
                </SelectItem>
                <SelectItem value="استثمار">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>حساب استثمار</span>
                  </div>
                </SelectItem>
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
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>دينار جزائري (د.ج)</span>
                  </div>
                </SelectItem>
                <SelectItem value="دولار أمريكي">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <span>دولار أمريكي ($)</span>
                  </div>
                </SelectItem>
                <SelectItem value="يورو">
                  <div className="flex items-center gap-2">
                    <Euro className="h-4 w-4" />
                    <span>يورو (€)</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="initial-deposit">الإيداع الأولي</Label>
            <div className="relative">
              <Input
                id="initial-deposit"
                type="number"
                placeholder="أدخل مبلغ الإيداع الأولي"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(e.target.value)}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              الحد الأدنى للإيداع: 1,000 د.ج للحساب الجاري، 5,000 د.ج لحساب
              التوفير، 10,000 د.ج لحساب الاستثمار
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">الغرض من فتح الحساب</Label>
            <Select defaultValue="شخصي">
              <SelectTrigger id="purpose">
                <SelectValue placeholder="اختر الغرض" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="شخصي">استخدام شخصي</SelectItem>
                <SelectItem value="تجاري">نشاط تجاري</SelectItem>
                <SelectItem value="ادخار">ادخار</SelectItem>
                <SelectItem value="استثمار">استثمار</SelectItem>
                <SelectItem value="أخرى">أخرى</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2 space-x-reverse">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
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

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent ml-2"></div>
                  جاري فتح الحساب...
                </>
              ) : (
                "فتح الحساب"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
