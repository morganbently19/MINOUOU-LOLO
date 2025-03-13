// هذا ملف محاكاة لقاعدة البيانات
// في التطبيق الحقيقي، سيتم استبدال هذا بقاعدة بيانات حقيقية مثل Supabase

// بيانات العملاء
export const customers = [
  {
    id: 1,
    name: "أحمد محمد",
    accountNumber: "**** 4832",
    balance: 85000,
    status: "نشط",
    email: "ahmed@example.com",
    phone: "0555123456",
    address: "الجزائر العاصمة",
    idNumber: "29384756",
    dob: "1990-01-01",
    securityLevel: "medium",
    transactionLimit: 50000,
    twoFactorEnabled: false,
  },
  {
    id: 2,
    name: "سارة خالد",
    accountNumber: "**** 7621",
    balance: 120000,
    status: "نشط",
    email: "sara@example.com",
    phone: "0555789012",
    address: "وهران",
    idNumber: "38475612",
    dob: "1988-05-15",
    securityLevel: "high",
    transactionLimit: 100000,
    twoFactorEnabled: true,
  },
  {
    id: 3,
    name: "محمد علي",
    accountNumber: "**** 9354",
    balance: 45000,
    status: "مجمد",
    email: "mohamed@example.com",
    phone: "0555345678",
    address: "قسنطينة",
    idNumber: "47561238",
    dob: "1995-11-20",
    securityLevel: "low",
    transactionLimit: 25000,
    twoFactorEnabled: false,
  },
  {
    id: 4,
    name: "فاطمة أحمد",
    accountNumber: "**** 2145",
    balance: 210000,
    status: "نشط",
    email: "fatima@example.com",
    phone: "0555901234",
    address: "عنابة",
    idNumber: "56123847",
    dob: "1992-08-10",
    securityLevel: "medium",
    transactionLimit: 75000,
    twoFactorEnabled: true,
  },
  {
    id: 5,
    name: "خالد عبدالله",
    accountNumber: "**** 6587",
    balance: 65000,
    status: "نشط",
    email: "khaled@example.com",
    phone: "0555567890",
    address: "سطيف",
    idNumber: "61238475",
    dob: "1985-03-25",
    securityLevel: "medium",
    transactionLimit: 50000,
    twoFactorEnabled: false,
  },
];

// بيانات المعاملات
export const transactions = [
  {
    id: "TX-5421",
    customerId: 1,
    type: "إيداع",
    amount: 15000,
    date: "2023-06-20T09:45:00",
    status: "مكتملة",
    description: "إيداع نقدي",
  },
  {
    id: "TX-5420",
    customerId: 2,
    type: "سحب",
    amount: -5000,
    date: "2023-06-20T09:30:00",
    status: "مكتملة",
    description: "سحب من الصراف الآلي",
  },
  {
    id: "TX-5419",
    customerId: 3,
    type: "تحويل",
    amount: -12000,
    date: "2023-06-20T09:15:00",
    status: "مكتملة",
    description: "تحويل إلى حساب آخر",
  },
  {
    id: "TX-5418",
    customerId: 4,
    type: "إيداع",
    amount: 50000,
    date: "2023-06-20T09:00:00",
    status: "مكتملة",
    description: "إيداع شيك",
  },
  {
    id: "TX-5417",
    customerId: 5,
    type: "سحب",
    amount: -8000,
    date: "2023-06-20T08:45:00",
    status: "مكتملة",
    description: "سحب من الفرع",
  },
];

// وظائف محاكاة لعمليات قاعدة البيانات
export const db = {
  // وظائف العملاء
  getCustomers: () => {
    return [...customers];
  },
  getCustomerById: (id: number) => {
    return customers.find((customer) => customer.id === id) || null;
  },
  updateCustomer: (id: number, data: Partial<(typeof customers)[0]>) => {
    const index = customers.findIndex((customer) => customer.id === id);
    if (index !== -1) {
      customers[index] = { ...customers[index], ...data };
      return customers[index];
    }
    return null;
  },
  updateCustomerBalance: (
    id: number,
    amount: number,
    operation: "set" | "add" | "subtract",
  ) => {
    const index = customers.findIndex((customer) => customer.id === id);
    if (index !== -1) {
      if (operation === "set") {
        customers[index].balance = amount;
      } else if (operation === "add") {
        customers[index].balance += amount;
      } else if (operation === "subtract") {
        customers[index].balance -= amount;
      }
      return customers[index];
    }
    return null;
  },
  updateCustomerStatus: (id: number, status: string) => {
    const index = customers.findIndex((customer) => customer.id === id);
    if (index !== -1) {
      customers[index].status = status;
      return customers[index];
    }
    return null;
  },
  addCustomer: (data: Omit<(typeof customers)[0], "id">) => {
    const newId = Math.max(...customers.map((c) => c.id)) + 1;
    const newCustomer = { id: newId, ...data };
    customers.push(newCustomer);
    return newCustomer;
  },
  deleteCustomer: (id: number) => {
    const index = customers.findIndex((customer) => customer.id === id);
    if (index !== -1) {
      const deletedCustomer = customers[index];
      customers.splice(index, 1);
      return deletedCustomer;
    }
    return null;
  },

  // وظائف المعاملات
  getTransactions: () => {
    return [...transactions];
  },
  getTransactionsByCustomerId: (customerId: number) => {
    return transactions.filter((tx) => tx.customerId === customerId);
  },
  addTransaction: (data: Omit<(typeof transactions)[0], "id">) => {
    const newId = `TX-${Math.floor(Math.random() * 10000)}`;
    const newTransaction = { id: newId, ...data };
    transactions.push(newTransaction);
    return newTransaction;
  },
};
