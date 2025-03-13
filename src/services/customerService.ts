import { supabase } from "../lib/supabase";

export const customerService = {
  // الحصول على جميع العملاء
  getAllCustomers: async () => {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("id");

    if (error) throw error;
    return data;
  },

  // الحصول على عميل بواسطة اسم المستخدم وكلمة المرور
  authenticateCustomer: async (username: string, password: string) => {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single();

    if (error) return null;
    return data;
  },

  // الحصول على عميل بواسطة المعرف
  getCustomerById: async (id: number) => {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  },

  // إنشاء عميل جديد
  createCustomer: async (customerData: any) => {
    const { data, error } = await supabase
      .from("customers")
      .insert([customerData])
      .select();

    if (error) throw error;
    return data[0];
  },

  // تحديث بيانات العميل
  updateCustomer: async (id: number, customerData: any) => {
    const { data, error } = await supabase
      .from("customers")
      .update(customerData)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  // تحديث حالة العميل
  updateCustomerStatus: async (id: number, status: string) => {
    const { data, error } = await supabase
      .from("customers")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  // حذف عميل
  deleteCustomer: async (id: number) => {
    const { error } = await supabase.from("customers").delete().eq("id", id);

    if (error) throw error;
    return true;
  },
};
