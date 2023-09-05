import { Box, Button, Grid, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { Field, Form, Formik } from "formik";
import * as React from "react";
import { MyField } from "../components/MyField";

interface Data {
  email: string;
  password: string;
}

export default function LoginPage() {
  function login(data: Data) {
    console.log(data);
  }
  function register(data: Data) {
    console.log(data);
  }

  return (
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
        onSubmit={(data) => login(data)}
      >
        {({ values }) => (
          <Form>
            <Box
              component="form"
              // onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
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
                    // type="submit"
                    fullWidth
                    onClick={() => {login(values)}}
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
                      register(values);
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
  );
}
