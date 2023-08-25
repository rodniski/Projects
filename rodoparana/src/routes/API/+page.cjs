const express = require("express");
const sql = require("mssql/msnodesqlv8");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

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

app.use(cors());

app.get("/estoque", (req, res) => {
  const queryFilePath = path.join(__dirname, "consulta-itens.sql");

  fs.readFile(queryFilePath, "utf8", (err, query) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Erro ao ler o arquivo de consulta" });
    }

    const codigo = req.query.codigo || 'http://localhost:5173/estoque'; // Obtém o parâmetro "codigo" da URL

    // Modifica a consulta SQL para incluir a filtragem pelo código
    const filteredQuery = `${query} AND SB2.B2_COD = '${codigo}'`;

    sql.connect(
      `Driver={SQL Server Native Client 11.0};Server=${config.server};Database=${config.database};Uid=${config.user};Pwd=${config.password};`,
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao conectar ao banco de dados" });
        }

        const request = new sql.Request();
        request.query(filteredQuery, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Erro ao executar a consulta SQL" });
          }

          const records = result.recordset;

          console.log("Arquivo JSON criado com sucesso");
          return res.json(records);
        });
      }
    );
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/estoque`);
});
