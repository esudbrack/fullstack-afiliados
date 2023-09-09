import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./components/AuthLayout";
import { ProtectedLayout } from "./components/ProtectedLayout";
// Pages
import LoginPage from "./pages/Login";
import TransactionImport from "./pages/TransactionImport";
import TransactionList from "./pages/TransactionList";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<LoginPage />} />

            <Route path="/dashboard" element={<ProtectedLayout />}>
              <Route path="" element={<TransactionList />} />
              <Route path="import-transaction" element={<TransactionImport />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}
