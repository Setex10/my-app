require('dotenv').config()
const express = require("express")
const app = express()
const PORT_SEV = process.env.PORT_SEV
const cors = require("cors")
const cookieParser = require('cookie-parser');
const runDb = require("./db.js")
const fs = require("fs")
const path = require("path")

const routesPath = path.join(__dirname, 'routes');

//Middlewares
const checkTokenJWT = require("./middleware/tokenJWT.js")

//Db
runDb()

app.use(cookieParser())
app.use(express.json())
app.use(cors());

app.use(checkTokenJWT.unless({
    path: [
        { url: /^\/login\/?$/, methods: ["GET", "POST"] },
        { url: /^\/createAccount\/?$/, methods: ["GET", "POST"] },
        { url: /^\/public\/.*/, methods: ["GET"] },
        { url: /\.(css|js|png|jpg|jpeg|svg|ico)$/i, methods: ["GET"] },
        "/favicon.ico"

    ]
}))

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error en el servidor');
});

app.use(express.static('../public2'))
app.use('/static', express.static('../public2'))


app.listen(PORT_SEV, () => {
    console.log(`Servidor activo en http://localhost:${PORT_SEV}`);
})

const loadRoutes = (folderPath, urlPrefix = '') => {
    fs.readdirSync(folderPath, { withFileTypes: true }).forEach((item) => {
        const fullPath = path.join(folderPath, item.name);
        
        if (item.isDirectory()) {
            // Si es carpeta, seguimos bajando y acumulamos el nombre en el prefijo
            loadRoutes(fullPath, `${urlPrefix}/${item.name}`);
        } else if (item.name === 'index.js') {
            // Si encontramos un index.js, lo registramos
            const route = require(fullPath);
            
            // Si el prefijo está vacío (es la raíz de /routes), usamos '/'
            const finalPath = urlPrefix === '' ? '/' : urlPrefix;

            app.use(route);

            console.log(`Ruta mapeada: ${finalPath} -> ${fullPath}`);
        }
    });
};

loadRoutes(routesPath);

app.get("/", async (req, res) => {
    res.sendFile("./index.html")
})

