import * as React from "react";
import { Transaction } from "../types";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { green, red } from "@mui/material/colors";

export interface ITransactionsTableProps {
  transactions: Transaction[];
}

export function TransactionsTable({ transactions }: ITransactionsTableProps) {
  const colorByType = (type: string) => {
    return type == "Comissão paga" ? red[700] : green[700];
  };

  const formatDate = (date: Date) =>
    new Date(date).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Descrição do produto</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Valor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction: Transaction) => (
            <TableRow
              key={transaction.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {transaction.product_description}
              </TableCell>
              <TableCell>{formatDate(transaction.transaction_date)}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell style={{ color: colorByType(transaction.type) }}>
                {transaction.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
