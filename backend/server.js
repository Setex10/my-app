require("dotenv").config();
const express = require("express");
const next = require("next");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const runDb = require("./db.js");
const fs = require("fs");
const path = require("path");

const PORT_SEV = process.env.PORT_SEV || 3000;
const routesPath = path.join(__dirname, "routes");

// 🔥 Inicializar Next
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

// Middlewares
const checkTokenJWT = require("./middleware/tokenJWT.js");

// DB
runDb();

nextApp.prepare().then(() => {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());

  if (dev) {
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );
  }

  app.use(
    checkTokenJWT.unless({
      path: [
        { url: /^\/login\/?$/, methods: ["GET", "POST"] },
        { url: /^\/createAccount\/?$/, methods: ["GET", "POST"] },
        { url: /^\/_next\/.*/, methods: ["GET"] }, // importante para Next
        { url: /^\/public\/.*/, methods: ["GET"] },
        { url: /\.(css|js|png|jpg|jpeg|svg|ico)$/i, methods: ["GET"] },
        "/favicon.ico",
      ],
    })
  );

  const loadRoutes = (folderPath) => {
    fs.readdirSync(folderPath, { withFileTypes: true }).forEach((item) => {
      const fullPath = path.join(folderPath, item.name);

      if (item.isDirectory()) {
        loadRoutes(fullPath);
      } else if (item.name === "index.js") {
        const route = require(fullPath);
        app.use(route);
        console.log(`Ruta cargada: ${fullPath}`);
      }
    });
  };

  loadRoutes(routesPath);

  app.use((req, res) => {
  return handle(req, res);
    app.use((req, res) => {
  return handle(req, res);
});});

  app.listen(PORT_SEV, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT_SEV}`);
  });
});