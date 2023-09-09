import React from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@mui/material";

export const ProtectedLayout = () => {
  const { token, logout }: any = useAuth();
  const outlet = useOutlet();

  if (!token) {
    return <Navigate to="/" />;
  }

  return <div>
    <Button style={{float: 'right'}} onClick={logout}>Sair</Button>
    {outlet}
  </div>;
};
