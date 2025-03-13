import { supabase } from "../lib/supabase";

export const savingsService = {
  // الحصول على جميع أهداف الادخار لعميل معين
  getSavingsGoalsByCustomerId: async (customerId: number) => {
    const { data, error } = await supabase
      .from("savings_goals")
      .select("*")
      .eq("customer_id", customerId)
      .order("id");

    if (error) throw error;
    return data;
  },

  // الحصول على هدف ادخار معين
  getSavingsGoalById: async (id: number) => {
    const { data, error } = await supabase
      .from("savings_goals")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return null;
    return data;
  },

  // إنشاء هدف ادخار جديد
  createSavingsGoal: async (goalData: any) => {
    const { data, error } = await supabase
      .from("savings_goals")
      .insert([goalData])
      .select();

    if (error) throw error;
    return data[0];
  },

  // تحديث هدف ادخار
  updateSavingsGoal: async (id: number, goalData: any) => {
    const { data, error } = await supabase
      .from("savings_goals")
      .update(goalData)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  // تحديث المبلغ الحالي لهدف ادخار
  updateSavingsGoalAmount: async (
    id: number,
    amount: number,
    operation: "add" | "subtract" | "set",
  ) => {
    // أولاً، نحصل على الهدف الحالي
    const { data: goal, error: fetchError } = await supabase
      .from("savings_goals")
      .select("current_amount")
      .eq("id", id)
      .single();

    if (fetchError) throw fetchError;

    let newAmount = goal.current_amount;
    if (operation === "add") {
      newAmount += amount;
    } else if (operation === "subtract") {
      if (goal.current_amount >= amount) {
        newAmount -= amount;
      } else {
        throw new Error("مبلغ غير كافي");
      }
    } else if (operation === "set") {
      newAmount = amount;
    }

    // تحديث المبلغ
    const { data, error } = await supabase
      .from("savings_goals")
      .update({ current_amount: newAmount })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  // حذف هدف ادخار
  deleteSavingsGoal: async (id: number) => {
    const { error } = await supabase
      .from("savings_goals")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  },
};
