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
} from "lucide-react";
import { useState } from "react";

const visaCards = [
  {
    id: 1,
    type: "فيزا بلاتينيوم",
    number: "4539 7612 3456 7890",
    expiryDate: "09/26",
    cvv: "123",
    cardHolder: "أحمد محمد",
    balance: "15,000 د.ج",
    limit: "50,000 د.ج",
    status: "نشطة",
    color: "bg-gradient-to-r from-primary to-primary/60",
  },
  {
    id: 2,
    type: "فيزا كلاسيك",
    number: "4024 0071 5678 9012",
    expiryDate: "03/25",
    cvv: "456",
    cardHolder: "أحمد محمد",
    balance: "5,200 د.ج",
    limit: "20,000 د.ج",
    status: "نشطة",
    color: "bg-gradient-to-r from-secondary to-secondary/70",
  },
];

const recentTransactions = [
  {
    id: 1,
    merchant: "أمازون",
    date: "15 يونيو 2023",
    amount: "-1,250 د.ج",
    status: "مكتملة",
  },
  {
    id: 2,
    merchant: "كارفور",
    date: "12 يونيو 2023",
    amount: "-450 د.ج",
    status: "مكتملة",
  },
  {
    id: 3,
    merchant: "نون",
    date: "10 يونيو 2023",
    amount: "-780 د.ج",
    status: "مكتملة",
  },
];

export default function VisaCard() {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [selectedCard, setSelectedCard] = useState(visaCards[0]);

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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                الرصيد المتاح
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedCard.balance}</div>
              <p className="text-xs text-muted-foreground">
                من أصل {selectedCard.limit}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                حالة البطاقة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-success ml-2"></div>
                <span>{selectedCard.status}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">نوع البطاقة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 ml-2 text-primary" />
                <span>{selectedCard.type}</span>
              </div>
            </CardContent>
          </Card>
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
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium">{transaction.merchant}</h3>
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
                  ))}
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
