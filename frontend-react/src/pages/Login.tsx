import { Field, Form, Formik } from "formik";
import * as React from "react";
import { Navigate } from "react-router-dom";

import { Alert, Box, Button, Container, Grid, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

import { MyField } from "../components/MyField";

import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

interface Data {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login, token }: any = useAuth();
  let [redirect, setRedirect] = useState(token ? true : false);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);
  let [displayAlert, setDisplayAlert] = useState(false);
  let [alertMessage, setAlertMessage] = useState(false);

  useEffect(() => {
    setRedirect(token ? true : false);
  }, [token]);

  function signIn(data: Data) {
    setLoading(true);
    api
      .post("/signin", data)
      .then((response) => {
        setLoading(false);
        login(response.data.token);
      })
      .catch((e) => {
        setAlertMessage(e.response.data.message);
        setError(true);
        setDisplayAlert(true);
        setLoading(false);
      });
  }
  function signUp(data: Data) {
    setLoading(true);
    api
      .post("/signup", data)
      .then((response) => {
        setAlertMessage(response.data.message);
        setError(false);
        setDisplayAlert(true);
        setLoading(false);
      })
      .catch((e) => {
        setAlertMessage(e.response.data.message);
        setError(true);
        setDisplayAlert(true);
        setLoading(false);
      });
  }

  return (
    <Container component="main" maxWidth="sm" style={{ marginTop: "5%" }}>
      {redirect && <Navigate to="/dashboard" replace={true} />}
      {displayAlert && (
        <Alert
          severity={error ? "error" : "success"}
          onClose={() => {
            setDisplayAlert(false);
          }}
        >
          {alertMessage}
        </Alert>
      )}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography color={blue[700]} variant="h5">
          Entrar / Registrar
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(data) => signIn(data)}
        >
          {({ values }) => (
            <Form>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <Field
                  name="email"
                  placeholder="E-mail"
                  component={MyField}
                  required
                />
                <Field
                  name="password"
                  placeholder="Senha"
                  type="password"
                  component={MyField}
                  required
                />

                <Grid container spacing={5}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      disabled={loading}
                      onClick={() => {
                        signIn(values);
                      }}
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Entrar
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      type="button"
                      fullWidth
                      disabled={loading}
                      onClick={() => {
                        signUp(values);
                      }}
                      variant="outlined"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Cadastrar
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}
