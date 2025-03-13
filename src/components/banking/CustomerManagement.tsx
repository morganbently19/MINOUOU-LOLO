import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Users,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  UserPlus,
  Trash2,
  CheckCircle,
  XCircle,
  Shield,
  AlertCircle,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { db } from "@/lib/db";
import { customerService } from "@/lib/customers";
import CustomerDetails from "./CustomerDetails";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Label } from "../ui/label";

export default function CustomerManagement() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isCustomerDetailsOpen, setIsCustomerDetailsOpen] = useState(false);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // استرجاع البيانات من قاعدة البيانات
    setIsLoading(true);
    setTimeout(() => {
      // تعيين قائمة فارغة للعملاء
      setCustomers([]);
      setIsLoading(false);
    }, 1000);
  }, []);

  // تطبيق الفلترة على العملاء
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.includes(searchTerm) ||
      customer.email.includes(searchTerm) ||
      customer.phone.includes(searchTerm) ||
      customer.accountNumber.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleDeleteCustomer = () => {
    // محاكاة حذف العميل من قاعدة البيانات
    setIsLoading(true);
    setIsDeleteDialogOpen(false);

    setTimeout(() => {
      // حذف العميل من القائمة المحلية
      const updatedCustomers = customers.filter(
        (c) => c.id !== customerToDelete.id,
      );
      setCustomers(updatedCustomers);
      setCustomerToDelete(null);
      setIsLoading(false);

      // إظهار رسالة نجاح
      alert(`تم حذف العميل ${customerToDelete.name} بنجاح`);
    }, 800);
  };

  const handleToggleStatus = (customer) => {
    // محاكاة تغيير حالة العميل في قاعدة البيانات
    setIsLoading(true);
    const newStatus = customer.status === "نشط" ? "مجمد" : "نشط";

    setTimeout(() => {
      // تحديث حالة العميل في القائمة المحلية
      const updatedCustomers = customers.map((c) => {
        if (c.id === customer.id) {
          return { ...c, status: newStatus };
        }
        return c;
      });

      setCustomers(updatedCustomers);
      setIsLoading(false);

      // إظهار رسالة نجاح
      alert(`تم تغيير حالة العميل ${customer.name} إلى ${newStatus} بنجاح`);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">إدارة العملاء</h1>
            <p className="text-sm text-muted-foreground">
              عرض وإدارة حسابات العملاء
            </p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>قائمة العملاء</CardTitle>
          <CardDescription>عرض وإدارة جميع عملاء البنك</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث عن عميل..."
                  className="pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="حالة الحساب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="مجمد">مجمد</SelectItem>
                  <SelectItem value="مغلق">مغلق</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => alert("تم تطبيق الفلتر بنجاح")}
              >
                <Filter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => alert("جاري تنزيل قائمة العملاء")}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button onClick={() => setIsAddCustomerOpen(true)}>
                <UserPlus className="h-4 w-4 ml-2" />
                إضافة عميل
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
                <p className="text-sm text-muted-foreground">
                  جاري تحميل البيانات...
                </p>
              </div>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="text-center p-8 border rounded-md">
              <AlertCircle className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-medium">لا توجد نتائج</h3>
              <p className="text-sm text-muted-foreground mb-4">
                لم يتم العثور على أي عملاء مطابقين لمعايير البحث
              </p>
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden bg-white">
              <div className="hidden md:grid grid-cols-6 bg-muted/50 p-4 font-medium">
                <div>اسم العميل</div>
                <div>رقم الحساب</div>
                <div>البريد الإلكتروني</div>
                <div>الرصيد</div>
                <div>الحالة</div>
                <div className="text-left">الإجراءات</div>
              </div>

              <div className="divide-y">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex flex-col md:grid md:grid-cols-6 p-4 items-start md:items-center border-b md:border-b-0 hover:bg-muted/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{customer.name}</div>
                    </div>
                    <div className="text-muted-foreground text-sm mt-1 md:mt-0">
                      {customer.accountNumber}
                    </div>
                    <div className="text-muted-foreground text-sm mt-1 md:mt-0">
                      {customer.email}
                    </div>
                    <div className="font-medium mt-1 md:mt-0">
                      {customer.balance}
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <Badge
                        variant={
                          customer.status === "نشط"
                            ? "success"
                            : customer.status === "مجمد"
                              ? "destructive"
                              : "outline"
                        }
                        className="rounded-full"
                      >
                        {customer.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2 mt-3 md:mt-0 md:justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setIsCustomerDetailsOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setIsCustomerDetailsOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={
                          customer.status === "نشط" ? "destructive" : "success"
                        }
                        size="sm"
                        onClick={() => handleToggleStatus(customer)}
                      >
                        {customer.status === "نشط" ? "تجميد" : "تنشيط"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                          setCustomerToDelete(customer);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              عرض {filteredCustomers.length} من {customers.length} عميل
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button variant="outline" size="sm" disabled>
                السابق
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => alert("الانتقال إلى الصفحة التالية")}
              >
                التالي
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* نافذة إضافة عميل جديد */}
      <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>إضافة عميل جديد</DialogTitle>
            <DialogDescription>
              أدخل بيانات العميل الجديد لإنشاء حساب له
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">اسم العميل</Label>
              <Input id="name" placeholder="أدخل اسم العميل" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input id="phone" placeholder="05XXXXXXXX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Input id="address" placeholder="أدخل العنوان" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="id-number">رقم الهوية</Label>
              <Input id="id-number" placeholder="أدخل رقم الهوية" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="initial-balance">الرصيد الأولي</Label>
              <Input id="initial-balance" type="number" placeholder="0" />
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setIsAddCustomerOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              onClick={() => {
                setIsLoading(true);
                setIsAddCustomerOpen(false);

                // محاكاة إضافة عميل جديد
                setTimeout(() => {
                  const newCustomer = {
                    id: Math.max(...customers.map((c) => c.id)) + 1,
                    name: document.getElementById("name").value || "عميل جديد",
                    accountNumber: `**** ${Math.floor(1000 + Math.random() * 9000)}`,
                    balance: "0 د.ج",
                    status: "نشط",
                    email:
                      document.getElementById("email").value ||
                      "new@example.com",
                    phone:
                      document.getElementById("phone").value || "05XXXXXXXX",
                  };

                  setCustomers([...customers, newCustomer]);
                  setIsLoading(false);
                  alert("تم إنشاء حساب العميل بنجاح");
                }, 1000);
              }}
            >
              إنشاء الحساب
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نافذة تأكيد الحذف */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>تأكيد حذف العميل</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف حساب العميل {customerToDelete?.name}؟
              هذا الإجراء لا يمكن التراجع عنه.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-4 bg-destructive/10 rounded-md">
            <Shield className="h-10 w-10 text-destructive" />
          </div>
          <DialogFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button variant="destructive" onClick={handleDeleteCustomer}>
              تأكيد الحذف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* تفاصيل العميل */}
      <CustomerDetails
        open={isCustomerDetailsOpen}
        onOpenChange={setIsCustomerDetailsOpen}
        customer={selectedCustomer}
      />
    </div>
  );
}
