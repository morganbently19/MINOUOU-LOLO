import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { DollarSign, CreditCard, Wallet } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { transactionService } from "@/services/transactionService";

interface DepositFundsProps {
  accountId?: number;
  onSuccess?: () => void;
}

export default function DepositFunds({
  accountId,
  onSuccess,
}: DepositFundsProps) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("بطاقة ائتمان");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال مبلغ صحيح",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // إنشاء معاملة إيداع جديدة
      await transactionService.createTransaction({
        account_id: accountId,
        amount: parseFloat(amount),
        type: "إيداع",
        description: `إيداع عبر ${paymentMethod}`,
        status: "مكتملة",
      });

      toast({
        title: "تم بنجاح",
        description: `تم إيداع ${amount} د.ج في حسابك بنجاح`,
      });

      // إعادة تعيين النموذج
      setAmount("");
      setPaymentMethod("بطاقة ائتمان");
      setIsOpen(false);

      // استدعاء دالة النجاح إذا تم توفيرها
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error depositing funds:", error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء محاولة الإيداع. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <DollarSign className="h-4 w-4 ml-2" />
          إيداع رصيد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إيداع رصيد</DialogTitle>
          <DialogDescription>
            أدخل المبلغ الذي ترغب في إيداعه في حسابك
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right col-span-1">
              المبلغ
            </Label>
            <div className="col-span-3 relative">
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-16"
                placeholder="أدخل المبلغ"
              />
              <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-muted-foreground">
                دينار جزائري
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="payment-method" className="text-right col-span-1">
              طريقة الدفع
            </Label>
            <Select
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              defaultValue="بطاقة ائتمان"
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="اختر طريقة الدفع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="بطاقة ائتمان">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 ml-2" />
                    بطاقة ائتمان
                  </div>
                </SelectItem>
                <SelectItem value="محفظة إلكترونية">
                  <div className="flex items-center">
                    <Wallet className="h-4 w-4 ml-2" />
                    محفظة إلكترونية
                  </div>
                </SelectItem>
                <SelectItem value="تحويل بنكي">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 ml-2" />
                    تحويل بنكي
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleDeposit}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "جاري الإيداع..." : "إيداع الرصيد"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
