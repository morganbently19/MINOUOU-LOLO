import { supabase } from "../lib/supabase";

export const currencyService = {
  // الحصول على جميع أسعار العملات
  getAllCurrencyRates: async () => {
    const { data, error } = await supabase
      .from("currency_rates")
      .select("*")
      .order("id");

    if (error) throw error;
    return data;
  },

  // الحصول على سعر عملة معينة
  getCurrencyRateByCode: async (code: string) => {
    const { data, error } = await supabase
      .from("currency_rates")
      .select("*")
      .eq("code", code)
      .single();

    if (error) return null;
    return data;
  },

  // تحديث أسعار العملات
  updateCurrencyRate: async (id: number, rateData: any) => {
    const { data, error } = await supabase
      .from("currency_rates")
      .update(rateData)
      .eq("id", id)
      .select();

    if (error) throw error;
    return data[0];
  },

  // تحويل العملات
  convertCurrency: async (
    amount: number,
    fromCurrency: string,
    toCurrency: string,
  ) => {
    // الحصول على أسعار العملات
    const { data: rates, error } = await supabase
      .from("currency_rates")
      .select("*");

    if (error) throw error;

    // البحث عن العملات المطلوبة
    const fromRate = rates.find((rate) => rate.code === fromCurrency);
    const toRate = rates.find((rate) => rate.code === toCurrency);

    if (!fromRate || !toRate) {
      throw new Error("العملة غير موجودة");
    }

    // إذا كانت العملة الأساسية
    if (fromCurrency === "DZD") {
      return amount / toRate.base_rate;
    } else if (toCurrency === "DZD") {
      return amount * fromRate.base_rate;
    } else {
      // التحويل من خلال العملة الأساسية
      const amountInDZD = amount * fromRate.base_rate;
      return amountInDZD / toRate.base_rate;
    }
  },

  // إضافة عملة جديدة
  addCurrency: async (currencyData: any) => {
    const { data, error } = await supabase
      .from("currency_rates")
      .insert([currencyData])
      .select();

    if (error) throw error;
    return data[0];
  },
};
