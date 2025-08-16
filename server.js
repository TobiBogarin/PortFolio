// server.js (raíz)
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Candidatos de carpetas estáticas: soporta ambas estructuras
const candidates = [
  path.join(__dirname, "src", "public"), // /src/public
  path.join(__dirname, "public"),        // /public
];

// Elegir la que realmente existe (y tenga index.html)
const publicDir =
  candidates.find(p => fs.existsSync(path.join(p, "index.html"))) || candidates[0];

console.log("🛰️ __dirname:", __dirname);
console.log("🗂️ publicDir elegido:", publicDir);

// Servir estáticos
app.use(express.static(publicDir));

// Ruta principal
app.get("/", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

// 404 fallback
app.use((_req, res) => res.status(404).send("Not found"));

app.listen(PORT, () => {
  console.log(`🚀 Portfolio server running on http://localhost:${PORT}`);
});
