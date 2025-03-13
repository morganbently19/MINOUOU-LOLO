import { supabase } from "../lib/supabase";

export const accountService = {
  // الحصول على جميع الحسابات
  getAllAccounts: async () => {
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .order("id");

    if (error) throw error;
    return data;
  },

  // الحصول على حسابات عميل معين
  getAccountsByCustomerId: async (customerId: number) => {
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("customer_id", customerId)
      .order("id");

    if (error) throw error;
    return data;
  },

  // الحصول على حساب بواسطة المعرف
  getAccountById: async (id: number) => {
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  },

  // إنشاء حساب جديد
  createAccount: async (accountData: any) => {
    const { data, error } = await supabase
      .from("accounts")
      .insert([accountData])
      .select();

    if (error) throw error;
    return data[0];
  },

  // تحديث بيانات الحساب
  updateAccount: async (id: number, accountData: any) => {
    const { data, error } = await supabase
      .from("accounts")
      .update(accountData)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  // تحديث رصيد الحساب
  updateAccountBalance: async (
    id: number,
    amount: number,
    operation: "add" | "subtract" | "set",
  ) => {
    // أولاً، نحصل على الحساب الحالي
    const { data: account, error: fetchError } = await supabase
      .from("accounts")
      .select("balance")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    let newBalance = account.balance;
    if (operation === "add") {
      newBalance += amount;
    } else if (operation === "subtract") {
      if (account.balance >= amount) {
        newBalance -= amount;
      } else {
        throw new Error("رصيد غير كافي");
      }
    } else if (operation === "set") {
      newBalance = amount;
    }

    // تحديث الرصيد
    const { data, error } = await supabase
      .from("accounts")
      .update({ balance: newBalance })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  // تحديث حالة الحساب
  updateAccountStatus: async (id: number, status: string) => {
    const { data, error } = await supabase
      .from("accounts")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  // حذف حساب
  deleteAccount: async (id: number) => {
    const { error } = await supabase.from("accounts").delete().eq("id", id);

    if (error) throw error;
    return true;
  },

  // إنشاء رقم حساب فريد
  generateAccountNumber: async () => {
    // إنشاء رقم حساب عشوائي بتنسيق "DZ59 XXXX XXXX XXXX XXXX"
    const randomPart = () => Math.floor(1000 + Math.random() * 9000);
    const accountNumber = `DZ59 ${randomPart()} ${randomPart()} ${randomPart()} ${randomPart()}`;

    // التحقق من عدم وجود حساب بنفس الرقم
    const { data } = await supabase
      .from("accounts")
      .select("id")
      .eq("account_number", accountNumber);

    if (data && data.length > 0) {
      // إذا وجد حساب بنفس الرقم، نعيد المحاولة
      return accountService.generateAccountNumber();
    }

    return accountNumber;
  },
};
