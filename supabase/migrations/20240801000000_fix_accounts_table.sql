-- تعديل جدول الحسابات لإصلاح المشكلة
ALTER TABLE accounts ALTER COLUMN balance SET DEFAULT 0;
ALTER TABLE accounts ALTER COLUMN status SET DEFAULT 'نشط';

-- إضافة قيود للتأكد من صحة البيانات
ALTER TABLE accounts ADD CONSTRAINT valid_account_type CHECK (type IN ('جاري', 'توفير', 'استثمار'));
ALTER TABLE accounts ADD CONSTRAINT valid_currency CHECK (currency IN ('دينار جزائري', 'دولار أمريكي', 'يورو'));

-- تفعيل النشر في الوقت الحقيقي للمعاملات فقط (الحسابات مضافة بالفعل)
alter publication supabase_realtime add table transactions;
