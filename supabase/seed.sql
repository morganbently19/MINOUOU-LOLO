-- إضافة بيانات تجريبية للعملاء
INSERT INTO customers (name, email, phone, address, id_number, dob, username, password) VALUES
('أحمد كريم', 'ahmed.karim@example.com', '0555123456', 'الجزائر العاصمة', '29384756', '1990-05-15', 'ahmed.karim', 'Ahmed123'),
('فاطمة أحمد', 'fatima.ahmed@example.com', '0555234567', 'وهران', '38475612', '1988-10-20', 'fatima.ahmed', 'Fatima123'),
('محمد علي', 'mohamed.ali@example.com', '0555345678', 'قسنطينة', '47561238', '1992-03-25', 'mohamed.ali', 'Mohamed123');

-- إضافة حسابات للعملاء
INSERT INTO accounts (customer_id, account_number, type, currency) VALUES
(1, 'DZ59 1234 5678 9012 3456', 'جاري', 'دينار جزائري'),
(2, 'DZ59 2345 6789 0123 4567', 'جاري', 'دينار جزائري'),
(3, 'DZ59 3456 7890 1234 5678', 'جاري', 'دينار جزائري'),
(1, 'DZ59 4567 8901 2345 6789', 'توفير', 'دينار جزائري'),
(2, 'DZ59 5678 9012 3456 7890', 'استثمار', 'دينار جزائري');

-- إضافة معاملات تجريبية
INSERT INTO transactions (account_id, type, amount, description) VALUES
(1, 'إيداع', 10000, 'إيداع أولي'),
(2, 'إيداع', 15000, 'إيداع أولي'),
(3, 'إيداع', 20000, 'إيداع أولي'),
(4, 'إيداع', 5000, 'إيداع في حساب التوفير'),
(5, 'إيداع', 30000, 'إيداع في حساب الاستثمار');

-- تحديث أرصدة الحسابات بناءً على المعاملات
UPDATE accounts SET balance = 10000 WHERE id = 1;
UPDATE accounts SET balance = 15000 WHERE id = 2;
UPDATE accounts SET balance = 20000 WHERE id = 3;
UPDATE accounts SET balance = 5000 WHERE id = 4;
UPDATE accounts SET balance = 30000 WHERE id = 5;

-- إضافة أهداف ادخار تجريبية
INSERT INTO savings_goals (customer_id, title, target_amount, target_date, monthly_contribution) VALUES
(1, 'شراء سيارة', 80000, '2023-12-31', 5000),
(1, 'رحلة سياحية', 20000, '2023-08-31', 2500),
(2, 'صندوق الطوارئ', 50000, '2024-03-31', 3000);

-- تحديث المبالغ الحالية لأهداف الادخار
UPDATE savings_goals SET current_amount = 30000 WHERE id = 1;
UPDATE savings_goals SET current_amount = 15000 WHERE id = 2;
UPDATE savings_goals SET current_amount = 25000 WHERE id = 3;
