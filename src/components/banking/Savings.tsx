import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PiggyBank, Plus, TrendingUp, Target, Calendar } from "lucide-react";

const savingsGoals = [
  {
    id: 1,
    title: "شراء سيارة",
    currentAmount: 30000,
    targetAmount: 80000,
    progress: 37.5,
    date: "ديسمبر 2023",
    monthlyContribution: 5000,
  },
  {
    id: 2,
    title: "رحلة سياحية",
    currentAmount: 15000,
    targetAmount: 20000,
    progress: 75,
    date: "أغسطس 2023",
    monthlyContribution: 2500,
  },
  {
    id: 3,
    title: "صندوق الطوارئ",
    currentAmount: 25000,
    targetAmount: 50000,
    progress: 50,
    date: "مارس 2024",
    monthlyContribution: 3000,
  },
];

const savingsAccounts = [
  {
    id: 1,
    title: "حساب التوفير الأساسي",
    balance: "40,000 د.ج",
    interestRate: "2.5%",
    lastInterest: "+83.33 د.ج",
    type: "توفير عادي",
  },
  {
    id: 2,
    title: "وديعة لأجل",
    balance: "100,000 د.ج",
    interestRate: "3.75%",
    lastInterest: "+312.50 د.ج",
    type: "وديعة لمدة سنة",
    maturityDate: "15 مايو 2024",
  },
];

export default function Savings() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">الادخار والاستثمار</h1>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          هدف ادخار جديد
        </Button>
      </div>

      <Tabs defaultValue="goals">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-2 sm:mb-0">
          <TabsTrigger value="goals">
            <Target className="ml-2 h-4 w-4" />
            أهداف الادخار
          </TabsTrigger>
          <TabsTrigger value="accounts">
            <PiggyBank className="ml-2 h-4 w-4" />
            حسابات الادخار
          </TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {savingsGoals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{goal.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Calendar className="h-4 w-4 ml-1" />
                    تاريخ الاستحقاق: {goal.date}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        التقدم
                      </span>
                      <span className="text-sm font-medium">
                        {goal.progress}%
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        المبلغ الحالي
                      </p>
                      <p className="font-bold">
                        {goal.currentAmount.toLocaleString()} د.ج
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        المبلغ المستهدف
                      </p>
                      <p className="font-medium">
                        {goal.targetAmount.toLocaleString()} د.ج
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      المساهمة الشهرية
                    </p>
                    <p className="font-medium">
                      {goal.monthlyContribution.toLocaleString()} د.ج
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    تعديل
                  </Button>
                  <Button size="sm">إضافة أموال</Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="flex flex-col items-center justify-center p-6 border-dashed border-2 border-muted">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">إنشاء هدف ادخار جديد</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                حدد هدفًا ماليًا وابدأ في الادخار له
              </p>
              <Button variant="outline">إضافة هدف جديد</Button>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {savingsAccounts.map((account) => (
              <Card key={account.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <PiggyBank className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{account.title}</CardTitle>
                        <CardDescription>{account.type}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        الرصيد الحالي
                      </p>
                      <p className="text-2xl font-bold">{account.balance}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        معدل الفائدة
                      </p>
                      <p className="font-medium flex items-center">
                        <TrendingUp className="h-4 w-4 ml-1 text-success" />
                        {account.interestRate}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        آخر فائدة مستلمة
                      </p>
                      <p className="font-medium text-success">
                        {account.lastInterest}
                      </p>
                    </div>
                    {account.maturityDate && (
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          تاريخ الاستحقاق
                        </p>
                        <p className="font-medium">{account.maturityDate}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">تفاصيل الحساب</Button>
                  <Button>إيداع أموال</Button>
                </CardFooter>
              </Card>
            ))}

            <Card className="flex flex-col items-center justify-center p-6 border-dashed border-2 border-muted">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">فتح حساب ادخار جديد</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                اختر من بين مجموعة متنوعة من حسابات الادخار والودائع
              </p>
              <Button variant="outline">استكشاف الخيارات</Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
