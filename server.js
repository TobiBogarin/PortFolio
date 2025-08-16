// server.js (raíz)
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Candidatos: soporta ambas estructuras
const candidates = [
  path.join(__dirname, "src", "public"),
  path.join(__dirname, "public"),
];

// Elegir carpeta con index.html
let publicDir = null;
for (const p of candidates) {
  const idx = path.join(p, "index.html");
  if (fs.existsSync(idx)) {
    publicDir = p;
    break;
  }
}

// Logs de diagnóstico
console.log("🛰️ __dirname:", __dirname);
console.log("🔎 Candidatos:", candidates);
if (publicDir) {
  console.log("🗂️ publicDir elegido:", publicDir);
  try {
    console.log("📄 Contenido publicDir:", fs.readdirSync(publicDir));
  } catch {}
} else {
  console.error("❌ No se encontró index.html en ninguna carpeta candidata.");
}

// Si no hay index.html, abortar para ver el log claro
if (!publicDir) process.exit(1);

// Servir estáticos (index automático)
app.use(express.static(publicDir, { index: "index.html" }));

// Fallback SPA (opcional)
app.get("*", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio server running on http://localhost:${PORT}`);
});
