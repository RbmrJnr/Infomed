require("dotenv").config();

const express = require("express");
const path = require("path");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

app.use(express.static(path.join(__dirname, "frontend")));

app.get("/api/medicamentos", async (request, response) => {
    const busca = request.query.busca?.trim();

    if (!busca) {
        return response.json([]);
    }

    /**
     * 
     * TODO: CRIAR TABELAS NO BANCO DE DADOS COM ESSAS
     * INFORMAÇÕES
     * 
     * NOME DA TABELA: medicamentos
     * 
     * id: id serial
     * nome: string
     * apresentacao: string
     * como_tomar: string
     * contraindicacoes: string
     * outras_informacoes: string
     * 
     */
    try {
        const { rows } = await pool.query(
            `
                SELECT
                    id,
                    nome,
                    apresentacao,
                    composicao,
                    como_tomar,
                    contraindicacoes,
                    outras_informacoes
                FROM medicamentos
                WHERE nome ILIKE $1
                ORDER BY nome
                LIMIT 20
            `,
            [`%${busca}%`]
        );

        return response.json(rows);
    } catch (error) {
        console.error("Erro ao consultar medicamentos:", error);
        return response.status(500).json({ error: "Erro ao consultar medicamentos." });
    }
});

app.listen(port, () => {
    console.log(`INFOMED disponível em http://localhost:${port}`);
});
