import AccountCard from "./AccountCard";

export default function AccountCardExample() {
  return (
    <AccountCard
      name="الحساب الجاري"
      type="جاري"
      currency="درهم اماراتي"
      accountNumber="AE59 2167 2517 6819 8918"
      balance={101000}
      currencySymbol="د.إ"
    />
  );
}
