import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
// Pages
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { AuthLayout } from "./components/AuthLayout";

export default function App() {
  return (
    <Container component="main" maxWidth="sm" style={{ marginTop: "5%" }}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<LoginPage />} />

            <Route path="/dashboard" element={<ProtectedLayout />}>
              <Route path="" element={<HomePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}
