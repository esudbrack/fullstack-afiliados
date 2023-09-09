import {
  Backdrop,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Theme } from "@mui/material/styles";
import * as React from "react";
import { useEffect, useState } from "react";
import api from "../services/api";
import { Seller } from "../types";
import SellerCard from "../components/SellerCard";

export default function TransactionList() {
  let [loading, setLoading] = useState(true);
  let [sellers, setSellers] = useState<Seller[]>([]);

  function fetchTransactions() {
    api
      .get("/transactions/list")
      .then((response) => {
        setSellers(response.data.sellers);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!sellers.length ? (
        <Typography variant="h4" gutterBottom>
          Nenhuma transação encontrada.
        </Typography>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Lista de transações por cliente
          </Typography>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {sellers.map((seller) => (
              <Grid item xs={12}>
                <SellerCard seller={seller} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}
