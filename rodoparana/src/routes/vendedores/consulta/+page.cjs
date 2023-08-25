const express = require("express");
const sql = require("mssql/msnodesqlv8");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

const config = {
  server: "181.41.184.212,37000",
  database: "CRC3TS_120531_PR_PD",
  user: "CLT120531READ",
  password: "yojku43529YDJMR?@",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: false,
  },
};

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "consulta-vend.sql");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Erro ao ler o arquivo de consulta" });
      return;
    }

    const query = data;

    sql.connect(config)
      .then((pool) => {
        return pool.request().query(query);
      })
      .then((result) => {
        const records = result.recordset;
        const jsonData = JSON.parse(JSON.stringify(records));
        const dataArray = jsonData;

        const jsonDataString = JSON.stringify(dataArray, null, 2); // Converte o dataArray em uma string JSON formatada
        const filePath = path.join(__dirname, "vendedores.json");

        fs.writeFile(filePath, jsonDataString, "utf8", (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: "Erro ao criar o arquivo" });
            return;
          }

          console.log("Arquivo criado com sucesso");
        });

        res.json(dataArray);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Erro ao executar a consulta SQL" });
      })
      .finally(() => {
        sql.close();
      });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
