import { supabase } from "../lib/supabase";
import { accountService } from "./accountService";

export const transactionService = {
  // الحصول على جميع المعاملات
  getAllTransactions: async () => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // الحصول على معاملات حساب معين
  getTransactionsByAccountId: async (accountId: number) => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("account_id", accountId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // الحصول على معاملات عميل معين (جميع حساباته)
  getTransactionsByCustomerId: async (customerId: number) => {
    // أولاً نحصل على جميع حسابات العميل
    const accounts = await accountService.getAccountsByCustomerId(customerId);
    if (!accounts || accounts.length === 0) return [];

    const accountIds = accounts.map((account) => account.id);

    // ثم نحصل على المعاملات لجميع هذه الحسابات
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .in("account_id", accountIds)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // إنشاء معاملة جديدة
  createTransaction: async (transactionData: any) => {
    // بدء معاملة قاعدة البيانات
    const { data, error } = await supabase
      .from("transactions")
      .insert([transactionData])
      .select();

    if (error) throw error;

    // تحديث رصيد الحساب المصدر
    if (transactionData.type === "سحب" || transactionData.type === "تحويل") {
      await accountService.updateAccountBalance(
        transactionData.account_id,
        transactionData.amount,
        "subtract",
      );
    } else if (transactionData.type === "إيداع") {
      await accountService.updateAccountBalance(
        transactionData.account_id,
        transactionData.amount,
        "add",
      );
    }

    // إذا كانت معاملة تحويل، تحديث رصيد الحساب المستلم
    if (
      transactionData.type === "تحويل" &&
      transactionData.recipient_account_id
    ) {
      await accountService.updateAccountBalance(
        transactionData.recipient_account_id,
        transactionData.amount,
        "add",
      );
    }

    return data[0];
  },

  // تحديث حالة المعاملة
  updateTransactionStatus: async (id: number, status: string) => {
    const { data, error } = await supabase
      .from("transactions")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },
};
