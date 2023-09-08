import { Field, Form, Formik } from "formik";
import * as React from "react";
import { Navigate } from "react-router-dom";

import { Box, Button, Grid, Typography } from "@mui/material";
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

  useEffect(() => {
    setRedirect(token ? true : false);
  }, [token]);

  function signIn(data: Data) {
    api.post("/signin", data).then((response) => {
      login(response.data.token);
    });
  }
  function signUp(data: Data) {
    token;
    api.post("/signup", data).then((response) => {
      console.log(response.data);
    });
  }

  return (
    <>
      {redirect && <Navigate to="/dashboard" replace={true} />}
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
    </>
  );
}
