import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  CreditCard,
  Shield,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

// سيتم استبدال هذه البيانات بالبيانات الفعلية من قاعدة البيانات
const visaCards = [
  {
    id: 1,
    type: "فيزا بلاتينيوم",
    number: "**** **** **** ****",
    expiryDate: "05/2029",
    cvv: "123",
    cardHolder: "اسم العميل",
    balance: "0 د.ج",
    limit: "0 د.ج",
    status: "نشطة",
    color: "bg-gradient-to-r from-primary to-primary/60",
  },
];

// سيتم استبدال هذه البيانات بالبيانات الفعلية من قاعدة البيانات
const recentTransactions = [];

export default function VisaCard() {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [selectedCard, setSelectedCard] = useState(visaCards[0]);
  const [isActivated, setIsActivated] = useState(false);

  const activateCard = async () => {
    setIsActivated(true);
    // جلب بيانات العميل من قاعدة البيانات
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: customerData } = await supabase
          .from("customers")
          .select("first_name, last_name")
          .eq("user_id", user.id)
          .single();

        if (customerData) {
          const fullName = `${customerData.first_name} ${customerData.last_name}`;
          setSelectedCard({
            ...selectedCard,
            number: "4929 1234 5678 9012",
            expiryDate: "05/2029",
            cvv: "123",
            cardHolder: fullName,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
      // في حالة الخطأ، استخدم الاسم الافتراضي
      setSelectedCard({
        ...selectedCard,
        number: "4929 1234 5678 9012",
        expiryDate: "05/2029",
        cvv: "123",
        cardHolder: "اسم العميل",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">بطاقات فيزا</h1>

      <div className="grid grid-cols-1 gap-6">
        <div className="relative">
          <Card
            className={`overflow-hidden ${selectedCard.color} text-white border-0 shadow-lg`}
          >
            <div className="absolute top-4 right-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png"
                alt="Visa"
                className="h-10 w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <CardContent className="p-6">
              <div className="mt-10 mb-6">
                <p className="text-sm opacity-80 mb-1">رقم البطاقة</p>
                <p className="text-xl tracking-wider font-mono">
                  {showCardDetails
                    ? selectedCard.number
                    : selectedCard.number.replace(/\d(?=\d{4})/g, "*")}
                </p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm opacity-80 mb-1">صاحب البطاقة</p>
                  <p>{selectedCard.cardHolder}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80 mb-1">تاريخ الانتهاء</p>
                  <p>{showCardDetails ? selectedCard.expiryDate : "**/**"}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80 mb-1">CVV</p>
                  <p>{showCardDetails ? selectedCard.cvv : "***"}</p>
                </div>
              </div>

              <div className="absolute bottom-4 left-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                  onClick={() => setShowCardDetails(!showCardDetails)}
                >
                  {showCardDetails ? (
                    <>
                      <EyeOff className="h-4 w-4 ml-2" />
                      إخفاء
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 ml-2" />
                      عرض
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {visaCards.length > 1 && (
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full bg-background shadow-md"
                onClick={() => {
                  const currentIndex = visaCards.findIndex(
                    (card) => card.id === selectedCard.id,
                  );
                  const nextIndex = (currentIndex + 1) % visaCards.length;
                  setSelectedCard(visaCards[nextIndex]);
                }}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="mt-4 text-center">
            {!isActivated ? (
              <Button
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={activateCard}
              >
                <Lock className="h-4 w-4 ml-2" />
                تفعيل البطاقة
              </Button>
            ) : (
              <div className="p-2 bg-success/10 rounded-md border border-success">
                <p className="text-success text-sm flex items-center justify-center">
                  <Shield className="h-4 w-4 ml-2" />
                  تم تفعيل البطاقة بنجاح
                </p>
              </div>
            )}
          </div>
        </div>

        <Tabs defaultValue="transactions">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="transactions">
              <CreditCard className="ml-2 h-4 w-4" />
              المعاملات الأخيرة
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="ml-2 h-4 w-4" />
              الأمان والإعدادات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>المعاملات الأخيرة</CardTitle>
                <CardDescription>
                  آخر المعاملات التي تمت باستخدام البطاقة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.length > 0 ? (
                    recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h3 className="font-medium">
                            {transaction.merchant}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {transaction.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-destructive">
                            {transaction.amount}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.status}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center border rounded-lg bg-muted/20">
                      <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <h3 className="font-medium">لا توجد معاملات</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        لم يتم العثور على أي معاملات لهذه البطاقة
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  عرض جميع المعاملات
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الأمان</CardTitle>
                <CardDescription>
                  تحكم في إعدادات الأمان الخاصة ببطاقتك
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full ml-4">
                        <Lock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">تجميد البطاقة مؤقتاً</h3>
                        <p className="text-sm text-muted-foreground">
                          إيقاف البطاقة مؤقتاً عن الاستخدام
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">تجميد</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full ml-4">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">تغيير الرقم السري</h3>
                        <p className="text-sm text-muted-foreground">
                          تحديث الرقم السري للبطاقة
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">تغيير</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full ml-4">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">حدود الاستخدام</h3>
                        <p className="text-sm text-muted-foreground">
                          تعديل حدود السحب والشراء
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">تعديل</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
