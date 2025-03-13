import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/banking/Login";
import Register from "./components/banking/Register";
import BankLayout from "./components/banking/BankLayout";
import AdminLayout from "./components/banking/AdminLayout";
import Dashboard from "./components/banking/Dashboard";
import AdminDashboard from "./components/banking/AdminDashboard";
import Accounts from "./components/banking/Accounts";
import Transfers from "./components/banking/Transfers";
import Transactions from "./components/banking/Transactions";
import Savings from "./components/banking/Savings";
import CurrencyAccounts from "./components/banking/CurrencyAccounts";
import VisaCard from "./components/banking/VisaCard";
import CustomerManagement from "./components/banking/CustomerManagement";
import BankCurrencySettings from "./components/banking/BankCurrencySettings";
import BankAccounts from "./components/banking/BankAccounts";
import CustomerDepositInstructions from "./components/banking/CustomerDepositInstructions";
import ConnectionTest from "./components/banking/ConnectionTest";
import { DebugPanel } from "./components/ui/debug-panel";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/connection-test" element={<ConnectionTest />} />

          {/* مسارات العميل */}
          <Route path="/bank" element={<BankLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="currencies" element={<CurrencyAccounts />} />
            <Route path="transfers" element={<Transfers />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="savings" element={<Savings />} />
            <Route path="visa" element={<VisaCard />} />
            <Route path="settings" element={<Dashboard />} />
            <Route path="help" element={<Dashboard />} />
            <Route
              path="deposit-instructions"
              element={<CustomerDepositInstructions />}
            />
          </Route>

          {/* مسارات المدير */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="customers" element={<CustomerManagement />} />
            <Route path="accounts" element={<BankAccounts />} />
            <Route path="transactions" element={<AdminDashboard />} />
            <Route path="currencies" element={<BankCurrencySettings />} />
            <Route path="alerts" element={<AdminDashboard />} />
            <Route path="security" element={<AdminDashboard />} />
            <Route path="settings" element={<AdminDashboard />} />
          </Route>

          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <DebugPanel />
      </>
    </Suspense>
  );
}

export default App;
