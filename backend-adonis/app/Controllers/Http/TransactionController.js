"use strict";
const Transaction = use("App/Models/Transaction");
const Database = use("Database");
const Helpers = use("Helpers");
const { log } = require("console");
const fs = require("fs");

class TransactionController {
  async import({ request, response }) {
    try {
      const sales = request.file("sales", {
        extnames: ["txt"],
        size: "2mb",
      });

      await sales.move(Helpers.tmpPath("uploads"), {
        name: "sales.txt",
        overwrite: true,
      });

      if (!sales.moved()) {
        return sales.error();
      }

      // Split file content into array and remove empty lines
      let transactions = fs
        .readFileSync(`${Helpers.tmpPath("uploads")}/sales.txt`, "utf8")
        .toString()
        .split("\n");
      transactions = transactions.filter((entry) => entry.trim() != "");

      const convertLineToTransactionObject = (line) => {
        return {
          type: Number(line.substr(0, 1)),
          transaction_date: new Date(line.substr(1, 25)),
          product_description: line.substr(26, 30).trim(),
          value: Number(line.substr(56, 10)),
          seller: line.substr(66, 20).trim(),
        };
      };

      // Convert to an array of objects
      transactions = transactions.map((t) => convertLineToTransactionObject(t));

      await Transaction.createMany(transactions);

      return response.status(200).json({
        message: "Transações importadas com sucesso!",
      });
    } catch (error) {
      console.log(error.message);
      return response.status(403).json({
        status: "error",
        debug_error: error.message,
        message: "Erro interno no servidor."
      });
    }
  }

  async list({ response }) {
    try {
      // Get total values by seller
      let sellers =
        await Database.raw(`SELECT SUM(CASE WHEN type = 3 THEN -value ELSE value END) AS total, seller AS name
                FROM transactions
                GROUP BY seller;`);

      // MySQL driver returns two arrays the first one is the data
      sellers = sellers[0];

      // Then list all transactions by seller
      let transactions = await Transaction.all();
      transactions = transactions.toJSON();

      if(!transactions.length) {
        return { sellers: [] };
      }

      let total = 0;

      for (const seller of sellers) {
        total += seller.total;
        seller.transactions = transactions.filter(
          (t) => t.seller == seller.name
        );
      }
      total = (total/100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
      // Sanitize data
      sellers = sellers.map((s) => {
        return {
          type:
            s.transactions.findIndex((t) => t.type == 3) >= 0
              ? "Afiliado"
              : "Produtor",
          name: s.name,
          total: (s.total / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          transactions: s.transactions.map((t) => {
            return {
              id: t.id,
              type:
                t.type == 1
                  ? "Venda produtor"
                  : t.type == 2
                  ? "Venda afiliado"
                  : t.type == 3
                  ? "Comissão paga"
                  : "Comissão recebida",
              transaction_date: new Date(t.transaction_date).toLocaleString(
                "pt-br"
              ),
              product_description: t.product_description,
              value: (t.value / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              }),
            };
          }),
        };
      });

      return { total, sellers };
    } catch (error) {
      console.log(error.message);
      return response.status(403).json({
        debug_error: error.message,
      });
    }
  }
}

module.exports = TransactionController;
