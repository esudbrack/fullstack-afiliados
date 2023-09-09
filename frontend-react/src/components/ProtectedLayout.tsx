import { AppBar, Button, Container, Toolbar } from "@mui/material";
import React from "react";
import { Navigate, useOutlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedLayout = () => {
  const { token, logout }: any = useAuth();
  const navigate = useNavigate();
  const outlet = useOutlet();

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div style={{ flex: 1 }}>
            <Button color="inherit" onClick={() => navigate('')}>
              Transações
            </Button>
            <Button color="inherit" onClick={() => navigate('import-transaction')}>
              Importar
            </Button>
          </div>
          <Button color="inherit" style={{ float: "right" }} onClick={logout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" style={{ marginTop: "5%" }}>
        {outlet}
      </Container>
    </div>
  );
};
