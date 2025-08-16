// server.js en raíz
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Servir estáticos desde /src/public
app.use(express.static(path.join(__dirname, "src", "public")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "src", "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio server running on http://localhost:${PORT}`);
});
